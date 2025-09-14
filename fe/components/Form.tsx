"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PredictRequest } from "../types"; // Assuming PredictRequest type is defined here

// Define a local type for the form state to allow empty strings for GPA inputs temporarily.
// This provides a better user experience for number inputs, allowing users to clear the field.
type LocalFormState = Omit<PredictRequest, 'gpa_last' | 'gpa_expect'> & {
  gpa_last: number | "";
  gpa_expect: number | "";
};

export default function Form() {
  const router = useRouter();
  const [form, setForm] = useState<LocalFormState>({
    student_description: "",
    category: "",
    q1: 3, q2: 2, q3: 2,
    q4: 1, q5: 1, q6: 1,
    q7: 1, q8: 2, q9: 2,
    gpa_last: 0,
    gpa_expect: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'gpa_last' || name === 'gpa_expect') {
      // For GPA fields, allow an empty string if the user clears the input.
      // Otherwise, parse the value as a float.
      setForm({ ...form, [name]: value === "" ? "" : parseFloat(value) });
    } else if (['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9'].includes(name)) {
      // For question fields, parse as an integer, defaulting to 1 if empty/invalid.
      setForm({ ...form, [name]: parseInt(value) || 1 });
    } else {
      // For other text fields, directly use the string value.
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Before submission, convert any empty GPA strings back to 0 (or a suitable default)
    // and ensure the final object conforms to the PredictRequest type.
    const finalForm: PredictRequest = {
      ...form,
      gpa_last: form.gpa_last === "" ? 0 : parseFloat(String(form.gpa_last)),
      gpa_expect: form.gpa_expect === "" ? 0 : parseFloat(String(form.gpa_expect)),
    };
    sessionStorage.setItem("studentForm", JSON.stringify(finalForm));
    router.push("/result");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Student Performance Predictor</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Help us understand your academic profile to get personalized performance predictions and course recommendations
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          {/* Basic Information Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-sm">1</span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Basic Information</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Major/Category *
                </label>
                <input
                  type="text"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500" // Added text-gray-900 and placeholder-gray-500 for clarity
                  placeholder="e.g., Computer Science, Mathematics, Engineering"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Student Description
                </label>
                <textarea
                  name="student_description"
                  value={form.student_description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none text-gray-900 placeholder-gray-500" // Added text-gray-900 and placeholder-gray-500
                  placeholder="Brief description of your interests, goals, background..."
                />
              </div>
            </div>
          </div>

          {/* Academic Assessment Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-indigo-600 font-semibold text-sm">2</span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Academic Assessment</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Study Hours */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Weekly study hours
                </label>
                <select 
                  name="q1" 
                  value={form.q1} 
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900" // Added text-gray-900 for visibility
                >
                  <option value="1">None</option>
                  <option value="2">&lt;5 hours</option>
                  <option value="3">6-10 hours</option>
                  <option value="4">11-20 hours</option>
                  <option value="5">More than 20 hours</option>
                </select>
              </div>

              {/* Non-scientific Reading */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Reading frequency (non-scientific books/journals)
                </label>
                <select 
                  name="q2" 
                  value={form.q2} 
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900" // Added text-gray-900 for visibility
                >
                  <option value="1">Never</option>
                  <option value="2">Sometimes</option>
                  <option value="3">Often</option>
                </select>
              </div>

              {/* Scientific Reading */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Reading frequency (scientific books/journals)
                </label>
                <select 
                  name="q3" 
                  value={form.q3} 
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900" // Added text-gray-900 for visibility
                >
                  <option value="1">Never</option>
                  <option value="2">Sometimes</option>
                  <option value="3">Often</option>
                </select>
              </div>

              {/* Seminars/Conferences */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Attendance to seminars/conferences
                </label>
                <select 
                  name="q4" 
                  value={form.q4} 
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900" // Added text-gray-900 for visibility
                >
                  <option value="1">Yes</option>
                  <option value="2">No</option>
                </select>
              </div>

              {/* Class Attendance */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Attendance to classes
                </label>
                <select 
                  name="q5" 
                  value={form.q5} 
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900" // Added text-gray-900 for visibility
                >
                  <option value="1">Always</option>
                  <option value="2">Sometimes</option>
                  <option value="3">Never</option>
                </select>
              </div>

              {/* Midterm Prep 1 */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Preparation to midterm exams 1
                </label>
                <select 
                  name="q6" 
                  value={form.q6} 
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900" // Added text-gray-900 for visibility
                >
                  <option value="1">Always</option>
                  <option value="2">Sometimes</option>
                  <option value="3">Never</option>
                </select>
              </div>

              {/* Midterm Prep 2 */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Preparation to midterm exams 2
                </label>
                <select 
                  name="q7" 
                  value={form.q7} 
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900" // Added text-gray-900 for visibility
                >
                  <option value="1">Always</option>
                  <option value="2">Sometimes</option>
                  <option value="3">Never</option>
                </select>
              </div>

              {/* Note Taking */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Taking notes in classes
                </label>
                <select 
                  name="q8" 
                  value={form.q8} 
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900" // Added text-gray-900 for visibility
                >
                  <option value="1">Never</option>
                  <option value="2">Sometimes</option>
                  <option value="3">Always</option>
                </select>
              </div>

              {/* Listening */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Listening in classes
                </label>
                <select 
                  name="q9" 
                  value={form.q9} 
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900" // Added text-gray-900 for visibility
                >
                  <option value="1">Never</option>
                  <option value="2">Sometimes</option>
                  <option value="3">Always</option>
                </select>
              </div>
            </div>
          </div>

          {/* GPA Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-semibold text-sm">3</span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Academic Performance</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Cumulative GPA last semester (0.0–4.0) *
                </label>
                <input
                  type="number"
                  name="gpa_last"
                  value={form.gpa_last} // Value can be number or ""
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  max="4"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500" // Added text-gray-900 and placeholder-gray-500
                  placeholder="e.g., 3.25"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Expected GPA at graduation (0.0–4.0) *
                </label>
                <input
                  type="number"
                  name="gpa_expect"
                  value={form.gpa_expect} // Value can be number or ""
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  max="4"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500" // Added text-gray-900 and placeholder-gray-500
                  placeholder="e.g., 3.50"
                  required
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Get My Performance Prediction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}