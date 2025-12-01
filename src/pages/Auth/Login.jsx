import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // TODO: API call or validation
  //   console.log("Email:", email, "Password:", password);

  //   navigate("/flights"); // login success
  // };
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Login Successful!");

      // JWT token save karna ho to
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      navigate("/flights");
    } else {
      alert(data.message || "Invalid credentials");
    }

  } catch (error) {
    console.log(error);
    alert("Server error");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-10 w-full max-w-md">

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Login to continue your journey
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* EMAIL */}
          <div className="space-y-1">
            <label className="block text-gray-700 font-medium">Email</label>
            <div className="flex items-center gap-2 px-4 py-3 border rounded-xl bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-400">
              <Mail className="w-5 h-5 text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-transparent outline-none"
                required
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="space-y-1">
            <label className="block text-gray-700 font-medium">Password</label>
            <div className="flex items-center gap-2 px-4 py-3 border rounded-xl bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-400">
              <Lock className="w-5 h-5 text-gray-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-transparent outline-none"
                required
              />
            </div>
          </div>

          <div className="text-right mt-3">
            <Link
              to="/forgot-password"
              className="text-indigo-600 hover:text-indigo-800 font-medium transition"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold 
            hover:bg-indigo-700 transition-all duration-300 shadow-md"
          >
            Login
          </button>
        </form>

        <div className="text-center">
          <div className="flex items-center my-5">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm font-medium">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <div className="text-center text-sm">
            <span className="text-gray-600">Don't have an account? </span>
            <Link
              to="/Signup"
              className="text-indigo-600 hover:text-indigo-800 font-semibold transition"
            >
              Signup
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
