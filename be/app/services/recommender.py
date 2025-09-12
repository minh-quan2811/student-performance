import os
import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer

from app.core.config import COURSES_DIR
from app.utils import build_student_profile_text, gpa_to_scale
from app.ml.loader import rf_model, rf_scaler

# Load embedding model
embed_model = SentenceTransformer("all-mpnet-base-v2")

# Load courses
course_embeddings = np.load(os.path.join(COURSES_DIR, "course_embeddings.npy"))
course_descriptions = pd.read_csv(os.path.join(COURSES_DIR, "course_descriptions.csv"))

grade_map = {1: "Beginner", 2: "Intermediate", 3: "Advanced"}


def run_prediction(req):
    # Scale GPA
    gpa_last_scaled = gpa_to_scale(req.gpa_last)
    gpa_expect_scaled = gpa_to_scale(req.gpa_expect)

    # Build input array
    input_data = np.array([[
        req.q1, req.q2, req.q3, req.q4, req.q5,
        req.q6, req.q7, req.q8, req.q9,
        gpa_last_scaled, gpa_expect_scaled
    ]])

    # Predict with RF
    input_scaled = rf_scaler.transform(input_data)
    pred = rf_model.predict(input_scaled)[0]
    label = grade_map.get(pred, "Unknown")

    # Build profile
    profile_text = build_student_profile_text(
        input_data, req.category, req.student_description, label
    )
    student_embedding = embed_model.encode([profile_text])

    # Match courses
    similarities = cosine_similarity(student_embedding, course_embeddings)[0]
    top_indices = similarities.argsort()[-10:][::-1]
    top_courses = course_descriptions.iloc[top_indices]
    top_course_texts = top_courses["description"].tolist()

    return label, top_course_texts
