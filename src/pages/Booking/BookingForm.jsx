import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function BookingForm() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Booking submitted successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Book Your Form #{id}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white font-medium mb-2">
              Full Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-2 rounded-lg bg-white/70 focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-2">
              Upload Document
            </label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full px-3 py-2 bg-white/70 rounded-lg text-gray-800 cursor-pointer focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md"
          >
            Proceed to Payment
          </button>
        </form>

        <div className="text-center mt-6">
          <Link
            to="/payment"
            className="text-white text-sm hover:underline hover:text-pink-200"
          >
            Skip to Payment →
          </Link>
        </div>
      </div>
    </div>
  );
}
