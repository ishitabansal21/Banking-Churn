import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
from scripts.churn_eda import churn_eda
from scripts.churning_model import generate_results
from scripts.DT_modelling import DT_modelling

app = Flask(__name__)
CORS(app)

# Load saved models
try:
    dt_model = joblib.load('models/nate_decision_tree.sav')
    knn_model = joblib.load('models/nate_knn.sav')
    lr_model = joblib.load('models/nate_logistic_regression.sav')
    rf_model = joblib.load('models/nate_random_forest.sav')
    svm_model = joblib.load('models/SVM_model.sav')
    xgb_model = joblib.load('models/XGBoost_model.sav')
except Exception as e:
    app.logger.error(f"Error loading models: {e}")
    raise e

# Dictionary of all loaded models
loaded_models = {
    'dt': dt_model,
    'knn': knn_model,
    'lr': lr_model,
    'rf': rf_model,
    'svm': svm_model,
    'xgb': xgb_model
}

# Function to decode predictions
def decode(pred):
    return 'Customer Exits' if pred == 1 else 'Customer Stays'

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Parse input JSON
        data = request.json

        # Ensure all expected keys are present
        required_keys = [
            'creditScore', 'geography', 'gender', 'age', 'tenure',
            'balance', 'numofproducts', 'hascrcard', 'isactivemember', 'estimatedsalary'
        ]
        missing_keys = [key for key in required_keys if not data.get(key)]
        if missing_keys:
            return jsonify({"error": f"Missing fields: {', '.join(missing_keys)}"}), 400

        values = [
            float(data['creditScore']),
            data['geography'],
            data['gender'],
            float(data['age']),
            float(data['tenure']),
            float(data['balance']),
            int(data['numofproducts']),
            int(data['hascrcard']),
            int(data['isactivemember']),
            float(data['estimatedsalary']),
        ]

        # Prepare data for model prediction
        new_array = np.array(values).reshape(1, -1)

        # Customer details dictionary
        custd = {
            "CreditScore": data['creditScore'],
            "Geography": data['geography'],
            "Gender": data['gender'],
            "Age": data['age'],
            "Tenure": data['tenure'],
            "Balance": data['balance'],
            "NumOfProducts": data['numofproducts'],
            "HasCrCard": "Yes" if data['hascrcard'] == "1" else "No",
            "IsActiveMember": "Yes" if data['isactivemember'] == "1" else "No",
            "EstimatedSalary": data['estimatedsalary']
        }

        # Model predictions
        predictions = []
        for model_name, model in loaded_models.items():
            try:
                prediction = decode(model.predict(new_array)[0])
                predictions.append({"model": model_name, "prediction": prediction})
            except Exception as e:
                app.logger.error(f"Error: {str(e)}")

        # Response JSON
        response = {
            "customer": custd,
            "predictions": predictions
        }

        return jsonify(response), 200
    except ValueError as ve:
        app.logger.error(f"ValueError: {str(ve)}")
        return jsonify({"error": "Invalid input data"}), 400
    except Exception as e:
        app.logger.error(f"Error in prediction: {str(e)}")
        return jsonify({"error": str(e)}), 500


@app.route('/', methods=['GET'])
def home():
    """Health check route."""
    return jsonify({"message": "Welcome to the Bank Customer Churn Prediction API!"})


@app.route('/run-eda', methods=['GET'])
def run_eda():
    """Route to execute the EDA pipeline and return results."""
    try:
        eda_result = churn_eda()
        return jsonify(eda_result), 200
    except Exception as e:
        app.logger.error(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500


@app.route('/run-ml', methods=['GET'])
def run_ml():
    """Route to generate and return churn summary results"""
    try:
        # Generate the results
        results = generate_results()

        # Return as JSON response
        return jsonify(results), 200
    except Exception as e:
        # Handle errors and return error message
        app.logger.error(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500


@app.route('/run-dt', methods=['GET'])
def run_dt():
    """Route to generate and return DT Modelling results"""
    try:
        # Generate the results
        results = DT_modelling()

        # Return as JSON response
        return jsonify(results), 200
    except Exception as e:
        # Handle errors and return error message
        app.logger.error(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/run-lr', methods=['GET'])
def run_lr():
    """Route to generate and return LR Modelling results"""
    try:
        # Generate the results
        # results = generate_results()

        # Return as JSON response
        return jsonify("LR Modelling Results"), 200
    except Exception as e:
        # Handle errors and return error message
        app.logger.error(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500
    
@app.route('/run-rm', methods=['GET'])
def run_rm():
    """Route to generate and return RM Modelling results"""
    try:
        # Generate the results
        # results = generate_results()

        # Return as JSON response
        return jsonify("RM Modelling Results"), 200
    except Exception as e:
        # Handle errors and return error message
        app.logger.error(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/run-xgboost', methods=['GET'])
def run_xgboost():
    """Route to generate and return XGBoost Modelling results"""
    try:
        # Generate the results
        # results = generate_results()

        # Return as JSON response
        return jsonify("XGBoost Modelling Results"), 200
    except Exception as e:
        # Handle errors and return error message
        app.logger.error(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500
    
@app.route('/run-svm', methods=['GET'])
def run_svm():
    """Route to generate and return SVM Modelling results"""
    try:
        # Generate the results
        # results = generate_results()

        # Return as JSON response
        return jsonify("SVM Modelling Results"), 200
    except Exception as e:
        # Handle errors and return error message
        app.logger.error(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=8000)
