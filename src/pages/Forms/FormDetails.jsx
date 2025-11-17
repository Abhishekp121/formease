import React from "react";
import { useParams, Link } from "react-router-dom";

export default function FormDetails() {
  const { id } = useParams();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-indigo-500 to-pink-500 p-6">
      <div className="bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl p-10 w-full max-w-2xl text-center text-white animate-fadeIn">
        <h2 className="text-3xl font-bold mb-3">🧾 Form Details #{id}</h2>
        <p className="text-white/80 mb-8 text-lg">
          Complete all the required documents and proceed to book this form.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to={`/booking/${id}`}
            className="bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 text-white font-semibold px-6 py-3 rounded-lg shadow-lg"
          >
            📘 Book This Form
          </Link>
          <Link
            to="/"
            className="bg-gray-300 hover:bg-gray-400 transition-all duration-300 text-gray-900 font-semibold px-6 py-3 rounded-lg shadow-lg"
          >
            ⬅ Back to Forms
          </Link>
        </div>

        <p className="text-white/60 text-sm mt-8">
          💡 Tip: Ensure all required fields are filled before booking.
        </p>
      </div>
    </div>
  );
}
