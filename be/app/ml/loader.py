import os
import joblib
from app.core.config import ARTIFACTS_DIR

# Load ML artifacts
rf_model = joblib.load(os.path.join(ARTIFACTS_DIR, "rf_model.pkl"))
rf_scaler = joblib.load(os.path.join(ARTIFACTS_DIR, "scaler.pkl"))
