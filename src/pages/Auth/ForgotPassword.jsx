import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import StepCircle from "./StepCircle";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  // --------------------- OTP STATE ---------------------
  const OTP_LENGTH = 5;
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const otpRefs = useRef([...Array(OTP_LENGTH)].map(() => React.createRef()));

  const [error, setError] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  // --------------------- OTP Logic ---------------------
  function handleOtpChange(e, idx) {
    const val = e.target.value.replace(/\D/g, "").slice(0, 1);
    const updatedOtp = [...otp];
    updatedOtp[idx] = val;
    setOtp(updatedOtp);

    if (val && idx < OTP_LENGTH - 1) {
      otpRefs.current[idx + 1].current.focus();
    }

    if (!val && idx > 0) {
      otpRefs.current[idx - 1].current.focus();
    }
  }

  // ----------------- NEXT STEP BUTTON -------------------
  function goNext() {
    if (step === 1) {
      if (!email) return setError("Please enter your email.");
      if (!email.includes("@") || !email.includes(".")) {
        return setError("Enter a valid email address.");
      }
    }

    if (step === 2 && otp.some((d) => d === "")) {
      return setError("Please enter complete OTP.");
    }

    setError("");
    setStep(step + 1);
  }

  function goBack() {
    setError("");
    if (step > 1) setStep(step - 1);
  }

  // ---------------- RESET PASSWORD ----------------
  function resetPassword() {
    if (!newPass || !confirmPass) {
      return setError("Both password fields are required.");
    }

    if (newPass !== confirmPass) {
      return setError("Passwords do not match!");
    }

    navigate("/Login");
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white shadow-xl p-6 sm:p-8 rounded-2xl w-full max-w-md">

        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">
          Forgot Password
        </h2>

        <p className="text-center text-gray-600 mb-6">
          Recover your account in 3 simple steps
        </p>

        {error && (
          <p className="text-red-500 text-center mb-3 text-sm">{error}</p>
        )}

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <h3 className="text-xl font-semibold mb-4 text-center">
              Enter Email Address
            </h3>

            <label className="block text-sm mb-2">Email</label>
            <input
              type="email"
              className="w-full p-3 bg-gray-100 rounded-xl outline-none"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={goNext}
              className="w-full bg-blue-600 text-white py-3 mt-6 rounded-xl"
            >
              Send OTP
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <h3 className="text-xl font-semibold text-center mb-3">Enter OTP</h3>
            <p className="text-center text-gray-600 mb-4">
              OTP sent to{" "}
              <span className="text-blue-600 font-semibold">{email}</span>
            </p>

            <div className="flex justify-center gap-2 sm:gap-3 mb-4">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={otpRefs.current[i]}
                  value={digit}
                  onChange={(e) => handleOtpChange(e, i)}
                  className="w-10 h-10 sm:w-12 sm:h-12 text-center border rounded-lg text-lg sm:text-xl bg-gray-50 outline-none"
                  maxLength={1}
                />
              ))}
            </div>

            <div className="flex justify-between mt-6">
              <button
                className="px-5 sm:px-6 py-2 bg-gray-300 rounded-xl"
                onClick={goBack}
              >
                Back
              </button>

              <button
                className="px-6 sm:px-8 py-2 bg-blue-600 text-white rounded-xl"
                onClick={goNext}
              >
                Verify
              </button>
            </div>

            <div className="mt-4 flex justify-center">
              <button
                onClick={() => alert("OTP Resent!")}
                className="text-blue-600 text-sm"
              >
                Resend OTP
              </button>
            </div>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <h3 className="text-xl font-semibold mb-4 text-center">
              Create New Password
            </h3>

            <label className="block text-sm mb-2">New Password</label>
            <input
              type="password"
              className="w-full p-3 bg-gray-100 rounded-xl mb-3 outline-none"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              placeholder="Enter new password"
            />

            <label className="block text-sm mb-2">Confirm Password</label>
            <input
              type="password"
              className="w-full p-3 bg-gray-100 rounded-xl outline-none"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              placeholder="Confirm password"
            />

            <div className="flex justify-between mt-6">
              <button
                className="px-6 py-2 bg-gray-300 rounded-xl"
                onClick={goBack}
              >
                Back
              </button>

              <button
                className="px-8 py-2 bg-green-600 text-white rounded-xl"
                onClick={resetPassword}
              >
                Reset Password
              </button>
            </div>
          </>
        )}

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Login Link */}
        <div className="text-center text-sm">
          <span className="text-gray-600">Remembered your password? </span>
          <Link
            to="/Login"
            className="text-indigo-600 hover:text-indigo-800 font-semibold transition"
          >
            Login
          </Link>
        </div>

      </div>
    </div>
  );
}
