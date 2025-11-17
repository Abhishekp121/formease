import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import  { useState } from "react";



export default function Home() {
   const [showVideo, setShowVideo] = useState(false);
  const features = [
    {
      title: "Book Any Government or College Form",
      desc: "Access all MP forms in one place — apply for scholarships, admissions, and government services instantly.",
      icon: "https://cdn-icons-png.flaticon.com/512/9068/9068647.png",
    },
    {
      title: "Upload Documents Easily",
      desc: "Connect DG Locker or upload directly with full encryption and verification support.",
      icon: "https://cdn-icons-png.flaticon.com/512/942/942799.png",
    },
    {
      title: "Secure Online Payments",
      desc: "Pay safely via Razorpay or Paytm — instant confirmation with auto-tracking.",
      icon: "https://cdn-icons-png.flaticon.com/512/1159/1159633.png",
    },
    {
      title: "Track Status & Download Receipt",
      desc: "Stay updated in real-time — check booking progress and download receipts anytime.",
      icon: "https://cdn-icons-png.flaticon.com/512/9068/9068699.png",
    },

     {
    title: "Instant Support & Chatbot",
    desc: "24x7 AI + human support — form filling or document queries ka instant solution.",
    icon: "https://cdn-icons-png.flaticon.com/512/4712/4712109.png", // 💬 Chatbot icon
  },
   {
    title: "Smart Form Helper 🤖",
    desc: "AI guides you while filling any form — auto-suggests details, checks for missing info, and saves your time.",
    icon: "https://cdn-icons-png.flaticon.com/512/4712/4712100.png",
  },
  
  {
    title: "Chat With Your Assistant 💬",
    desc: "Ask any question about government forms, deadlines, or required documents — AI replies instantly, 24×7.",
    icon: "https://cdn-icons-png.flaticon.com/512/4712/4712035.png",
  },
  {
    title: "Auto Reminder & Notifications",
    desc: "Form dates, payments & correction deadlines ke liye automatic alerts — ab koi last date miss nahi.",
    icon: "https://cdn-icons-png.flaticon.com/512/609/609361.png", // 🔔 Bell/calendar icon
  },

    
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-600 via-purple-600 to-pink-500 text-white">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row justify-between items-center text-center md:text-left px-8 md:px-20 pt-16 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 space-y-6"
        >
          <h2 className="text-5xl font-bold leading-tight">
            Simplify Your Form Filling Process with{" "}
            <span className="text-yellow-300">FormEase</span>
          </h2>
          <p className="text-lg text-gray-100">
            No more queues, no more confusion. Book, upload, pay, and get your
            official forms filled from home — fast, secure, and hassle-free.
          </p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <Link
              to="/signup"
              className="bg-yellow-400 text-black text-lg px-6 py-3 rounded-xl hover:bg-yellow-300 transition"
            >
              Get Started
            </Link>
            <button
              onClick={() => setShowVideo(true)}
              className="border border-white/60 px-6 py-3 rounded-xl hover:bg-white/10 transition"
            >
              Get Demo
            </button>

          </div>
        </motion.div>

        <motion.img
          src="data:image/jpeg;base64,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"
          alt="FormEase Illustration"
          className="md:w-1/2 mt-10 md:mt-0 rounded-3xl shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        />
      </section>


     {/* ✅ YouTube Modal */}
{showVideo && (
  <div
    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
    onClick={() => setShowVideo(false)} // close on background click
  >
    <div
      className="relative w-[90%] md:w-[60%] aspect-video"
      onClick={(e) => e.stopPropagation()} // stop click inside video from closing
    >
      <iframe
        src="https://www.youtube.com/embed/sJGVcb5fn2c?autoplay=1&rel=0"
        title="FormEase Demo"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="rounded-lg shadow-2xl w-full h-full"
      ></iframe>

      {/* Close Button */}
      <button
        onClick={() => setShowVideo(false)}
        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-lg font-bold transition-all"
      >
        ✕
      </button>
    </div>
  </div>
)}




      {/* Features Section */}
      <section id="features" className="py-16 px-6 md:px-20 bg-white text-gray-800">
        <h3 className="text-4xl font-bold text-center mb-12">
          Why Choose FormEase?
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-50 rounded-2xl p-6 shadow hover:shadow-xl transition-all border border-gray-200"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <img src={f.icon} alt={f.title} className="w-16 h-16" />
                <h4 className="font-bold text-lg">{f.title}</h4>
                <p className="text-gray-600 text-sm">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>


      <section
  id="how"
  className="py-24 bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-900 text-white"
>
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h2 className="text-4xl font-extrabold mb-4">How FormEase Works</h2>
    <p className="text-white/70 mb-16 text-lg">
      Simple 3-step process to fill and submit your forms effortlessly.
    </p>

    <div className="grid md:grid-cols-3 gap-10">
      {/* Step 1 */}
      <div className="relative group bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:scale-105 transition duration-500 hover:border-indigo-400">
        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white text-sm font-semibold px-4 py-1 rounded-full shadow-lg">
          Step 1
        </div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
          alt="Choose Form"
          className="w-16 h-16 mx-auto mb-6 opacity-90 group-hover:opacity-100"
        />
        <h3 className="text-2xl font-semibold mb-4">Choose Your Form</h3>
        <p className="text-white/70 text-sm leading-relaxed">
          Select your required form — like scholarships, Samagra ID update, or
          college admission — right from your dashboard.
        </p>
      </div>

      {/* Step 2 */}
      <div className="relative group bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:scale-105 transition duration-500 hover:border-indigo-400">
        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white text-sm font-semibold px-4 py-1 rounded-full shadow-lg">
          Step 2
        </div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/2920/2920244.png"
          alt="Upload Documents"
          className="w-16 h-16 mx-auto mb-6 opacity-90 group-hover:opacity-100"
        />
        <h3 className="text-2xl font-semibold mb-4">Upload Documents</h3>
        <p className="text-white/70 text-sm leading-relaxed">
          Upload your necessary documents — like ID proof, photo, and certificates.
          All files are stored securely in encrypted form.
        </p>
      </div>

      {/* Step 3 */}
      <div className="relative group bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl hover:scale-105 transition duration-500 hover:border-green-400">
        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-sm font-semibold px-4 py-1 rounded-full shadow-lg">
          Step 3
        </div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/992/992700.png"
          alt="Auto Fill"
          className="w-16 h-16 mx-auto mb-6 opacity-90 group-hover:opacity-100"
        />
        <h3 className="text-2xl font-semibold mb-4">Auto Fill & Submit</h3>
        <p className="text-white/70 text-sm leading-relaxed">
          Once form date opens, FormEase auto-fills and submits your form for
          verification. You’ll get real-time updates and receipt instantly.
        </p>
      </div>
    </div>

    <p className="text-center text-white/70 mt-10 text-sm italic">
      *FormEase automates everything — from choosing your form to submission and receipt tracking.
    </p>
  </div>
</section>



<section id="reviews" className="py-20 bg-gradient-to-br from-gray-800 via-black to-gray-700 text-white">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h2 className="text-3xl font-bold mb-12 text-indigo-400">
      What Our Users Say 💬
    </h2>

    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        {
          name: "Priya Sharma",
          review: "FormEase ne mera scholarship form bina kisi error ke fill kar diya. Service bahut fast thi!",
          rating: "⭐ 5/5",
          img: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        {
          name: "Rohit Mehta",
          review: "MP Online jane ki zarurat hi nahi padti ab. Payment aur document upload dono smooth hai.",
          rating: "⭐ 5/5",
          img: "https://randomuser.me/api/portraits/men/46.jpg",
        },
        {
          name: "Anjali Verma",
          review: "AI Assistant feature ne mera kaam asaan bana diya! Reminder bhi mil gaya time pe.",
          rating: "⭐ 4.5/5",
          img: "https://randomuser.me/api/portraits/women/65.jpg",
        },
      ].map((user, index) => (
        <div
          key={index}
          className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl hover:scale-105 transition-transform duration-300"
        >
          <div className="flex flex-col items-center text-center">
            <img
              src={user.img}
              alt={user.name}
              className="w-16 h-16 rounded-full mb-4 border-2 border-indigo-500 shadow-md"
            />
            <h3 className="text-lg font-semibold text-indigo-300">{user.name}</h3>
            <p className="text-sm text-white/80 italic mt-3 mb-4">
              “{user.review}”
            </p>
            <span className="text-yellow-400 font-medium">{user.rating}</span>
          </div>
        </div>
      ))}
    </div>

    <p className="text-sm text-gray-400 mt-12">
      Trusted by 1,000+ students & professionals across India 🇮🇳
    </p>
  </div>
</section>



      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-600 to-indigo-600 text-center">
        <h3 className="text-3xl font-bold mb-6">
          Start Booking Your Form Today
        </h3>
        <p className="text-lg mb-8 text-gray-100 max-w-xl mx-auto">
          Join thousands of users who trust FormEase to simplify their
          application process. It only takes 2 minutes to start.
        </p>
        <Link
          to="/signup"
          className="bg-white text-indigo-600 font-semibold text-lg px-6 py-3 rounded-xl hover:bg-gray-100 transition"
        >
          Book a Form Now
        </Link>
      </section>

    </div>
  );
}
