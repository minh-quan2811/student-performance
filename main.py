import os
import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer
import google.generativeai as genai
from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from dotenv import load_dotenv

from model import rf_model, rf_scaler
from utils import build_student_profile_text, gpa_to_scale

app = FastAPI()

load_dotenv()

# Google Gemini configuration
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=GOOGLE_API_KEY)
model_gen = genai.GenerativeModel("gemini-1.5-flash")

# Load models and data
model_embed = SentenceTransformer('all-mpnet-base-v2')
model = rf_model
scaler = rf_scaler

# Course descriptions and description embeddings
course_embeddings = np.load("course_embeddings.npy")
course_descriptions = pd.read_csv("course_descriptions.csv")

# Number of recommended courses to show
top_n = 10

grade_map = {
    1: 'Beginner',
    2: 'Intermediate',
    3: 'Advanced',
}

# Set the UI of FastAPI with HTML
templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def form(request: Request):
    return templates.TemplateResponse("student_performance_form.html", {"request": request})


# Get the submitted data and display it in the /predict URL
@app.post("/predict")
async def predict(
    request: Request,
    student_description: str = Form(...),
    category: str = Form(...),
    q1: int = Form(...),
    q2: int = Form(...),
    q3: int = Form(...),
    q4: int = Form(...),
    q5: int = Form(...),
    q6: int = Form(...),
    q7: int = Form(...),
    q8: int = Form(...),
    q9: int = Form(...),
    gpa_last: float = Form(..., alias="q10"),
    gpa_expect: float = Form(..., alias="q11")
):

    gpa_last_scaled = gpa_to_scale(gpa_last)
    gpa_expect_scaled = gpa_to_scale(gpa_expect)

    input_data = np.array([[q1, q2, q3, q4, q5, q6, q7, q8, q9, gpa_last_scaled, gpa_expect_scaled]])
    input_scaled = scaler.transform(input_data)

    prediction = model.predict(input_scaled)[0]
    label = grade_map.get(prediction, "Unknown")

    profile_text = build_student_profile_text(input_data, category, student_description, label)
    student_embedding = model_embed.encode([profile_text])

    similarities = cosine_similarity(student_embedding, course_embeddings)[0]
    top_indices = similarities.argsort()[-top_n:][::-1]
    top_courses = course_descriptions.iloc[top_indices]
    top_course_texts = top_courses['description'].tolist()

    # Create prompt with optional description
    prompt = (
        f"{category} major, {label} level.\n"
    )
    if student_description:
        prompt += f"Student is interest in:\n\"{student_description}\"\n\n"
    prompt += (
        f"Based on student major, level, interest of student, pick one and explain why, these are the courses:\n"
        + "\n".join(f"- {desc}" for desc in top_course_texts)
    )

    response = model_gen.generate_content(prompt)

    return templates.TemplateResponse("student_performance_result.html",{"request": request, "prediction": label, "recommendation": response.text})

