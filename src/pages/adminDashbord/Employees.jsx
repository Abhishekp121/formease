import React, { useState } from "react";
import { Search, Users, MoreVertical, Edit, Trash2, Plus } from "lucide-react";

export default function ViewManageEmployees() {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Riya Sharma",
      role: "Form Filling Executive",
      email: "riya@example.com",
      phone: "+91 9876543210",
      joined: "12 Jan 2024",
      status: "Active",
    },
    {
      id: 2,
      name: "Arjun Patel",
      role: "Customer Support",
      email: "arjun@example.com",
      phone: "+91 9123456780",
      joined: "28 Feb 2024",
      status: "Inactive",
    },
  ]);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <Users size={30} /> View / Manage Employees
        </h2>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl shadow-md transition-all">
          <Plus size={20} /> Add Employee
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-white p-4 rounded-2xl shadow mb-6 flex items-center gap-3">
        <Search size={20} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search employee by name, role or phone..."
          className="w-full outline-none text-gray-700"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="py-3 px-6 text-gray-600">Employee</th>
              <th className="py-3 px-6 text-gray-600">Role</th>
              <th className="py-3 px-6 text-gray-600">Phone</th>
              <th className="py-3 px-6 text-gray-600">Joined</th>
              <th className="py-3 px-6 text-gray-600">Status</th>
              <th className="py-3 px-6 text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr
                key={emp.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="py-4 px-6 font-medium text-gray-800">
                  {emp.name}
                </td>
                <td className="py-4 px-6 text-gray-600">{emp.role}</td>
                <td className="py-4 px-6 text-gray-600">{emp.phone}</td>
                <td className="py-4 px-6 text-gray-600">{emp.joined}</td>
                <td className="py-4 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      emp.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {emp.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <button className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200">
                      <Edit size={18} className="text-blue-600" />
                    </button>
                    <button className="p-2 bg-red-100 rounded-lg hover:bg-red-200">
                      <Trash2 size={18} className="text-red-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-200 rounded-lg">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
