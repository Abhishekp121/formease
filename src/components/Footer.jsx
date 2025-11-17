import React from "react";


const Footer = () => {
  return (
    <>
    <footer className="bg-gray-900 text-gray-300 py-8 mt-10">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Logo / Brand Name */}
        <h2 className="text-2xl font-bold text-white mb-2">FormEase</h2>
        <p className="text-gray-400 mb-6">
          Smart Management & Automation Made Simple
        </p>

        {/* Navigation Links */}
        <div className="flex justify-center flex-wrap gap-6 mb-6 text-sm">
          <a href="#home" className="hover:text-white transition">Home</a>
          <a href="#about" className="hover:text-white transition">About</a>
          <a href="#contact" className="hover:text-white transition">Contact</a>
          <a href="#demo" className="hover:text-white transition">Get Demo</a>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-5 mb-6 text-lg">
          <a href="#" className="hover:text-blue-500 transition">
            <i className="fa-brands fa-facebook-f"></i>
          </a>
          <a href="#" className="hover:text-pink-500 transition">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="#" className="hover:text-sky-400 transition">
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a href="#" className="hover:text-blue-600 transition">
            <i className="fa-brands fa-linkedin-in"></i>
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} FormEase. All rights reserved.
        </p>
      </div>
    </footer> 
   
    </>
  );
};

export default Footer;
