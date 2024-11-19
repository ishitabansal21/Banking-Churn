from collections import Counter
import os
import pandas as pd
import numpy as np
import joblib
import base64
import io
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import (
    confusion_matrix,
    classification_report,
    roc_curve,
    auc,
    precision_recall_curve,
    average_precision_score,
)
from sklearn.preprocessing import MinMaxScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from imblearn.pipeline import make_pipeline as imbl_pipe
from imblearn.over_sampling import SMOTE
import matplotlib.pyplot as plt
import seaborn as sns

# Disable interactive mode
plt.ioff()


def encode_plot_to_base64():
    """Encodes the current plot as a base64 string."""
    try:
        img = io.BytesIO()
        plt.savefig(img, format="png", bbox_inches="tight")
        plt.close()
        img.seek(0)
        return base64.b64encode(img.getvalue()).decode()
    except Exception as e:
        raise RuntimeError(f"Error encoding plot to base64: {str(e)}")


def class_count(y):
    """Counts and calculates percentages for the target variable."""
    try:
        counter = Counter(y)
        kv = [list(counter.keys()), list(counter.values())]
        abt2 = pd.DataFrame(np.array(kv).T, columns=["Exited", "Count"])
        abt2["Count"] = abt2["Count"].astype("int64")
        abt2["%"] = round(abt2["Count"] / y.shape[0] * 100, 2)
        return abt2.sort_values("Count", ascending=False)
    except Exception as e:
        raise ValueError(f"Error calculating class counts: {str(e)}")


def preprocess_data(X, num_columns, cat_columns):
    """Prepares a preprocessing pipeline for the input features."""
    try:
        # Column indices for numerical and categorical features
        num_features = [X.columns.get_loc(col) for col in num_columns]
        cat_features = [X.columns.get_loc(col) for col in cat_columns]

        # Define column transformer
        preprocess = ColumnTransformer(
            [
                ("scaler", MinMaxScaler(), num_features),
                ("onehot", OneHotEncoder(sparse=False), cat_features),
            ]
        )
        return preprocess
    except Exception as e:
        raise ValueError(f"Error creating preprocessing pipeline: {str(e)}")


def train_decision_tree(X_train, y_train, preprocess, random_state=10):
    """Trains a Decision Tree model with GridSearchCV."""
    try:
        # Define model pipeline
        model = imbl_pipe(
            preprocess,
            SMOTE(sampling_strategy="auto", random_state=random_state),
            DecisionTreeClassifier(random_state=random_state),
        )

        # GridSearch parameters
        param_grid = {
            "decisiontreeclassifier__max_leaf_nodes": [2, 10, 20, 30],
            "decisiontreeclassifier__min_samples_split": [2, 3, 4],
            "decisiontreeclassifier__criterion": ["gini", "entropy"],
        }

        grid = GridSearchCV(model, param_grid, cv=5, scoring="accuracy", verbose=3)
        grid.fit(X_train, y_train)
        return grid
    except Exception as e:
        raise RuntimeError(f"Error training Decision Tree model: {str(e)}")


def plot_confusion_matrix(y_test, predictions):
    """Plots and returns the normalized confusion matrix."""
    try:
        cm = confusion_matrix(y_test, predictions)
        cm_normalized = np.around(cm / cm.sum(axis=1)[:, np.newaxis], 2)
        plt.figure(figsize=(8, 6))
        sns.heatmap(
            cm_normalized,
            annot=True,
            fmt=".2f",
            cmap=sns.light_palette("#FE5D9F", as_cmap=True),
            cbar=False,
        )
        plt.title("Normalized Confusion Matrix", fontsize=16)
        plt.xlabel("Predicted Label", fontsize=12)
        plt.ylabel("True Label", fontsize=12)
        return encode_plot_to_base64()
    except Exception as e:
        raise RuntimeError(f"Error generating confusion matrix plot: {str(e)}")


def plot_feature_importance(model, num_columns, cat_columns, X_train):
    """Plots and returns feature importance graph."""
    try:
        pipeline = model.best_estimator_
        preprocessor = pipeline.named_steps["columntransformer"]
        decision_tree_model = pipeline.named_steps["decisiontreeclassifier"]

        # Combine numerical and one-hot encoded feature names
        num_feature_names = num_columns
        cat_feature_names = preprocessor.named_transformers_[
            "onehotencoder"
        ].get_feature_names_out(cat_columns)
        all_feature_names = np.concatenate([num_feature_names, cat_feature_names])

        # Extract and sort feature importances
        importances = decision_tree_model.feature_importances_
        importance = 100 * (importances / np.sum(importances))
        sorted_idx = np.argsort(importance)[::-1]
        sorted_features = all_feature_names[sorted_idx]
        sorted_importance = importance[sorted_idx]

        # Plot feature importance
        plt.figure(figsize=(12, 8))
        plt.bar(sorted_features, sorted_importance, color="#FE5D9F")
        plt.xlabel("Features")
        plt.ylabel("Importance (%)")
        plt.title("Feature Importance in Decision Tree")
        plt.xticks(rotation=45, ha="right")
        return encode_plot_to_base64()
    except Exception as e:
        raise RuntimeError(f"Error generating feature importance plot: {str(e)}")


def plot_roc_curve(y_test, y_pred_proba):
    """Plots and returns the ROC curve."""
    try:
        fpr, tpr, _ = roc_curve(y_test, y_pred_proba)
        roc_auc = auc(fpr, tpr)
        plt.figure(figsize=(8, 6))
        plt.plot(fpr, tpr, color="#FE5D9F", label=f"ROC Curve (AUC = {roc_auc:.2f})")
        plt.plot([0, 1], [0, 1], color="gray", linestyle="--", label="Random Classifier")
        plt.xlabel("False Positive Rate")
        plt.ylabel("True Positive Rate")
        plt.title("ROC Curve")
        plt.legend(loc="lower right")
        return encode_plot_to_base64()
    except Exception as e:
        raise RuntimeError(f"Error generating ROC curve plot: {str(e)}")


def plot_precision_recall_curve(y_test, y_pred_proba):
    """Plots and returns the Precision-Recall curve."""
    try:
        precision, recall, _ = precision_recall_curve(y_test, y_pred_proba)
        average_precision = average_precision_score(y_test, y_pred_proba)
        plt.figure(figsize=(8, 6))
        plt.plot(
            recall,
            precision,
            color="#FE5D9F",
            label=f"PR Curve (AP = {average_precision:.2f})",
        )
        plt.xlabel("Recall")
        plt.ylabel("Precision")
        plt.title("Precision-Recall Curve")
        plt.legend(loc="lower left")
        return encode_plot_to_base64()
    except Exception as e:
        raise RuntimeError(f"Error generating Precision-Recall curve plot: {str(e)}")


def DT_modelling():
    """Executes the entire modelling pipeline and returns results."""
    try:
        # Load data
        script_dir = os.path.dirname(os.path.abspath(__file__))
        file_path = os.path.join(script_dir, "../resources/analytical_base_table.csv")
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"File not found: {file_path}")
        abt = pd.read_csv(file_path)
        y = abt.Exited
        X = abt.drop(["Exited"], axis=1)

        # Split data
        random_state = 10
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.3, random_state=random_state, stratify=y
        )

        # Identify numerical and categorical features
        num_columns = X.select_dtypes(include="number").columns.tolist()
        cat_columns = X.select_dtypes(include="object").columns.tolist()

        # Preprocessing
        preprocess = preprocess_data(X, num_columns, cat_columns)

        # Train model
        dt_grid = train_decision_tree(X_train.values, y_train, preprocess)

        # Predictions and metrics
        predictions = dt_grid.predict(X_test.values)
        y_pred_proba = dt_grid.predict_proba(X_test.values)[:, 1]

        # Generate plots and metrics
        results = {
            "confusion_matrix": plot_confusion_matrix(y_test, predictions),
            "feature_importance": plot_feature_importance(
                dt_grid, num_columns, cat_columns, X_train
            ),
            "roc_curve": plot_roc_curve(y_test, y_pred_proba),
            "precision_recall_curve": plot_precision_recall_curve(
                y_test, y_pred_proba
            ),
            "classification_report": classification_report(y_test, predictions),
            "best_params": dt_grid.best_params_,
            "train_score": dt_grid.score(X_train.values, y_train),
            "test_score": dt_grid.score(X_test.values, y_test),
        }
        return results
    except Exception as e:
        return {"error": str(e)}


if __name__ == "__main__":
    results = DT_modelling()
    print(results)
