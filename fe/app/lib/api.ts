// frontend/lib/api.ts
export interface PredictRequest {
  student_description?: string;
  category: string;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
  q5: number;
  q6: number;
  q7: number;
  q8: number;
  q9: number;
  gpa_last: number;
  gpa_expect: number;
}

export interface PredictResponse {
  prediction: string;
  recommendation: string;
  courses: string[];
}

const API_BASE = "http://127.0.0.1:8000/api";

export async function predictStudentPerformance(
  data: PredictRequest
): Promise<PredictResponse> {
  const res = await fetch(`${API_BASE}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Error: ${res.status}`);
  }

  return res.json();
}
