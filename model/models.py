import os
import joblib

# Get the path to the current file
base_dir = os.path.dirname(__file__)

# Create full path to the model
model_path = os.path.join(base_dir, "rf_model.pkl")
scaler_path = os.path.join(base_dir, "scaler.pkl")

# Load the model using the full path
rf_model = joblib.load(model_path)
rf_scaler = joblib.load(scaler_path)
