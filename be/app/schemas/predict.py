from pydantic import BaseModel
from typing import List, Optional


class PredictRequest(BaseModel):
    student_description: Optional[str] = ""
    category: str
    q1: int
    q2: int
    q3: int
    q4: int
    q5: int
    q6: int
    q7: int
    q8: int
    q9: int
    gpa_last: float
    gpa_expect: float


class PredictResponse(BaseModel):
    prediction: str
    recommendation: str
    courses: List[str]
