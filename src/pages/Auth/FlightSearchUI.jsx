import React, { useEffect, useRef, useState } from "react";
import { CheckCircle, Clock, CreditCard, ClipboardList, Calendar, DollarSign } from "lucide-react";

export default function FlightSearchUI() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSlotBook = () => {
    alert(`Slot booked for ${selectedSlot}`);
  };

  const priceRanges = [
    { range: "Under $50", count: 234, color: "from-green-400 to-green-600", icon: DollarSign },
    { range: "$50 - $100", count: 456, color: "from-blue-400 to-blue-600", icon: DollarSign },
    { range: "$100 - $200", count: 123, color: "from-orange-400 to-orange-600", icon: DollarSign },
    { range: "Over $200", count: 89, color: "from-red-400 to-red-600", icon: DollarSign },
  ];

  return (
    <div className="min-h-screen bg-[#a69ec0] flex justify-center p-4">
      <div className="w-full max-w-7xl bg-white rounded-3xl shadow-2xl p-4 md:p-6 lg:p-8 space-y-6">

        {/* --------------------------- TOP HEADER --------------------------- */}
        <div className="bg-[#4b3fa6] text-white rounded-2xl p-4 md:p-6 lg:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6 relative">

          {/* Left Section */}
          <div className="flex-1">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">Welcome Back 👋</h2>
            <p className="text-sm md:text-base opacity-80 mt-1">Track, manage & complete all your forms easily.</p>
          </div>

          {/* Middle Section */}
          <div className="flex items-center gap-3 flex-wrap justify-center md:justify-start flex-1">
            <div className="bg-white/20 rounded-lg px-3 md:px-4 py-2 text-sm md:text-base flex items-center gap-2">📅 Tuesday, Apr 21</div>
            <div className="bg-white/20 rounded-lg px-3 md:px-4 py-2 text-sm md:text-base flex items-center gap-2">↔ One way</div>
          </div>

          {/* Right Notifications & Profile */}
          <div className="flex items-center gap-3 md:gap-4 justify-end mt-4 md:mt-0 flex-1">

            {/* Notification Icon */}
            <div className="relative">
              <button className="relative p-2 rounded-full hover:bg-white/20 transition">
                🔔
              </button>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                3
              </span>
            </div>

            {/* Profile */}
            <div className="relative flex items-center gap-2 md:gap-3 bg-white text-black px-2 md:px-3 py-2 rounded-xl shadow-md">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPFNeUn89NkscCQdePBFlIp7ixL81eU9pY3g&s"
                alt="Profile"
                className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
              />
              <div className="hidden sm:block">
                <p className="text-xs text-gray-500">Hello,</p>
                <p className="font-semibold text-sm md:text-base">Abhishek patidar</p>
              </div>
              <div className="relative" ref={menuRef}>
                <button
                  aria-haspopup="true"
                  aria-expanded={menuOpen}
                  onClick={() => setMenuOpen((v) => !v)}
                  className="ml-1 md:ml-2 text-lg md:text-xl font-bold p-1 rounded hover:bg-gray-100"
                >
                  ⋮
                </button>
                {menuOpen && (
                  <div className="absolute right-0 top-10 md:top-12 w-40 md:w-44 bg-white shadow-xl rounded-xl p-2 space-y-1 z-50">
                    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-sm">Edit Profile</button>
                    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-sm">Settings</button>
                    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 text-sm">Logout</button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* --------------------------- DASHBOARD CARDS --------------------------- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
          <div className="group bg-gradient-to-br from-[#4b3fa6] to-[#7a6fe3] text-white p-4 md:p-5 rounded-2xl shadow-lg hover:scale-[1.03] transition-all cursor-pointer">
            <div className="flex justify-between items-center">
              <p className="text-xs md:text-sm opacity-80">Total Bookings</p>
              <ClipboardList className="w-5 h-5 md:w-6 md:h-6 opacity-90" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mt-2">1,248</h2>
            <p className="text-xs mt-2 opacity-80">Updated just now</p>
          </div>

          <div className="bg-white p-4 md:p-5 rounded-2xl shadow-lg border border-gray-100 hover:scale-[1.03] transition-all cursor-pointer">
            <div className="flex justify-between items-center">
              <p className="text-xs md:text-sm text-gray-500">Completed</p>
              <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-500" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-green-600 mt-2">1,032</h2>
            <p className="text-xs mt-2 text-gray-400">All-time</p>
          </div>

          <div className="bg-white p-4 md:p-5 rounded-2xl shadow-lg border border-gray-100 hover:scale-[1.03] transition-all cursor-pointer">
            <div className="flex justify-between items-center">
              <p className="text-xs md:text-sm text-gray-500">Processing</p>
              <Clock className="w-5 h-5 md:w-6 md:h-6 text-orange-500" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-orange-500 mt-2">142</h2>
            <p className="text-xs mt-2 text-gray-400">Awaiting confirmation</p>
          </div>

          <div className="bg-gradient-to-br from-orange-400 to-orange-600 text-white p-4 md:p-5 rounded-2xl shadow-lg hover:scale-[1.03] transition-all cursor-pointer">
            <div className="flex justify-between items-center">
              <p className="text-xs md:text-sm opacity-80">Total Payment</p>
              <CreditCard className="w-5 h-5 md:w-6 md:h-6 opacity-90" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mt-2">$58,420</h2>
            <p className="text-xs mt-2 opacity-90">USD received</p>
          </div>
        </div>
      

        {/* MAIN BODY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 px-4 md:px-6 pb-6 md:pb-10">
          {/* LEFT FLIGHT LIST */}
          <div className="lg:col-span-9 space-y-4">
            {/* <p className="text-sm text-gray-500">183 results</p> */}

            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow p-4 md:p-5 flex flex-col sm:flex-row gap-4 md:gap-6 items-center">
                <div className="sm:w-40">
                  <p className="font-semibold text-sm md:text-base">10:30 AM</p>
                  <p className="text-xs text-gray-500">Barcelona (BCN)</p>
                  <p className="text-xs text-gray-400">Tue, Apr 21, 2020</p>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <div className="relative h-1 bg-gray-200 flex-1 rounded-full">
                      <span className="absolute -left-1 -top-1 w-3 h-3 bg-[#4b3fa6] rounded-full"></span>
                      <span className="absolute -right-1 -top-1 w-3 h-3 bg-[#4b3fa6] rounded-full"></span>
                    </div>
                    <p className="text-xs text-gray-400 w-20 md:w-24 text-right">1h 50m</p>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">Non-stop</p>
                </div>

                <div className="sm:w-40 text-right">
                  <p className="text-base md:text-lg font-bold">$56 <span className="text-xs text-gray-400">USD</span></p>
                  <button className="mt-3 bg-orange-400 text-white px-4 md:px-5 py-2 rounded-lg shadow text-sm md:text-base">Select</button>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT FILTER SIDEBAR */}
          <div className="lg:col-span-3 space-y-4 md:space-y-6">
            <div className="bg-white p-4 rounded-2xl shadow">
              <button className="w-full bg-[#eef0ff] text-[#3f2aa3] py-2 rounded-lg font-semibold text-sm md:text-base">Get slots alerts</button>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow text-sm space-y-4 md:space-y-6">
              {/* Stops */}
              {/* <div>
                <h3 className="font-semibold mb-2">Stops</h3>
                <div className="space-y-2">
                  <label className="flex justify-between text-xs md:text-sm">
                    <span>
                      <input type="checkbox" className="mr-2" /> Non-stop
                    </span>
                    <span>$34</span>
                  </label>

                  <label className="flex justify-between text-xs md:text-sm">
                    <span>
                      <input type="checkbox" className="mr-2" /> 1 stop
                    </span>
                    <span>$70</span>
                  </label>

                  <label className="flex justify-between text-xs md:text-sm">
                    <span>
                      <input type="checkbox" className="mr-2" /> 2+ stops
                    </span>
                    <span>$98</span>
                  </label>
                </div>
              </div> */}

              {/* Departure */}
              {/* <div>
                <h3 className="font-semibold mb-2">Departure times</h3>
                <input type="range" className="w-full" />
                <p className="text-xs text-gray-400 mt-1">11:00 AM – 11:00 PM</p>
              </div> */}

              {/* Duration */}
              {/* <div>
                <h3 className="font-semibold mb-2">Trip duration</h3>
                <input type="range" className="w-full" />
                <p className="text-xs text-gray-400 mt-1">2 hours – 12 hours</p>
              </div> */}

              {/* Baggage */}
              {/* <div>
                <h3 className="font-semibold mb-2">Baggage</h3>
                <div className="space-y-2">
                  <label className="flex justify-between text-xs md:text-sm">
                    <span>
                      <input type="radio" name="bag" className="mr-2" /> 1 small bag
                    </span>
                    <span>$34</span>
                  </label>

                  <label className="flex justify-between text-xs md:text-sm">
                    <span>
                      <input type="radio" name="bag" className="mr-2" /> 2 cabin bags
                    </span>
                    <span>$58</span>
                  </label>

                  <label className="flex justify-between text-xs md:text-sm">
                    <span>
                      <input type="radio" name="bag" className="mr-2" /> Checked-in
                    </span>
                    <span>$112</span>
                  </label>
                </div>
              </div> */}

              {/* Airports */}
              {/* <div>
                <h3 className="font-semibold mb-2">Airports</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs md:text-sm">
                    <input type="checkbox" /> CIA - Rome Ciampino
                  </label>

                  <label className="flex items-center gap-2 text-xs md:text-sm">
                    <input type="checkbox" /> FCO - Rome Fiumicino
                  </label>
                </div>
              </div>

            </div> */}


            {/* BOOK A SLOT SECTION */}
            <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-[#4b3fa6]" />
                <h3 className="font-semibold text-base md:text-lg">Book a Slot</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
                  <input type="date" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4b3fa6] focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Time Slot</label>
                  <select 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4b3fa6] focus:border-transparent" 
                    onChange={(e) => setSelectedSlot(e.target.value)}
                  >
                    <option value="">Choose a slot</option>
                    <option value="9:00 AM - 10:00 AM">9:00 AM - 10:00 AM</option>
                    <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                    <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                    <option value="1:00 PM - 2:00 PM">1:00 PM - 2:00 PM</option>
                    <option value="2:00 PM - 3:00 PM">2:00 PM - 3:00 PM</option>
                  </select>
                </div>
                <button 
                  onClick={handleSlotBook} 
                  disabled={!selectedSlot} 
                  className="w-full bg-[#4b3fa6] text-white py-3 rounded-lg font-semibold hover:bg-[#3f2aa3] transition disabled:bg-gray-400 disabled:cursor-not-allowed text-sm md:text-base"
                >
                  Book Slot
                </button>
              </div>
            </div>
            
           
              </div>
            </div>

          </div>

        </div>


    </div>
  );
}
