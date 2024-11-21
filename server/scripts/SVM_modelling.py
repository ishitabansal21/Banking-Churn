import base64
import io
import numpy as np
from matplotlib import pyplot as plt
import seaborn as sns
import joblib
import os
import json
from sklearn.metrics import (
    confusion_matrix,
    classification_report,
)
from utils import encode_plot_to_base64, prepare_data   # Ensure you have the prepare_data function ready

# Matplotlib non-interactive backend
import matplotlib
matplotlib.use('Agg')
plt.ioff()  # Disable interactive plotting

# Function to plot and return base64
def plot_model_accuracy(model, X_train, y_train, X_test, y_test):
    scores = [model.score(X_train, y_train) * 100, model.score(X_test, y_test) * 100]
    labels = ['Training Data', 'Testing Data']
    
    fig = plt.figure(figsize=(6, 2))
    plt.plot(labels, scores, marker='o', color='#E30B5C', linestyle='-', linewidth=3, markersize=8)
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
    custom_cmap = sns.light_palette("#E30B5C", as_cmap=True)
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
    
    bars_class_0 = plt.barh(index - bar_width / 2, class_0_values, bar_width, label='Customers who did not churn', color='#E30B5C')
    bars_class_1 = plt.barh(index + bar_width / 2, class_1_values, bar_width, label='Customers who churn', color='#FFC0CB')
    
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

# Main function to generate all plots and return JSON
def generate_svm_plots():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    model = joblib.load(os.path.join(script_dir, '../models/SVM_model.sav'))

    X_train, X_test, y_train, y_test, num_columns, cat_columns = prepare_data()

    plots = {
        "accuracy_plot": plot_model_accuracy(model, X_train, y_train, X_test, y_test),
        "confusion_matrix": plot_normalized_confusion_matrix(model, X_test, y_test),
        "classification_report": plot_classification_report(model, X_test, y_test),
    }
    return plots

if __name__ == "__main__":
    results = generate_svm_plots()
    print(json.dumps(results))
