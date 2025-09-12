from fastapi import APIRouter
from app.schemas.predict import PredictRequest, PredictResponse
from app.services.recommender import run_prediction
from app.core.config import settings

# Optional: Gemini
try:
    import google.generativeai as genai

    if settings.GOOGLE_API_KEY:
        genai.configure(api_key=settings.GOOGLE_API_KEY)
        model_gen = genai.GenerativeModel("gemini-2.0-flash")
    else:
        model_gen = None
except ImportError:
    model_gen = None

router = APIRouter()


@router.post("/predict", response_model=PredictResponse)
def predict(req: PredictRequest):
    label, top_courses = run_prediction(req)

    # AI recommendation
    if model_gen:
        try:
            prompt = (
                f"{req.category} major, {label} level.\n"
                f"Student interests: {req.student_description}\n\n"
                "Pick one course and explain why:\n"
                + "\n".join(f"- {desc}" for desc in top_courses)
            )
            response = model_gen.generate_content(prompt)
            recommendation = response.text
        except Exception:
            recommendation = "Fallback: top recommended courses listed."
    else:
        recommendation = "Top courses: " + "; ".join(top_courses[:5])

    return PredictResponse(
        prediction=label,
        recommendation=recommendation,
        courses=top_courses
    )
