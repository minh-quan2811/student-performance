import os
from pydantic_settings import BaseSettings

# API Keys
class Settings(BaseSettings):
    GOOGLE_API_KEY: str


settings = Settings(_env_file='.env', _env_file_encoding='utf-8')

# Paths
BASE_DIR = os.path.dirname(os.path.dirname(__file__))
ML_DIR = os.path.join(BASE_DIR, "ml")
ARTIFACTS_DIR = os.path.join(ML_DIR, "ml_models")
COURSES_DIR = os.path.join(ML_DIR, "courses")
