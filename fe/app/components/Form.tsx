"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PredictRequest } from "../lib/api";

export default function Form() {
  const router = useRouter();
  const [form, setForm] = useState<PredictRequest>({
    student_description: "",
    category: "Computer Science",
    q1: 3, q2: 2, q3: 2,
    q4: 1, q5: 1, q6: 1,
    q7: 1, q8: 2, q9: 2,
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
    <div className="min-h-screen bg-gray-50 py-8">
      <form onSubmit={handleSubmit} className="space-y-6 p-6 max-w-2xl mx-auto bg-white rounded-lg shadow">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Student Performance Predictor</h1>

        {/* Basic Info */}
        <div className="space-y-4 border-b pb-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Basic Information</h2>
          
          <label className="block">
            <span className="block font-semibold mb-2">Major/Category:</span>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Computer Science, Mathematics, Engineering"
            />
          </label>

          <label className="block">
            <span className="block font-semibold mb-2">Student Description (Optional):</span>
            <input
              type="text"
              name="student_description"
              value={form.student_description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Brief description of interests, goals, etc."
            />
          </label>
        </div>

        {/* Questionnaire */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">Academic Assessment</h2>

          {/* Q1 */}
          <label className="block">
            <span className="block font-semibold mb-2">1. Weekly study hours:</span>
            <select 
              name="q1" 
              value={form.q1} 
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="1">None</option>
              <option value="2">&lt;5 hours</option>
              <option value="3">6-10 hours</option>
              <option value="4">11-20 hours</option>
              <option value="5">More than 20 hours</option>
            </select>
          </label>

          {/* Q2 */}
          <label className="block">
            <span className="block font-semibold mb-2">2. Reading frequency (non-scientific books/journals):</span>
            <select 
              name="q2" 
              value={form.q2} 
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="1">Never</option>
              <option value="2">Sometimes</option>
              <option value="3">Often</option>
            </select>
          </label>

          {/* Q3 */}
          <label className="block">
            <span className="block font-semibold mb-2">3. Reading frequency (scientific books/journals):</span>
            <select 
              name="q3" 
              value={form.q3} 
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="1">Never</option>
              <option value="2">Sometimes</option>
              <option value="3">Often</option>
            </select>
          </label>

          {/* Q4 */}
          <label className="block">
            <span className="block font-semibold mb-2">4. Attendance to seminars/conferences:</span>
            <select 
              name="q4" 
              value={form.q4} 
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="1">Yes</option>
              <option value="2">No</option>
            </select>
          </label>

          {/* Q5 */}
          <label className="block">
            <span className="block font-semibold mb-2">5. Attendance to classes:</span>
            <select 
              name="q5" 
              value={form.q5} 
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="1">Always</option>
              <option value="2">Sometimes</option>
              <option value="3">Never</option>
            </select>
          </label>

          {/* Q6 */}
          <label className="block">
            <span className="block font-semibold mb-2">6. Preparation to midterm exams 1:</span>
            <select 
              name="q6" 
              value={form.q6} 
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="1">Always</option>
              <option value="2">Sometimes</option>
              <option value="3">Never</option>
            </select>
          </label>

          {/* Q7 */}
          <label className="block">
            <span className="block font-semibold mb-2">7. Preparation to midterm exams 2:</span>
            <select 
              name="q7" 
              value={form.q7} 
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="1">Always</option>
              <option value="2">Sometimes</option>
              <option value="3">Never</option>
            </select>
          </label>

          {/* Q8 */}
          <label className="block">
            <span className="block font-semibold mb-2">8. Taking notes in classes:</span>
            <select 
              name="q8" 
              value={form.q8} 
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="1">Never</option>
              <option value="2">Sometimes</option>
              <option value="3">Always</option>
            </select>
          </label>

          {/* Q9 */}
          <label className="block">
            <span className="block font-semibold mb-2">9. Listening in classes:</span>
            <select 
              name="q9" 
              value={form.q9} 
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="1">Never</option>
              <option value="2">Sometimes</option>
              <option value="3">Always</option>
            </select>
          </label>

          {/* Q10 - Last GPA */}
          <label className="block">
            <span className="block font-semibold mb-2">10. Cumulative GPA last semester (0.0–4.0):</span>
            <input
              type="number"
              name="gpa_last"
              value={form.gpa_last}
              onChange={handleChange}
              step="0.01"
              min="0"
              max="4"
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 3.25"
            />
          </label>

          {/* Q11 - Expected GPA */}
          <label className="block">
            <span className="block font-semibold mb-2">11. Expected GPA at graduation (0.0–4.0):</span>
            <input
              type="number"
              name="gpa_expect"
              value={form.gpa_expect}
              onChange={handleChange}
              step="0.01"
              min="0"
              max="4"
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 3.50"
            />
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300 font-semibold text-lg"
        >
          Predict My Performance
        </button>
      </form>
    </div>
  );
}