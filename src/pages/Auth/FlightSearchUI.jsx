import React, { useEffect, useRef, useState } from "react";
import { CheckCircle, Clock, CreditCard, ClipboardList } from "lucide-react";


export default function FlightSearchUI() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-[#a69ec0] flex items-center justify-center p-4 flex">
      <div className="w-full max-w-7xl bg-white rounded-3xl shadow-2xl p-6 md:p-8 space-y-6">

      {/* --------------------------- TOP SEARCH BAR --------------------------- */}
<div className="bg-[#4b3fa6] text-white rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative">

  {/* Left Section */}
  <div>
    <h2 className="text-xl font-semibold">Welcome Back 👋</h2>
    <p className="text-sm opacity-80">Track, manage & complete all your forms easily.</p>
  </div>

  {/* Middle Section */}
  <div className="flex items-center gap-3 flex-wrap justify-center">
    <div className="bg-white/20 rounded-lg px-4 py-2 text-sm flex items-center gap-2">📅 Tuesday, Apr 21</div>
    <div className="bg-white/20 rounded-lg px-4 py-2 text-sm flex items-center gap-2">↔ One way</div>
  </div>

  {/* Right Notifications & Profile */}
  <div className="flex items-center gap-4 justify-end mt-4 md:mt-0">

    {/* Notification Icon */}
    <div className="relative">
      <button className="relative p-2 rounded-full hover:bg-white/20 transition">
        🔔
      </button>
      {/* Badge */}
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
        3
      </span>
    </div>
          {/* Right Profile Section */}
              
          <div className="relative hidden md:flex items-center gap-3 bg-white text-black px-3 py-2 rounded-xl shadow-md">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPFNeUn89NkscCQdePBFlIp7ixL81eU9pY3g&s" alt="Profile" className="w-10 h-10 rounded-full object-cover" />

            <div>
              <p className="text-xs text-gray-500">Hello,</p>
              <p className="font-semibold">Benjamin Rous</p>
            </div>

            {/* Dots + Popup Wrapped */}
            <div className="relative" ref={menuRef}>
              <button
                aria-haspopup="true"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((v) => !v)}
                className="ml-2 text-xl font-bold p-1 rounded hover:bg-gray-100"
              >
                ⋮
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-12 w-44 bg-white shadow-xl rounded-xl p-2 space-y-1 z-50">
                  <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100">Edit Profile</button>
                  <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100">Settings</button>
                  <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 text-red-600">Logout</button>
                </div>
              )}
            </div>
          </div>
        </div>
        </div>

        {/* --------------------------- FILTER CARDS --------------------------- */}
      {/* DASHBOARD CARDS ABOVE RESULTS */}
{/* DASHBOARD ICON CARDS */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

  {/* Total Bookings */}
  <div className="group bg-gradient-to-br from-[#4b3fa6] to-[#7a6fe3] text-white p-5 rounded-2xl shadow-lg hover:scale-[1.03] transition-all cursor-pointer">
    <div className="flex justify-between items-center">
      <p className="text-sm opacity-80">Total Bookings</p>
      <ClipboardList className="w-6 h-6 opacity-90" />
    </div>
    <h2 className="text-3xl font-bold mt-2">1,248</h2>
    <p className="text-xs mt-2 opacity-80">Updated just now</p>
  </div>

  {/* Completed Bookings */}
  <div className="bg-white p-5 rounded-2xl shadow-lg border border-gray-100 hover:scale-[1.03] transition-all cursor-pointer">
    <div className="flex justify-between items-center">
      <p className="text-sm text-gray-500">Completed</p>
      <CheckCircle className="w-6 h-6 text-green-500" />
    </div>
    <h2 className="text-3xl font-bold text-green-600 mt-2">1,032</h2>
    <p className="text-xs mt-2 text-gray-400">All-time</p>
  </div>

  {/* Pending Bookings */}
  <div className="bg-white p-5 rounded-2xl shadow-lg border border-gray-100 hover:scale-[1.03] transition-all cursor-pointer">
    <div className="flex justify-between items-center">
      <p className="text-sm text-gray-500">Pending</p>
      <Clock className="w-6 h-6 text-orange-500" />
    </div>
    <h2 className="text-3xl font-bold text-orange-500 mt-2">142</h2>
    <p className="text-xs mt-2 text-gray-400">Awaiting confirmation</p>
  </div>

  {/* Total Payment */}
  <div className="bg-gradient-to-br from-orange-400 to-orange-600 text-white p-5 rounded-2xl shadow-lg hover:scale-[1.03] transition-all cursor-pointer">
    <div className="flex justify-between items-center">
      <p className="text-sm opacity-80">Total Payment</p>
      <CreditCard className="w-6 h-6 opacity-90" />
    </div>
    <h2 className="text-3xl font-bold mt-2">$58,420</h2>
    <p className="text-xs mt-2 opacity-90">USD received</p>
  </div>

</div>


        {/* --------------------------- MAIN LAYOUT --------------------------- */}
        <div className="grid md:grid-cols-12 gap-6">

          {/* LEFT RESULTS */}
          <div className="md:col-span-9 space-y-4">
            <p className="text-sm text-gray-500">183 results</p>

            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow p-5 flex flex-col sm:flex-row gap-6 items-center">

                <div className="sm:w-40">
                  <p className="font-semibold">10:30 AM</p>
                  <p className="text-xs text-gray-500">Barcelona (BCN)</p>
                  <p className="text-xs text-gray-400">Tue, Apr 21, 2020</p>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <div className="relative h-1 bg-gray-200 flex-1 rounded-full">
                      <span className="absolute -left-1 -top-1 w-3 h-3 bg-[#4b3fa6] rounded-full"></span>
                      <span className="absolute -right-1 -top-1 w-3 h-3 bg-[#4b3fa6] rounded-full"></span>
                    </div>
                    <p className="text-xs text-gray-400 w-24 text-right">1h 50m</p>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">Non-stop</p>
                </div>

                <div className="sm:w-40 text-right">
                  <p className="text-lg font-bold">
                    $56 <span className="text-xs text-gray-400">USD</span>
                  </p>
                  <button className="mt-3 bg-orange-400 text-white px-5 py-2 rounded-lg shadow">Select</button>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="md:col-span-3 space-y-6">

            <div className="bg-white rounded-2xl p-4 shadow">
              <button className="w-full bg-[#eef0ff] text-[#3f2aa3] py-2 rounded-lg font-semibold">Get price alerts</button>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow space-y-6 text-sm">

              <div>
                <h3 className="font-semibold mb-2">Stops</h3>
                <div className="space-y-2">
                  <label className="flex justify-between"><span><input type="checkbox" className="mr-2" />Non-stop</span><span>$34</span></label>
                  <label className="flex justify-between"><span><input type="checkbox" className="mr-2" />1 stop</span><span>$70</span></label>
                  <label className="flex justify-between"><span><input type="checkbox" className="mr-2" />2+ stops</span><span>$98</span></label>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Departure times</h3>
                <input type="range" className="w-full" />
                <p className="text-xs text-gray-400 mt-1">11:00 AM – 11:00 PM</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Trip duration</h3>
                <input type="range" className="w-full" />
                <p className="text-xs text-gray-400 mt-1">2 hours – 12 hours</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Baggage</h3>
                <div className="space-y-2">
                  <label className="flex justify-between"><span><input type="radio" name="bag" className="mr-2" />1 small bag</span><span>$34</span></label>
                  <label className="flex justify-between"><span><input type="radio" name="bag" className="mr-2" />2 cabin bags</span><span>$58</span></label>
                  <label className="flex justify-between"><span><input type="radio" name="bag" className="mr-2" />Checked-in</span><span>$112</span></label>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Airports</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2"><input type="checkbox" />CIA - Rome Ciampino</label>
                  <label className="flex items-center gap-2"><input type="checkbox" />FCO - Rome Fiumicino</label>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
