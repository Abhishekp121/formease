// src/components/Sidebar/SidebarItem.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function SidebarItem({ label, path, isLogout }) {
  return (
    <Link
      to={path}
      className={`block px-5 py-3 rounded-xl mt-1 text-sm font-medium transition 
      ${isLogout 
        ? "text-red-300 hover:bg-red-500 hover:text-white" 
        : "text-white/90 hover:bg-white/20 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );
}
