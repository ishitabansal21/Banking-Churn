import base64
import io
import pandas as pd
import numpy as np
from matplotlib import pyplot as plt
import seaborn as sns
from collections import Counter
import os

# Use non-interactive matplotlib backend
import matplotlib
matplotlib.use('Agg')

# Disable interactive mode to prevent pop-ups
plt.ioff()

def preprocess_data(df):
    # Convert 'Gender' to numeric
    df['Gender'] = df['Gender'].map({'Male': 1, 'Female': 0})

    # One-hot encode 'Geography'
    geography_dummies = pd.get_dummies(df['Geography'], prefix='Geography')
    df = pd.concat([df, geography_dummies], axis=1)
    df.drop(['Geography'], axis=1, inplace=True)
    
    return df

def churn_eda():
    try:
        # Load dataset
        script_dir = os.path.dirname(os.path.abspath(__file__))
        file_path = os.path.join(script_dir, '../resources/Churn_Modelling.csv')
        df = pd.read_csv(file_path)

        # Drop unused features
        df.drop(['RowNumber', 'CustomerId', 'Surname'], axis=1, inplace=True)

        # Preprocess data
        df = preprocess_data(df)

        # Generate histogram grid
        hist_plot = io.BytesIO()
        df.hist(figsize=(14, 14))
        plt.savefig(hist_plot, format="png")
        plt.close()
        hist_plot.seek(0)
        hist_base64 = base64.b64encode(hist_plot.getvalue()).decode()

        # Generate gender distribution plot
        gender_plot = io.BytesIO()
        df['Gender'].value_counts().plot.bar(color=['b', 'g'])
        plt.ylabel('Count')
        plt.xlabel('Gender')
        plt.xticks(rotation=0)
        plt.savefig(gender_plot, format="png")
        plt.close()
        gender_plot.seek(0)
        gender_base64 = base64.b64encode(gender_plot.getvalue()).decode()

        # Generate geography distribution plot
        geography_plot = io.BytesIO()
        geography_cols = [col for col in df.columns if col.startswith('Geography_')]
        df[geography_cols].sum().plot.bar(color=['b', 'g', 'r'])
        plt.ylabel('Count')
        plt.xlabel('Geography')
        plt.xticks(rotation=0)
        plt.savefig(geography_plot, format="png")
        plt.close()
        geography_plot.seek(0)
        geography_base64 = base64.b64encode(geography_plot.getvalue()).decode()

        # Correlation heatmap
        correlations = df.corr()
        corr_plot = io.BytesIO()
        plt.figure(figsize=(9, 9))
        sns.heatmap(correlations, cmap='RdBu', annot=True, fmt='.2f', cbar=False)
        plt.savefig(corr_plot, format="png")
        plt.close()
        corr_plot.seek(0)
        corr_base64 = base64.b64encode(corr_plot.getvalue()).decode()

        # Return JSON response with plots
        return {
            "histogram": hist_base64,
            "gender_distribution": gender_base64,
            "geography_distribution": geography_base64,
            "correlation_heatmap": corr_base64,
            "summary": df.describe().to_json()
        }
    except Exception as e:
        return {"error": str(e)}

# For testing
if __name__ == "__main__":
    result = churn_eda()
    print(result)
