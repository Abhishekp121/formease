import React from "react";
import { Users, Briefcase, ClipboardCheck, MessageSquare, UserPlus, Layers, Calendar, CheckCircle, Clock } from "lucide-react";

export default function SubAdminHome() {
  const stats = [
    { title: "Total Teams", value: 8, icon: <Layers className="w-10 h-10" />, bg: "bg-blue-100 text-blue-700" },
    { title: "Total Employees", value: 32, icon: <Users className="w-10 h-10" />, bg: "bg-purple-100 text-purple-700" },
    { title: "Workload Requests", value: 6, icon: <Briefcase className="w-10 h-10" />, bg: "bg-amber-100 text-amber-700" },
    { title: "Pending Approvals", value: 4, icon: <ClipboardCheck className="w-10 h-10" />, bg: "bg-green-100 text-green-700" },
    { title: "Upcoming Slots", value: 3, icon: <Calendar className="w-10 h-10" />, bg: "bg-indigo-100 text-indigo-700" },
    { title: "Completed Requests", value: 20, icon: <CheckCircle className="w-10 h-10" />, bg: "bg-teal-100 text-teal-700" },
    { title: "Pending Tasks", value: 5, icon: <Clock className="w-10 h-10" />, bg: "bg-orange-100 text-orange-700" },
    { title: "Chats with Employees", value: 12, icon: <MessageSquare className="w-10 h-10" />, bg: "bg-red-100 text-red-700" },
    { title: "Chats with Users", value: 5, icon: <UserPlus className="w-10 h-10" />, bg: "bg-teal-100 text-teal-700" },
  ];

  return (
    <div className="p-6">
      {/* <h1 className="text-3xl font-bold mb-6">SubAdmin Dashboard</h1> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((item, index) => (
          <div key={index} className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 p-6 flex items-center justify-between border border-gray-200 cursor-pointer">
            <div>
              <p className="text-gray-500 text-sm font-medium">{item.title}</p>
              <h2 className="text-3xl font-bold mt-2">{item.value}</h2>
            </div>
            <div className={`p-5 rounded-full ${item.bg}`}>{item.icon}</div>
          </div>
        ))}
      </div>
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <ul className="space-y-3 text-gray-600">
            <li>Rohit completed SSC form - 2h ago</li>
            <li>Aditi requested document verification - 3h ago</li>
            <li>New slot booked by Priya - 5h ago</li>
            <li>Team Alpha completed a batch of requests - 6h ago</li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition">Create Team</button>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition">Assign Request</button>
            <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition">Add Employee</button>
            <button className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition">View Pending</button>
          </div>
        </div>
      </div>
    </div>
  );
}
