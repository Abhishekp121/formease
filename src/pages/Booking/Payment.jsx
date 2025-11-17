import React from "react";

export default function Payment() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-indigo-500 to-pink-500 p-6">
      <div className="bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl p-10 w-full max-w-lg text-center">
        <h2 className="text-3xl font-bold text-white mb-4">💳 Secure Payment</h2>
        <p className="text-white/80 mb-8">
          You’ll be redirected to our secure payment gateway (Razorpay / Paytm) to
          complete your transaction.
        </p>

        <div className="space-y-4">
          <button className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-lg">
            Pay with Razorpay
          </button>
          <button className="w-full bg-green-500 text-white font-semibold py-3 rounded-lg hover:bg-green-600 transition duration-300 shadow-lg">
            Pay with Paytm
          </button>
        </div>

        <p className="text-white/70 text-sm mt-6">
          💡 Tip: After successful payment, you’ll get your booking confirmation instantly.
        </p>
      </div>
    </div>
  );
}
