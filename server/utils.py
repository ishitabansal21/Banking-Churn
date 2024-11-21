import base64
import io
import os
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder

def prepare_data( test_size=0.3, random_state=10):
    # Load data
    script_dir = os.path.dirname(os.path.abspath(__file__))
    data_path = os.path.join(script_dir, './Resources/analytical_base_table.csv')
    df = pd.read_csv(data_path)

    y = df.Exited
    X = df.drop(['Exited'], axis=1)

    num_columns = X.select_dtypes(include='number').columns.tolist()
    cat_columns = X.select_dtypes(include='object').columns.tolist()

    # Split data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=test_size, random_state=random_state, stratify=y
    )

    return X_train, X_test, y_train, y_test, num_columns, cat_columns

# Helper function to encode a plot as a base64 string
def encode_plot_to_base64(fig):
    buf = io.BytesIO()
    fig.savefig(buf, format='png', bbox_inches='tight')
    buf.seek(0)
    encoded_string = base64.b64encode(buf.read()).decode('utf-8')
    buf.close()
    return encoded_string