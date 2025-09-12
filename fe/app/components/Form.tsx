"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PredictRequest } from "../lib/api";

export default function Form() {
  const router = useRouter();
  const [form, setForm] = useState<PredictRequest>({
    student_description: "",
    category: "Computer Science",
    q1: 3, q2: 3, q3: 3,
    q4: 3, q5: 3, q6: 3,
    q7: 3, q8: 3, q9: 3,
    gpa_last: 3.0,
    gpa_expect: 3.5,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: isNaN(Number(value)) ? value : Number(value) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Save to sessionStorage so result page can read
    sessionStorage.setItem("studentForm", JSON.stringify(form));
    router.push("/result");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold">Student Performance Predictor</h1>

      <label className="block">
        Major/Category:
        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </label>

      <label className="block">
        Student Description:
        <input
          type="text"
          name="student_description"
          value={form.student_description}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </label>

      <label className="block">
        Last GPA:
        <input
          type="number"
          step="0.01"
          name="gpa_last"
          value={form.gpa_last}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </label>

      <label className="block">
        Expected GPA:
        <input
          type="number"
          step="0.01"
          name="gpa_expect"
          value={form.gpa_expect}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </label>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Predict
      </button>
    </form>
  );
}
