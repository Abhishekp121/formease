import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white sticky top-0 z-50 shadow-lg backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          {/* Logo (Left Side) */}
          <Link
            to="/"
            className="text-3xl font-extrabold tracking-tight hover:scale-105 transition-transform duration-300"
          >
            FormEase
          </Link>

          {/* Center Menu */}
          <div className="hidden md:flex items-center space-x-10 text-lg font-medium">
            <Link
              to="/"
              className="hover:text-yellow-300 transition duration-200"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="hover:text-yellow-300 transition duration-200"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="hover:text-yellow-300 transition duration-200"
            >
              Contact
            </Link>
          </div>

          {/* Right Side (Login & Signup Buttons) */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/login"
              className="px-5 py-2 border border-white rounded-full hover:bg-white hover:text-indigo-600 transition duration-300"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-5 py-2 bg-white text-indigo-600 font-semibold rounded-full hover:bg-yellow-300 hover:text-purple-700 transition duration-300"
            >
              Signup
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-3xl focus:outline-none"
            onClick={() => setIsOpen(true)}
          >
            <FiMenu />
          </button>
        </div>
      </nav>

      {/* Overlay (same as before) */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Side Drawer Menu (unchanged) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-indigo-700 via-purple-700 to-pink-600 text-white shadow-2xl z-50 transform transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-white/20">
          <h2 className="text-2xl font-bold">Menu</h2>
          <button onClick={() => setIsOpen(false)} className="text-3xl">
            <FiX />
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col items-start px-6 py-6 space-y-6 text-lg font-medium">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="hover:text-yellow-300 transition"
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className="hover:text-yellow-300 transition"
          >
            About
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="hover:text-yellow-300 transition"
          >
            Contact
          </Link>

          <div className="w-full border-t border-white/20 my-2"></div>

          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="hover:text-yellow-300 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 bg-white text-indigo-700 font-semibold rounded-full hover:bg-yellow-300 hover:text-purple-700 transition"
          >
            Signup
          </Link>
        </div>
      </div>

      <Outlet />
    </>
  );
}
