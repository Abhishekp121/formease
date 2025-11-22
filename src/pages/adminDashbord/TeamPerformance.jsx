import React, { useState, useMemo } from "react";
import {
  User,
  Users,
  BarChart2,
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Activity,
  Award,
} from "lucide-react";

// Combined Team Performance component (fixed duplicate default export issue)
export default function TeamPerformance() {
  // small teams summary (from previous 'teams' array)
  const [teams] = useState([
    {
      id: 1,
      name: "Verification Team",
      members: 6,
      completed: 120,
      pending: 8,
      performance: 92,
      avgTime: "18 min",
    },
    {
      id: 2,
      name: "Form Filling Team",
      members: 4,
      completed: 98,
      pending: 5,
      performance: 88,
      avgTime: "22 min",
    },
    {
      id: 3,
      name: "Support Team",
      members: 3,
      completed: 140,
      pending: 12,
      performance: 95,
      avgTime: "15 min",
    },
  ]);

  // individual employee performance breakdown (from previous 'teamData' array)
  const [teamData] = useState([
    {
      id: 1,
      name: "Amit Sharma",
      role: "Senior Employee",
      tasksCompleted: 42,
      performance: 92,
      hoursWorked: 156,
      status: "Excellent",
    },
    {
      id: 2,
      name: "Priya Verma",
      role: "Junior Employee",
      tasksCompleted: 31,
      performance: 85,
      hoursWorked: 140,
      status: "Good",
    },
    {
      id: 3,
      name: "Rahul Singh",
      role: "Field Officer",
      tasksCompleted: 20,
      performance: 70,
      hoursWorked: 120,
      status: "Average",
    },
  ]);

  const overview = useMemo(() => {
    const totalTeams = teams.length;
    const avgPerf = (
      teams.reduce((s, t) => s + (t.performance || 0), 0) / Math.max(1, teams.length)
    ).toFixed(1);
    const topTeam = teams.slice().sort((a, b) => b.performance - a.performance)[0];

    return { totalTeams, avgPerf, topTeam: topTeam?.name || "-" };
  }, [teams]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">
      {/* PAGE HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <TrendingUp size={28} className="text-purple-600" /> Team Performance
          </h1>
          <p className="text-sm text-gray-500">Overview of teams and employee performance</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-purple-600 text-white rounded-xl shadow hover:shadow-lg transition">
            Generate Report
          </button>
        </div>
      </div>

      {/* OVERVIEW CARDS (combined summary) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl shadow-md flex items-center gap-4">
          <Users size={36} className="text-purple-600" />
          <div>
            <p className="text-gray-500 text-sm">Total Teams</p>
            <h2 className="text-2xl font-bold">{overview.totalTeams}</h2>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-md flex items-center gap-4">
          <BarChart3 size={36} className="text-blue-600" />
          <div>
            <p className="text-gray-500 text-sm">Avg Team Performance</p>
            <h2 className="text-2xl font-bold">{overview.avgPerf}%</h2>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-md flex items-center gap-4">
          <Award size={36} className="text-green-600" />
          <div>
            <p className="text-gray-500 text-sm">Top Team</p>
            <h2 className="text-xl font-bold">{overview.topTeam}</h2>
          </div>
        </div>
      </div>

      {/* TEAM CARDS (detailed per-team metrics) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <div key={team.id} className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition border">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <User size={18} className="text-purple-600" /> {team.name}
              </h2>

              <span className="px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-600 font-medium">
                {team.members} Members
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-gray-600 text-sm">
                  <CheckCircle size={16} className="text-green-600" /> Completed
                </span>
                <span className="font-semibold">{team.completed}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-gray-600 text-sm">
                  <XCircle size={16} className="text-red-600" /> Pending
                </span>
                <span className="font-semibold">{team.pending}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-gray-600 text-sm">
                  <TrendingUp size={16} className="text-blue-600" /> Performance
                </span>
                <span className="font-semibold">{team.performance}%</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-gray-600 text-sm">
                  <Clock size={16} className="text-orange-600" /> Avg Time
                </span>
                <span className="font-semibold">{team.avgTime}</span>
              </div>
            </div>

            <div className="mt-4">
              <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                <div className="h-full bg-purple-600" style={{ width: `${team.performance}%` }} />
              </div>
            </div>

            <button className="mt-4 w-full py-2 bg-gray-100 rounded-xl text-sm hover:bg-gray-200 transition">
              View Team Details
            </button>
          </div>
        ))}
      </div>

      {/* EMPLOYEE PERFORMANCE TABLE (individuals) */}
      <div className="bg-white p-6 rounded-2xl shadow-xl">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
          <Activity size={20} className="text-purple-600" /> Employee Performance Breakdown
        </h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left text-gray-700">
              <th className="p-3 rounded-l-lg">Employee</th>
              <th className="p-3">Role</th>
              <th className="p-3">Tasks Completed</th>
              <th className="p-3">Hours Worked</th>
              <th className="p-3">Performance</th>
              <th className="p-3 rounded-r-lg">Status</th>
            </tr>
          </thead>

          <tbody>
            {teamData.map((emp) => (
              <tr key={emp.id} className="border-b hover:bg-gray-100 transition-all">
                <td className="p-3 font-medium text-gray-800">{emp.name}</td>
                <td className="p-3 text-gray-600">{emp.role}</td>
                <td className="p-3 text-gray-600">{emp.tasksCompleted}</td>
                <td className="p-3 text-gray-600 flex items-center gap-1"><Clock size={14} /> {emp.hoursWorked} hrs</td>
                <td className="p-3 font-semibold text-purple-600">{emp.performance}%</td>
                <td className="p-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${
                    emp.status === "Excellent" ? "bg-green-600" : emp.status === "Good" ? "bg-blue-600" : "bg-yellow-600"
                  }`}>
                    {emp.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
