"use client";

import { useEffect, useState } from "react";
import { predictStudentPerformance, PredictResponse, PredictRequest } from "../lib/api";

export default function ResultPage() {
  const [result, setResult] = useState<PredictResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const formData = sessionStorage.getItem("studentForm");
    if (!formData) {
      setError("No form data found. Please go back and submit again.");
      return;
    }

    const parsed: PredictRequest = JSON.parse(formData);

    predictStudentPerformance(parsed)
      .then(setResult)
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p className="text-red-600">{error}</p>;
  if (!result) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-xl font-bold mb-4">Prediction Result</h2>
      <p><strong>Predicted Level:</strong> {result.prediction}</p>
      <p className="mt-2"><strong>Recommendation:</strong></p>
      <p className="italic">{result.recommendation}</p>

      <h3 className="text-lg font-semibold mt-4">Top Suggested Courses:</h3>
      <ul className="list-disc pl-5">
        {result.courses.slice(0, 5).map((course, idx) => (
          <li key={idx}>{course}</li>
        ))}
      </ul>
    </div>
  );
}
