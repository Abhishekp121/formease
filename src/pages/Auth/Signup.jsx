import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import StepCircle from "./StepCircle";
import axios from "axios";
import VerifyEmailOtp from "./VerifyEmailOtp";

export default function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // ✅ SINGLE FORM STATE (sirf yahi change hai)
  const [formData, setFormData] = useState({
    role: "User",
    country: "",
    stateVal: "",
    city: "",
    gender: "",
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});
  const [emailVerified, setEmailVerified] = useState(null);
  const [userEmail, setUserEmail] = useState("");

  // 🔁 common handler
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  // ✅ SAME VALIDATION LOGIC
  function validateStep(currentStep) {
    const e = {};

    if (currentStep === 2) {
      if (!formData.country.trim()) e.country = "Country required";
      if (!formData.stateVal.trim()) e.state = "State required";
      if (!formData.city.trim()) e.city = "City required";
      if (!formData.gender) e.gender = "Select gender";
    }

    if (currentStep === 3) {
      if (!formData.firstName.trim()) e.firstName = "First name required";
      if (!formData.lastName.trim()) e.lastName = "Last name required";

      if (!formData.email.trim()) e.email = "Email required";
      else if (!/^\S+@\S+\.\S+$/.test(formData.email))
        e.email = "Invalid email";

      if (!formData.mobile.trim()) e.mobile = "Mobile required";
      if (!formData.password.trim()) e.password = "Password required";
      if (!formData.agree) e.agree = "Please accept Terms";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function goNext() {
    if (validateStep(step)) setStep((s) => Math.min(3, s + 1));
  }

  function goPrev() {
    setErrors({});
    setStep((s) => Math.max(1, s - 1));
  }

  async function handleCreateAccount(e) {
  e.preventDefault();
  if (!validateStep(3)) return;

  const payload = {
    role: formData.role.toLowerCase(), // ✅ FIX
    country: formData.country,
    state: formData.stateVal,          // ✅ FIX
    city: formData.city,
    gender: formData.gender,
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    mobile: formData.mobile,
    password: formData.password,
  };

  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/user/signup",
      payload
    );

    console.log("Signup successful:", response.data);

    if (response.data) {
      setUserEmail(formData.email);
      setEmailVerified(false);
    }
  } catch (err) {
    console.error(
      "Signup error:",
      err.response?.data || err.message
    );
  }
}

  if (emailVerified === false) {
    return<VerifyEmailOtp user={userEmail}/>;

  }

  return (

    <>
  
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center mb-1">Sign up</h2>
        <p className="text-center text-gray-600 mb-6 whitespace-nowrap">
          Let's get you all set up so you can access your personal account
        </p>

        {/* STEP CIRCLE / STEPPER */}
        <div className="flex flex-col items-center w-full my-4">
          <div className="flex items-center w-full max-w-md justify-between">
            <StepCircle n={1} step={step} />
            <div
              className={`h-[2px] flex-1 mx-2 ${
                step > 1 ? "bg-blue-500" : "bg-gray-300"
              }`}
            ></div>
            <StepCircle n={2} step={step} />
            <div
              className={`h-[2px] flex-1 mx-2 ${
                step > 2 ? "bg-blue-500" : "bg-gray-300"
              }`}
            ></div>
            <StepCircle n={3} step={step} />
          </div>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="px-2">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Role
            </label>
            <select
              value={formData.role}
              name="role"
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-800 text-sm"
            >
              <option>User</option>
              <option>Subadmin</option>
              <option>Employee</option>
            </select>

            <div className="flex justify-end mt-8">
              <button
                onClick={goNext}
                className="px-8 py-2 bg-blue-600 text-white rounded-xl font-semibold shadow hover:bg-blue-700 transition"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-gray-700 mb-1 text-sm">
                  Country *
                </label>
                <input
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Enter Country"
                  className="w-full px-2 py-1.5 border rounded-md bg-gray-50 text-sm"
                />
                {errors.country && (
                  <p className="text-red-500 text-xs">{errors.country}</p>
                )}
              </div>

              <div className="w-1/2">
                <label className="block text-gray-700 mb-1 text-sm">
                  State *
                </label>
                <input
                  name="stateVal"
                  value={formData.stateVal}
                  onChange={handleChange}
                  placeholder="Enter State"
                  className="w-full px-2 py-1.5 border rounded-md bg-gray-50 text-sm"
                />
                {errors.state && (
                  <p className="text-red-500 text-xs">{errors.state}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-1 text-sm">
                City *
              </label>
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter City"
                className="w-full px-2 py-1.5 border rounded-md bg-gray-50 text-sm"
              />
              {errors.city && (
                <p className="text-red-500 text-xs">{errors.city}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-2 text-sm">
                Gender *
              </label>
              <div className="flex gap-6 text-sm">
                {["Male", "Female", "Other"].map((g) => (
                  <label key={g} className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={formData.gender === g}
                      onChange={() =>
                        setFormData((p) => ({ ...p, gender: g }))
                      }
                      className="accent-blue-600"
                    />
                    {g}
                  </label>
                ))}
              </div>
              {errors.gender && (
                <p className="text-red-500 text-xs">{errors.gender}</p>
              )}
            </div>

            <div className="flex justify-between mt-6">
              <button
                className="px-5 py-2 border rounded-md text-sm"
                onClick={goPrev}
              >
                Previous
              </button>
              <button
                className="px-5 py-2 bg-blue-600 text-white rounded-md text-sm"
                onClick={goNext}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-gray-700 mb-1 text-sm">
                  First Name *
                </label>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-2 py-1.5 border rounded-md bg-gray-50 text-sm"
                  placeholder="Enter First Name"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div className="w-1/2">
                <label className="block text-gray-700 mb-1 text-sm">
                  Last Name *
                </label>
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-2 py-1.5 border rounded-md bg-gray-50 text-sm"
                  placeholder="Enter Last Name"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-gray-700 mb-1 text-sm">
                  Email *
                </label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-2 py-1.5 border rounded-md bg-gray-50 text-sm"
                  placeholder="Enter Email"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email}</p>
                )}
              </div>

              <div className="w-1/2">
                <label className="block text-gray-700 mb-1 text-sm">
                  Mobile *
                </label>
                <input
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full px-2 py-1.5 border rounded-md bg-gray-50 text-sm"
                  placeholder="Enter Mobile Number"
                />
                {errors.mobile && (
                  <p className="text-red-500 text-xs">{errors.mobile}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-1 text-sm">
                Password *
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-2 py-1.5 border rounded-md bg-gray-50 text-sm"
                placeholder="Enter Password"
              />
              {errors.password && (
                <p className="text-red-500 text-xs">
                  {errors.password}
                </p>
              )}
            </div>

            <div>
              <label className="flex gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={formData.agree}
                  name="agree"
                  onChange={handleChange}
                />
                I agree to Terms & Policy
              </label>
              {errors.agree && (
                <p className="text-red-500 text-xs">{errors.agree}</p>
              )}
            </div>

            <div className="flex justify-between mt-6">
              <button
                className="px-5 py-2 border rounded-md text-sm"
                onClick={goPrev}
              >
                Previous
              </button>
              <button
                onClick={handleCreateAccount}
                className="px-5 py-2 bg-green-500 text-white rounded-md text-sm"
              >
                Create Account
              </button>
            </div>
          </div>
        )}

        <div className="w-full h-[1px] bg-gray-300 mt-6 mb-6"></div>

        <div className="text-center text-sm">
          <span className="text-gray-600">
            Already have an account?{" "}
          </span>
          <Link
            to="/login"
            className="text-indigo-600 hover:text-indigo-800 font-semibold transition"
          >
            Login
          </Link>
        </div>
      </div>
    </div>

    {/* <VerifyEmailOtp/> */}

    </>
  );
}
