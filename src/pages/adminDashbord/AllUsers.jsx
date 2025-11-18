import { useState } from "react";
import { User, Calendar, Search, FileText, ArrowUpDown } from "lucide-react";

export default function UsersPage() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Rohit Sharma",
      email: "rohit@example.com",
      joined: "2025-01-15",
      totalRequests: 12,
    },
    {
      id: 2,
      name: "Aman Gupta",
      email: "aman@example.com",
      joined: "2025-01-14",
      totalRequests: 7,
    },
    {
      id: 3,
      name: "Priya Rathod",
      email: "priya@example.com",
      joined: "2025-01-10",
      totalRequests: 18,
    },
    {
      id: 4,
      name: "Neha Singh",
      email: "neha@example.com",
      joined: "2025-01-11",
      totalRequests: 4,
    },
  ]);

  const [search, setSearch] = useState("");

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-8">

      {/* PAGE TITLE */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">All Users</h1>

        {/* TOTAL USERS CARD */}
        <div className="bg-gradient-to-r from-violet-500 to-purple-600 text-white px-6 py-4 rounded-xl shadow-md">
          <p className="text-sm opacity-80">Total Users</p>
          <p className="text-2xl font-bold">{users.length}</p>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow border">
        <Search className="text-gray-500" />
        <input
          type="text"
          placeholder="Search users by name or email..."
          className="flex-1 outline-none text-gray-700"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* USERS LIST */}
      <div className="bg-white rounded-xl shadow-lg border">
        {/* HEADER */}
        <div className="grid grid-cols-4 gap-4 p-4 border-b bg-gray-50 font-semibold text-gray-700">
          <div className="flex items-center gap-2">
            <User size={18} /> Name
          </div>

          <div>Email</div>

          <div className="flex items-center gap-1 cursor-pointer">
            <Calendar size={18} /> Joined
            <ArrowUpDown size={16} />
          </div>

          <div className="flex items-center gap-2">
            <FileText size={18} /> Requests
          </div>
        </div>

        {/* USERS DATA */}
        {filteredUsers.map((u) => (
          <div
            key={u.id}
            className="grid grid-cols-4 gap-4 p-4 border-b hover:bg-gray-100 transition"
          >
            <div className="font-medium text-gray-800">{u.name}</div>

            <div className="text-gray-700">{u.email}</div>

            <div className="text-gray-600">{u.joined}</div>

            <div className="text-violet-600 font-bold">{u.totalRequests}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
