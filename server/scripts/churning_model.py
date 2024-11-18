import base64
import io
import pandas as pd
import numpy as np
from matplotlib import pyplot as plt
import seaborn as sns
from sklearn.metrics import confusion_matrix, classification_report, accuracy_score, f1_score, precision_score, recall_score
import joblib
import os
from sklearn.model_selection import train_test_split

# Matplotlib non-interactive backend
import matplotlib
matplotlib.use('Agg')

plt.ioff()  # Disable interactive plotting

# Load saved models
models_dir = "models"
dt_model = joblib.load(os.path.join(models_dir, 'nate_decision_tree.sav'))
lr_model = joblib.load(os.path.join(models_dir, 'nate_logistic_regression.sav'))
rf_model = joblib.load(os.path.join(models_dir, 'nate_random_forest.sav'))
svm_model = joblib.load(os.path.join(models_dir, 'SVM_model.sav'))
xgb_model = joblib.load(os.path.join(models_dir, 'XGBoost_model.sav'))
svm_model_nos = joblib.load(os.path.join(models_dir, 'SVM_model_nos.sav'))
svm_model_s = joblib.load(os.path.join(models_dir, 'SVM_model_s.sav'))

# Model dictionaries
models = {
    'dt': 'Decision Tree',
    'lr': 'Logistic Regression',
    'rf': 'Random Forest',
    'svm': 'Support Vector Machine (SVM)',
    'xgb': 'XGBoost'
}

loaded_models = {
    'dt': dt_model,
    'lr': lr_model,
    'rf': rf_model,
    'svm': svm_model,
    'xgb': xgb_model
}

models_svm = {
    'svm_nos': 'SVM - without SMOTE',
    'svm_s': 'SVM - with SMOTE'
}

loaded_models_svm = {
    'svm_nos': svm_model_nos,
    'svm_s': svm_model_s
}

# Target labels
target_names = ['Stays', 'Exits']


def encode_plot_to_base64():
    """Encodes the current plot as a base64 string."""
    img = io.BytesIO()
    plt.savefig(img, format='png')
    plt.close()
    img.seek(0)
    return base64.b64encode(img.getvalue()).decode()


def evaluation(fit_models, X_test, y_test):
    """Evaluates models and returns a DataFrame with evaluation metrics."""
    results = []
    for name, model in fit_models.items():
        pred = model.predict(X_test)
        results.append([
            name,
            precision_score(y_test, pred, average='macro'),
            recall_score(y_test, pred, average='macro'),
            f1_score(y_test, pred, average='macro'),
            accuracy_score(y_test, pred)
        ])
    return pd.DataFrame(results, columns=['model', 'precision', 'recall', 'f1_macro', 'accuracy']).set_index('model')


def plot_confusion_matrix(model, X_test, y_test, title):
    """Plots a confusion matrix."""
    pred = model.predict(X_test)
    conf_mat = confusion_matrix(y_test, pred)
    plt.figure(figsize=(6, 6))
    sns.heatmap(conf_mat, annot=True, fmt='d', cmap='Blues', xticklabels=target_names, yticklabels=target_names)
    plt.title(title)
    plt.xlabel('Predicted')
    plt.ylabel('Actual')
    return encode_plot_to_base64()

def plot_accuracy_pie(eval_df):
    """Plots a pie chart for model accuracy."""
    models = eval_df.index
    accuracy = eval_df['accuracy'] * 100

    fig, ax = plt.subplots(figsize=(8, 8))
    wedges, _ = ax.pie(accuracy, startangle=90, colors=plt.cm.tab10.colors)

    for wedge, model, acc in zip(wedges, models, accuracy):
        angle = (wedge.theta2 - wedge.theta1) / 2. + wedge.theta1
        x = np.cos(np.radians(angle))
        y = np.sin(np.radians(angle))
        ax.text(x * 0.7, y * 0.7, f"{model} - {acc:.0f}%", ha='center', va='center', fontsize=12, color="white", weight="bold")

    plt.title('Accuracy Distribution Across Models')
    return encode_plot_to_base64()


def plot_model_metrics(eval_df):
    """Plots a bar chart for model metrics."""
    metrics = ['accuracy', 'precision', 'recall', 'f1_macro']
    models = eval_df.index
    x = np.arange(len(models))
    bar_width = 0.2

    fig, ax = plt.subplots(figsize=(10, 6))
    for i, metric in enumerate(metrics):
        ax.bar(x + i * bar_width, eval_df[metric], width=bar_width, label=metric.capitalize())

    ax.set_title('Model Performance Metrics', fontsize=16)
    ax.set_xticks(x + bar_width * (len(metrics) - 1) / 2)
    ax.set_xticklabels(models, fontsize=12)
    ax.set_ylabel('Scores', fontsize=14)
    ax.set_ylim(0, 1)
    ax.legend(title="Metrics", fontsize=12)
    ax.grid(axis='y', linestyle='--', alpha=0.7)
    return encode_plot_to_base64()

def plot_normalized_confusion_matrix(model, X_test, y_test, title):
    """Plots a normalized confusion matrix."""
    pred = model.predict(X_test)
    conf_mat = confusion_matrix(y_test, pred)
    conf_mat_normalized = conf_mat / conf_mat.sum(axis=1)[:, np.newaxis]
    plt.figure(figsize=(6, 6))
    sns.heatmap(conf_mat_normalized, annot=True, fmt='.2f', cmap='Blues', xticklabels=target_names, yticklabels=target_names)
    plt.title(title)
    plt.xlabel('Predicted')
    plt.ylabel('Actual')
    return encode_plot_to_base64()


def generate_results():
    # Load the dataset
    data_path = os.path.join("Resources", "analytical_base_table.csv")
    df = pd.read_csv(data_path)

    # Prepare features and target variable
    y = df.Exited
    X = df.drop(['Exited'], axis=1)

    # Split dataset into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=10, stratify=y)

    # Evaluate all models
    eval_df = evaluation(loaded_models, X_test, y_test)

    results = {
        "model_metrics": eval_df.to_dict(),
        "accuracy_pie": plot_accuracy_pie(eval_df),
        "model_performance_metrics": plot_model_metrics(eval_df),
        "confusion_matrices": {}
    }

    # Confusion matrix plots for each model
    for model_key, model_name in models.items():
        results["confusion_matrices"][model_name] = {
            "normal": plot_confusion_matrix(loaded_models[model_key], X_test, y_test, f"{model_name} Confusion Matrix"),
            "normalized": plot_normalized_confusion_matrix(loaded_models[model_key], X_test, y_test, f"{model_name} Normalized Confusion Matrix")
        }

    # SMOTE Comparison (SVM models)
    eval_svm = evaluation(loaded_models_svm, X_test, y_test)
    results["svm_metrics"] = eval_svm.to_dict()

    for model_key, model_name in models_svm.items():
        results["confusion_matrices"][model_name] = {
            "normal": plot_confusion_matrix(loaded_models_svm[model_key], X_test, y_test, f"{model_name} Confusion Matrix"),
            "normalized": plot_normalized_confusion_matrix(loaded_models_svm[model_key], X_test, y_test, f"{model_name} Normalized Confusion Matrix")
        }

    return results


# For testing purposes
if __name__ == "__main__":
    results = generate_results()
    print(results)
