import { useEffect, useState, useRef } from "react";
import { Bell, MoreVertical, User } from "lucide-react";

export default function Header({ name = "Abhishek Patidar" }) {
  const [dateTime, setDateTime] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuRef = useRef(null);

  // ---- Live Date Time Updater ----
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      const options = {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };

      setDateTime(now.toLocaleString("en-US", options));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // ---- Close dropdown when clicking outside ----
  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="w-full bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      {/* ---------- LEFT: USER & TIME ---------- */}
      <div>
        <h2 className="text-xl font-bold text-gray-800">Welcome, {name}</h2>
        <p className="text-sm text-gray-500">{dateTime}</p>
      </div>

      {/* ---------- RIGHT: ICONS ---------- */}
      <div className="flex items-center gap-6 relative">
        {/* Notification */}
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
          <Bell size={22} className="text-gray-700" />
        </button>

        {/* Profile Icon */}
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-600 text-white font-semibold">
          <User size={20} />
        </div>

        {/* More Options (3 dots) */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <MoreVertical size={22} className="text-gray-700" />
          </button>

          {/* ---- DROPDOWN MENU ---- */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700">
                View Profile
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700">
                Settings
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
