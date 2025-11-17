import React from "react";

export default function StepCircle({ n, step }) {
  const active = step === n;
  const done = step > n;

  return (
    <div
      className={`rounded-full w-10 h-10 flex items-center justify-center text-white font-bold ${
        done ? "bg-green-500" : active ? "bg-blue-600" : "bg-gray-300 text-gray-700"
      }`}
    >
      {done ? "✓" : n}
    </div>
  );
}
