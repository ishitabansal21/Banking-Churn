import base64
import io
import numpy as np
from matplotlib import pyplot as plt
import seaborn as sns
import joblib
import os
import json
from sklearn.metrics import confusion_matrix, classification_report, roc_curve, auc, precision_recall_curve, average_precision_score
from utils import encode_plot_to_base64, prepare_data  # Ensure you have the prepare_data function ready

# Matplotlib non-interactive backend
import matplotlib
matplotlib.use('Agg')
plt.ioff()  # Disable interactive plotting

# Function to plot and return base64
def plot_model_accuracy(model, X_train, y_train, X_test, y_test):
    scores = [model.score(X_train, y_train) * 100, model.score(X_test, y_test) * 100]
    labels = ['Training Data', 'Testing Data']
    
    fig = plt.figure(figsize=(6, 2))
    plt.plot(labels, scores, marker='o', color='#ffff28', linestyle='-', linewidth=3, markersize=8)
    plt.ylim(min(scores) - 10, max(scores) + 10)
    plt.ylabel('Accuracy (%)')
    plt.title('Model Accuracy: Training vs Testing')
    for i in range(len(scores)):
        plt.text(labels[i], scores[i] + 2, f'{int(scores[i])}%', ha='center', va='bottom', fontsize=12)
    
    encoded = encode_plot_to_base64(fig)
    plt.close(fig)
    return encoded

def plot_normalized_confusion_matrix(model, X_test, y_test):
    predictions = model.predict(X_test)
    cm = confusion_matrix(y_test, predictions)
    cm = np.around(cm / cm.sum(axis=1)[:, np.newaxis], 2)
    
    fig = plt.figure(figsize=(6, 5))
    custom_cmap = sns.light_palette("#ffff28", as_cmap=True)
    sns.heatmap(
        cm,
        annot=True,
        fmt='.2f',
        cmap=custom_cmap,
        xticklabels=['Customer did not churn', 'Customer churned'],
        yticklabels=['Customer did not churn', 'Customer churned'],
        cbar=True
    )
    plt.title('Normalized Confusion Matrix')
    plt.xlabel('Predicted Labels')
    plt.ylabel('Actual Labels')
    
    encoded = encode_plot_to_base64(fig)
    plt.close(fig)
    return encoded

def plot_classification_report(model, X_test, y_test):
    predictions = model.predict(X_test)
    report = classification_report(y_test, predictions, output_dict=True)
    metrics = ['Precision', 'Recall', 'F1-Score']
    
    class_0_values = [report['0']['precision'], report['0']['recall'], report['0']['f1-score']]
    class_1_values = [report['1']['precision'], report['1']['recall'], report['1']['f1-score']]
    
    fig = plt.figure(figsize=(13, 6))
    bar_width = 0.2
    index = np.arange(len(metrics))
    
    bars_class_0 = plt.barh(index - bar_width / 2, class_0_values, bar_width, label='Customers who did not churn', color='#ffff28')
    bars_class_1 = plt.barh(index + bar_width / 2, class_1_values, bar_width, label='Customers who churn', color='#E1AD3E')
    
    plt.xlabel('Score')
    plt.title('Classification Report: Precision, Recall, F1-Score by Class')
    plt.yticks(index, metrics)
    plt.legend()
    
    for i, bar in enumerate(bars_class_0):
        plt.text(bar.get_width() + 0.01, bar.get_y() + bar.get_height() / 2, f'{class_0_values[i]:.2f}', va='center', ha='left', fontsize=12, color='black')
    for i, bar in enumerate(bars_class_1):
        plt.text(bar.get_width() + 0.01, bar.get_y() + bar.get_height() / 2, f'{class_1_values[i]:.2f}', va='center', ha='left', fontsize=12, color='black')
    
    encoded = encode_plot_to_base64(fig)
    plt.close(fig)
    return encoded

def plot_feature_importance(model, num_columns, cat_columns, X_train):
    pipeline = model.best_estimator_
    preprocessor = pipeline.named_steps['columntransformer']
    dt_model = pipeline.named_steps['decisiontreeclassifier']
    
    num_feature_names = num_columns
    cat_feature_names = preprocessor.named_transformers_['onehotencoder'].get_feature_names_out(cat_columns)
    all_feature_names = np.concatenate([num_feature_names, cat_feature_names])
    
    importance = dt_model.feature_importances_
    importance = 100 * (importance / np.sum(importance))
    
    sorted_idx = np.argsort(importance)[::-1]
    sorted_features = all_feature_names[sorted_idx]
    sorted_importance = importance[sorted_idx]
    
    fig = plt.figure(figsize=(12, 8))
    plt.bar(sorted_features, sorted_importance, color='#ffff28')
    plt.xlabel("Features")
    plt.ylabel("Importance (%)")
    plt.title("Feature Importance in Decision Tree")
    plt.xticks(rotation=45, ha='right')
    plt.tight_layout()
    
    encoded = encode_plot_to_base64(fig)
    plt.close(fig)
    return encoded

def plot_roc_curve(model, X_test, y_test):
    fpr, tpr, thresholds = roc_curve(y_test, model.predict_proba(X_test)[:, 1])
    roc_auc = auc(fpr, tpr)
    
    fig = plt.figure(figsize=(8, 6))
    plt.plot(fpr, tpr, color='#ffff28', lw=2, label='ROC curve (area = %0.2f)' % roc_auc)
    plt.plot([0, 1], [0, 1], color='#0339A6', lw=2, linestyle='--')
    plt.xlim([0.0, 1.0])
    plt.ylim([0.0, 1.05])
    plt.xlabel('False Positive Rate')
    plt.ylabel('True Positive Rate')
    plt.title('Receiver Operating Characteristic of Decision Tree')
    plt.legend(loc="lower right")
    
    encoded = encode_plot_to_base64(fig)
    plt.close(fig)
    return encoded

def plot_precision_recall_curve(model, X_test, y_test):
    precision, recall, _ = precision_recall_curve(y_test, model.predict_proba(X_test)[:, 1])
    pr_auc = average_precision_score(y_test, model.predict_proba(X_test)[:, 1])
    
    fig = plt.figure(figsize=(8, 6))
    plt.plot(recall, precision, color='#ffff28', lw=2, label='PR curve (AUC = %0.2f)' % pr_auc)
    plt.xlabel('Recall')
    plt.ylabel('Precision')
    plt.title('Precision-Recall Curve of Decision Tree')
    plt.legend(loc="lower left")
    
    encoded = encode_plot_to_base64(fig)
    plt.close(fig)
    return encoded

# Main function to generate all plots and return JSON
def generate_dt_plots():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    model = joblib.load(os.path.join(script_dir, '../models/nate_decision_tree.sav'))

    X_train, X_test, y_train, y_test, num_columns, cat_columns = prepare_data()

    plots = {
        "accuracy_plot": plot_model_accuracy(model, X_train, y_train, X_test, y_test),
        "confusion_matrix": plot_normalized_confusion_matrix(model, X_test, y_test),
        "classification_report": plot_classification_report(model, X_test, y_test),
        "feature_importance": plot_feature_importance(model, num_columns, cat_columns, X_train),
        "roc_curve": plot_roc_curve(model, X_test, y_test),
        "precision_recall_curve": plot_precision_recall_curve(model, X_test, y_test)
    }
    return plots

if __name__ == "__main__":
    results = generate_dt_plots()
    print(json.dumps(results))
