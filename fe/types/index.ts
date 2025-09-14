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