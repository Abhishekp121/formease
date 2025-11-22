import React, { useState } from "react";
import { BarChart3, TrendingUp, Wallet, Calendar, ArrowUpRight } from "lucide-react";

export default function Revenue() {
  const [revenueData] = useState([
    { id: 1, month: "January", revenue: 42000 },
    { id: 2, month: "February", revenue: 51000 },
    { id: 3, month: "March", revenue: 47000 },
    { id: 4, month: "April", revenue: 62000 },
  ]);

  const totalRevenue = revenueData.reduce((acc, item) => acc + item.revenue, 0);
  const highestMonth = revenueData.reduce((max, item) => (item.revenue > max.revenue ? item : max), revenueData[0]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Revenue Overview</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Revenue</p>
              <h2 className="text-3xl font-bold mt-2">₹{totalRevenue.toLocaleString()}</h2>
            </div>
            <Wallet className="text-purple-600" size={36} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Best Performing Month</p>
              <h2 className="text-xl font-bold mt-2">{highestMonth.month}</h2>
            </div>
            <TrendingUp className="text-green-600" size={36} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Last Updated</p>
              <h2 className="text-xl font-bold mt-2">Today</h2>
            </div>
            <Calendar className="text-blue-600" size={36} />
          </div>
        </div>
      </div>

      {/* Revenue Table */}
      <div className="bg-white rounded-2xl shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <BarChart3 /> Monthly Revenue
        </h2>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-3">Month</th>
              <th className="p-3">Revenue</th>
              <th className="p-3">Trend</th>
            </tr>
          </thead>
          <tbody>
            {revenueData.map((row) => (
              <tr key={row.id} className="border-b hover:bg-gray-50 transition">
                <td className="p-3">{row.month}</td>
                <td className="p-3 font-semibold">₹{row.revenue.toLocaleString()}</td>
                <td className="p-3 text-green-600 flex items-center gap-1">
                  <ArrowUpRight size={18} /> Growing
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Best Month Card */}
      <div className="bg-purple-600 text-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-2">Peak Performance</h2>
        <p className="text-lg">Your highest revenue month:</p>
        <p className="text-3xl font-bold mt-2">{highestMonth.month}</p>
        <p className="text-xl mt-1">₹{highestMonth.revenue.toLocaleString()}</p>
      </div>
    </div>
  );
}
