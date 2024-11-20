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

def encode_plot_to_base64():
    """Encodes the current plot as a base64 string."""
    img = io.BytesIO()
    plt.savefig(img, format='png')
    plt.close()
    img.seek(0)
    return base64.b64encode(img.getvalue()).decode()

def preprocess_data(df):
    # Convert 'Gender' to numeric
    df['Gender'] = df['Gender'].map({'Male': 1, 'Female': 0})

    # One-hot encode 'Geography'
    geography_dummies = pd.get_dummies(df['Geography'], prefix='Geography')
    df = pd.concat([df, geography_dummies], axis=1)
    df.drop(['Geography'], axis=1, inplace=True)
    
    return df

def plot_churn_risk_by_gender(df):
    """Generate Churn Risk per Gender (Count and Percentage) plots."""
    try:
        # Ensure 'Gender' column is present
        if 'Gender' not in df or 'Exited' not in df:
            raise ValueError("'Gender' or 'Exited' column is missing from the dataset.")
        
        # Map gender numeric values to labels
        gender_map = {1: 'Male', 0: 'Female'}
        df['GenderLabel'] = df['Gender'].map(gender_map)
        
        # Count and percentage of churn by gender
        grouped = df.groupby('GenderLabel')['Exited'].agg(Count='value_counts')
        counts = grouped.pivot_table(values='Count', index='GenderLabel', columns='Exited', fill_value=0)
        percentages = grouped.groupby(level=0).apply(lambda g: round(g * 100 / g.sum(), 2)).pivot_table(
            values='Count', index='GenderLabel', columns='Exited', fill_value=0
        )

        labels = ['Stays', 'Exits']

        # Plot count and percentage
        fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 4))
        counts.plot(kind='bar', color=['g', 'r'], rot=0, ax=ax1)
        ax1.legend(labels)
        ax1.set_title('Churn Risk per Gender (Count)', fontsize=14, pad=10)
        ax1.set_ylabel('Count', size=12)
        ax1.set_xlabel('Gender', size=12)

        percentages.plot(kind='bar', color=['g', 'r'], rot=0, ax=ax2)
        ax2.legend(labels)
        ax2.set_title('Churn Risk per Gender (Percentage)', fontsize=14, pad=10)
        ax2.set_ylabel('Percentage', size=12)
        ax2.set_xlabel('Gender', size=12)

        return encode_plot_to_base64()
    except Exception as e:
        raise ValueError(f"Error generating churn risk by gender plot: {str(e)}")

def plot_churn_risk_by_geography(df):
    """Generate Churn Risk per Geography (Count and Percentage) plots."""
    try:
        # Debug: Print column names to identify the issue
        print("Columns in the DataFrame:", df.columns)

        # Reconstruct 'Geography' if one-hot encoded columns are present
        geography_cols = [col for col in df.columns if col.startswith('Geography_')]
        if geography_cols and 'Geography' not in df:
            df['Geography'] = df[geography_cols].idxmax(axis=1).str.replace('Geography_', '')

        # Ensure 'Geography' column exists
        if 'Geography' not in df or 'Exited' not in df:
            raise ValueError("'Geography' or 'Exited' column is missing from the dataset.")
        
        # Count and percentage of churn by geography
        grouped = df.groupby('Geography')['Exited'].agg(Count='value_counts')
        counts = grouped.pivot_table(values='Count', index='Geography', columns='Exited', fill_value=0)
        percentages = grouped.groupby(level=0).apply(lambda g: round(g * 100 / g.sum(), 2)).pivot_table(
            values='Count', index='Geography', columns='Exited', fill_value=0
        )

        labels = ['Stays', 'Exits']

        # Plot count and percentage
        fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 4))
        counts.plot(kind='bar', color=['g', 'r'], rot=0, ax=ax1)
        ax1.legend(labels)
        ax1.set_title('Churn Risk per Geography (Count)', fontsize=14, pad=10)
        ax1.set_ylabel('Count', size=12)
        ax1.set_xlabel('Geography', size=12)

        percentages.plot(kind='bar', color=['g', 'r'], rot=0, ax=ax2)
        ax2.legend(labels)
        ax2.set_title('Churn Risk per Geography (Percentage)', fontsize=14, pad=10)
        ax2.set_ylabel('Percentage', size=12)
        ax2.set_xlabel('Geography', size=12)

        return encode_plot_to_base64()
    except Exception as e:
        raise ValueError(f"Error generating churn risk by geography plot: {str(e)}")

def churn_eda():
    try:
        # Load dataset
        script_dir = os.path.dirname(os.path.abspath(__file__))
        file_path = os.path.join(script_dir, '../Resources/Churn_Modelling.csv')
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

        gender_risk_plot = plot_churn_risk_by_gender(df)
        geography_risk_plot = plot_churn_risk_by_geography(df)


        # Return JSON response with plots
        return {
            "churn_risk_by_gender": gender_risk_plot,
            "churn_risk_by_geography": geography_risk_plot,
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
