


import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import StepCircle from "./StepCircle";


export default function Signup() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  // Form state
  const [role, setRole] = useState("User");
  const [country, setCountry] = useState("");
  const [stateVal, setStateVal] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);

  const [errors, setErrors] = useState({});

  // Validation
  function validateStep(currentStep) {
    const e = {};

    if (currentStep === 2) {
      if (!country.trim()) e.country = "Country required";
      if (!stateVal.trim()) e.state = "State required";
      if (!city.trim()) e.city = "City required";
      if (!gender) e.gender = "Select gender";
    }

    if (currentStep === 3) {
      if (!firstName.trim()) e.firstName = "First name required";
      if (!lastName.trim()) e.lastName = "Last name required";
      if (!email.trim()) e.email = "Email required";
      else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Invalid email";
      if (!mobile.trim()) e.mobile = "Mobile required";
      if (!password.trim()) e.password = "Password required";
      if (!agree) e.agree = "Please accept Terms";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function goNext() {
    if (validateStep(step)) {
      setStep((s) => Math.min(3, s + 1));
    }
  }

  function goPrev() {
    setErrors({});
    setStep((s) => Math.max(1, s - 1));
  }

  function handleCreateAccount() {
    if (!validateStep(3)) return;

    // 👉 Step 3 complete → go to OTP Page
   navigate("/otp-verify", {
  state: { email, mobile },
    });
  }

  // Step circle UI
  // function StepCircle({ n }) {
  //   const active = step === n;
  //   const done = step > n;
  //   return (
  //     <div
  //       className={`rounded-full w-10 h-10 flex items-center justify-center text-white font-bold ${
  //         done ? "bg-green-500" : active ? "bg-blue-600" : "bg-gray-300 text-gray-700"
  //       }`}
  //     >
  //       {done ? "✓" : n}
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
     <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg">

  {/* Heading */}
  <h2 className="text-3xl font-bold text-center mb-1">Sign up</h2>
<p className="text-center text-gray-600 mb-6 whitespace-nowrap">
  Let's get you all set up so you can access your personal account
</p>


  {/* ---------- STEPPER ---------- */}
  <div className="flex flex-col items-center w-full my-4">

    {/* TOP: Circles + Lines */}
    <div className="flex items-center w-full max-w-md justify-between">

      {/* STEP 1 */}
      <div className="flex flex-col items-center flex-1">
        <StepCircle n={1} step={step} />
      </div>

      {/* LINE 1 */}
      <div
        className={`h-[2px] flex-1 mx-2 ${
          step > 1 ? "bg-blue-500" : "bg-gray-300"
        }`}
      ></div>

      {/* STEP 2 */}
      <div className="flex flex-col items-center flex-1">
        <StepCircle n={2} step={step} />
      </div>

      {/* LINE 2 */}
      <div
        className={`h-[2px] flex-1 mx-2 ${
          step > 2 ? "bg-blue-500" : "bg-gray-300"
        }`}
      ></div>

      {/* STEP 3 */}
      <div className="flex flex-col items-center flex-1">
        <StepCircle n={3} step={step} />
      </div>
    </div>

    {/* BOTTOM LABELS */}
    <div className="flex justify-between w-full max-w-md mt-3 text-gray-700 text-sm">
      <div className="flex-1 text-center">Role Setup</div>
      <div className="flex-1 text-center">Location Details</div>
      <div className="flex-1 text-center">Account Setup</div>
    </div>
  </div>

  {/* ---------- STEP 1 CONTENT ---------- */}
  {step === 1 && (
  <div className="px-2">

    {/* Label */}
    <label className="block text-sm font-medium mb-2 text-gray-700">
      Role
    </label>

    {/* Compact Select */}
    <select
      value={role}
      onChange={(e) => setRole(e.target.value)}
      className="w-full px-3 py-2 rounded-lg bg-gray-100 
                 focus:ring-2 focus:ring-blue-500 
                 focus:border-blue-500 outline-none transition 
                 text-gray-800 text-sm"
    >
      <option>User</option>
    </select>

    {/* NEXT Button */}
    <div className="flex justify-end mt-8">
      <button
        onClick={goNext}
        className="px-8 py-2 bg-blue-600 text-white rounded-xl 
                   font-semibold shadow hover:bg-blue-700 transition"
      >
        Next
      </button>
    </div>

  </div>
)}




 {/* STEP 2 */}
{step === 2 && (
  <div>
    <div className="space-y-4">

      {/* Country & State */}
      <div className="flex gap-4">
        <div className="w-1/2">
          <label className="block text-gray-700 mb-1 text-sm">
            Country <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Enter Country"
            className="w-full px-2 py-1.5 border rounded-md bg-gray-50 text-sm"
          />
          {errors.country && <p className="text-red-500 text-xs">{errors.country}</p>}
        </div>

        <div className="w-1/2">
          <label className="block text-gray-700 mb-1 text-sm">
            State <span className="text-red-500">*</span>
          </label>
          <input
            value={stateVal}
            onChange={(e) => setStateVal(e.target.value)}
            placeholder="Enter State"
            className="w-full px-2 py-1.5 border rounded-md bg-gray-50 text-sm"
          />
          {errors.state && <p className="text-red-500 text-xs">{errors.state}</p>}
        </div>
      </div>

      {/* City */}
      <div>
        <label className="block text-gray-700 mb-1 text-sm">
          City <span className="text-red-500">*</span>
        </label>
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter City"
          className="w-full px-2 py-1.5 border rounded-md bg-gray-50 text-sm"
        />
        {errors.city && <p className="text-red-500 text-xs">{errors.city}</p>}
      </div>

      {/* Gender */}
      <div>
        <label className="block text-gray-700 mb-2 text-sm">
          Gender <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-6 text-sm">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={gender === "Male"}
              onChange={() => setGender("Male")}
              className="accent-blue-600"
            />
            Male
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={gender === "Female"}
              onChange={() => setGender("Female")}
              className="accent-blue-600"
            />
            Female
          </label>
        </div>
        {errors.gender && <p className="text-red-500 text-xs">{errors.gender}</p>}
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-6">
        <button className="px-5 py-2 border rounded-md text-sm" onClick={goPrev}>
          Previous
        </button>
        <button className="px-5 py-2 bg-blue-600 text-white rounded-md text-sm" onClick={goNext}>
          Next
        </button>
      </div>

    </div>
  </div>
)}

     {/* STEP 3 */}
{step === 3 && (
  <div>
    <div className="space-y-4">

      {/* First & Last Name */}
      <div className="flex gap-4">
        <div className="w-1/2">
          <label className="block text-gray-700 mb-1 text-sm">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter First Name"
            className="w-full px-2 py-1.5 border rounded-md bg-gray-50 text-sm"
          />
          {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
        </div>

        <div className="w-1/2">
          <label className="block text-gray-700 mb-1 text-sm">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter Last Name"
            className="w-full px-2 py-1.5 border rounded-md bg-gray-50 text-sm"
          />
        </div>
      </div>

      {/* Email & Mobile */}
      <div className="flex gap-4">
        <div className="w-1/2">
          <label className="block text-gray-700 mb-1 text-sm">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            className="w-full px-2 py-1.5 border rounded-md bg-gray-50 text-sm"
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
        </div>

        <div className="w-1/2">
          <label className="block text-gray-700 mb-1 text-sm">
            Mobile <span className="text-red-500">*</span>
          </label>
          <input
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter Mobile Number"
            className="w-full px-2 py-1.5 border rounded-md bg-gray-50 text-sm"
          />
          {errors.mobile && <p className="text-red-500 text-xs">{errors.mobile}</p>}
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="block text-gray-700 mb-1 text-sm">
          Password <span className="text-red-500">*</span>
        </label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter Password"
          className="w-full px-2 py-1.5 border rounded-md bg-gray-50 text-sm"
        />
        {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
      </div>

      {/* Terms & Policy */}
      <div>
        <label className="flex gap-2 text-sm">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          I agree to Terms & Policy
        </label>
        {errors.agree && <p className="text-red-500 text-xs">{errors.agree}</p>}
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-6">
        <button className="px-5 py-2 border rounded-md text-sm" onClick={goPrev}>
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
  </div>
)}


{/* Divider Line */}
<div className="w-full h-[1px] bg-gray-300 mt-6 mb-6"></div>

{/* Single Line Text + Link */}
<div className="text-center text-sm">
  <span className="text-gray-600">Already have an account? </span>
  <Link
    to="/login"
    className="text-indigo-600 hover:text-indigo-800 font-semibold transition"
  >
    Login
  </Link>
</div>

      </div>
      

    </div>
  );
}
