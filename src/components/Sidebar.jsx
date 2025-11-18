import { NavLink } from "react-router-dom";
import {
  LogOut,
  Settings,
  User,
} from "lucide-react";

export default function Sidebar({ roleMenus = [] }) {
  return (
    <div className="w-72 min-h-screen fixed left-0 top-0 bg-gradient-to-b from-violet-600 to-purple-700 text-white shadow-2xl flex flex-col">

      {/* -------- COMPANY LOGO -------- */}
      <div className="p-6 border-b border-white/20 flex items-center gap-3">
        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl font-bold">
          F
        </div>
        <h1 className="text-2xl font-semibold tracking-wide">
          FormEase
        </h1>
      </div>

      {/* -------- MAIN MENU -------- */}
      <div className="flex-1 overflow-y-auto mt-4">
        <p className="px-6 text-sm uppercase tracking-wider text-white/60 mb-2">Menu</p>

        <div className="space-y-1">
          {roleMenus.map((menu, index) => (
          <NavLink
  to={menu.route}
  key={index}
  className={({ isActive }) =>
    `flex items-center gap-3 px-6 py-3 transition rounded-lg cursor-pointer 
     hover:bg-white/20 ${isActive ? "bg-white/25 shadow-inner" : ""}`
  }
>
  <menu.icon size={20} />
  <span className="text-base">{menu.title}</span>
</NavLink>
          ))}
        </div>
      </div>

      {/* -------- COMMON MENU -------- */}
      <div className="p-4 border-t border-white/20 space-y-2">

        <NavLink
          to="/profile"
          className="flex items-center gap-3 px-4 py-3 hover:bg-white/20 rounded-lg transition"
        >
          <User size={20} />
          <span>Profile</span>
        </NavLink>

        <NavLink
          to="/settings"
          className="flex items-center gap-3 px-4 py-3 hover:bg-white/20 rounded-lg transition"
        >
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>

        <button
          className="flex items-center gap-3 px-4 w-full py-3 hover:bg-red-500/40 hover:text-red-100
                     rounded-lg transition text-red-200"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
