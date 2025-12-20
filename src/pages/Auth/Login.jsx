import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import axios from "axios";
import VerifyEmailOtp from "./VerifyEmailOtp";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const [emailVerified, setEmailVerified] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  // ---------------- VALIDATION ----------------
  const validate = () => {
    const e = {};

    if (!email.trim()) {
      e.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) e.email = "Invalid email format";
    }

    if (!password) {
      e.password = "Password is required";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ---------------- LOGIN ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/login",
        { email, password }
      );

      const { message, user } = response.data;
      alert(message);

      if (!user.isEmailVerified) {
        setUserEmail(user.email);
        setEmailVerified(false);
        return;
      }

      navigate("/flights");
    } catch (error) {
      alert(error.response?.data?.message || "Invalid credentials");
    }
  };

  // ---------------- OTP SCREEN ----------------
  if (!emailVerified) {
    return <VerifyEmailOtp user={userEmail} />;
  }

  // ---------------- UI ----------------
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border">

        <h2 className="text-3xl font-bold text-center text-gray-800">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-500 mt-2 mb-8">
          Login to your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* EMAIL */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="mt-1 flex items-center gap-2 px-4 py-3 border rounded-xl bg-gray-50 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
              <Mail className="w-5 h-5 text-gray-400" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent outline-none text-sm"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1 flex items-center gap-2 px-4 py-3 border rounded-xl bg-gray-50 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
              <Lock className="w-5 h-5 text-gray-400" />
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent outline-none text-sm"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition duration-200 shadow-md"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link to="/Signup" className="text-indigo-600 font-semibold">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}
