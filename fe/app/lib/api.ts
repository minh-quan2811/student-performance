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

export async function predictStudentPerformance(
  data: PredictRequest
): Promise<PredictResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Error: ${res.status}`);
  }

  return res.json();
}
