import { PredictRequest, PredictResponse } from '../types';

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