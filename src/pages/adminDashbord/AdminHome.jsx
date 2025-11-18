import { useState } from "react";
import {
  Users,
  FileText,
  CheckCircle,
  Clock,
  UserPlus,
  Briefcase,
} from "lucide-react";

export default function AdminHome() {
  const [stats] = useState({
    totalUsers: 1820,
    totalRequests: 540,
    completeRequests: 420,
    pendingRequests: 120,
    todayRequests: 28,
  });

  const [recentUsers] = useState([
    { name: "Rohit Sharma", date: "2025-01-15", email: "rohit@example.com" },
    { name: "Priya Rathod", date: "2025-01-14", email: "priya@example.com" },
    { name: "Aman Gupta", date: "2025-01-14", email: "aman@example.com" },
  ]);

  const [recentEmployees] = useState([
    { name: "Kunal Singh", joined: "2025-01-10", role: "Sales Executive" },
    { name: "Meena Verma", joined: "2025-01-09", role: "HR Assistant" },
  ]);

  const [activeEmployeesToday] = useState([
    { name: "Ravi Mehta", role: "Support" },
    { name: "Kiran Patel", role: "Field Agent" },
    { name: "Sanya Kapoor", role: "CRM Manager" },
  ]);

  return (
    <div className="p-6 space-y-10">

    
      {/* -------- STAT CARDS -------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        <StatCard title="Total Users" value={stats.totalUsers} icon={Users} color="violet" />
        <StatCard title="Total Requests" value={stats.totalRequests} icon={FileText} color="blue" />
        <StatCard title="Completed" value={stats.completeRequests} icon={CheckCircle} color="green" />
        <StatCard title="Pending" value={stats.pendingRequests} icon={Clock} color="yellow" />
        <StatCard title="Today's Requests" value={stats.todayRequests} icon={UserPlus} color="pink" />
      </div>

      {/* -------- RECENT USERS + EMPLOYEES -------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* RECENT USERS */}
        <CardBox title="Recent User Accounts Created">
          {recentUsers.map((user, i) => (
            <ColoredItem key={i} color="violet">
              <p className="text-lg font-semibold">{user.name}</p>
              <p className="text-sm opacity-80">{user.email}</p>
              <p className="text-xs opacity-60 mt-1">Created on {user.date}</p>
            </ColoredItem>
          ))}
        </CardBox>

        {/* RECENT EMPLOYEES */}
        <CardBox title="Recent Employees Joined">
          {recentEmployees.map((emp, i) => (
            <ColoredItem key={i} color="blue">
              <p className="text-lg font-semibold">{emp.name}</p>
              <p className="text-sm opacity-80">{emp.role}</p>
              <p className="text-xs opacity-60 mt-1">Joined on {emp.joined}</p>
            </ColoredItem>
          ))}
        </CardBox>

      </div>

      {/* ACTIVE EMPLOYEES TODAY */}
      <CardBox title="Employees Active Today">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {activeEmployeesToday.map((emp, i) => (
            <div
              key={i}
              className="p-4 flex items-center gap-3 rounded-xl bg-gradient-to-r from-emerald-50 to-green-100 border border-emerald-300 shadow hover:shadow-lg hover:-translate-y-1 transition"
            >
              <Briefcase className="text-green-700" />
              <div>
                <p className="font-semibold text-gray-900">{emp.name}</p>
                <p className="text-sm opacity-70">{emp.role}</p>
              </div>
            </div>
          ))}
        </div>
      </CardBox>

    </div>
  );
}

/* --------------------------------------------------------
        BEAUTIFUL MULTI-COLOR STAT CARD (GRADIENT)
--------------------------------------------------------- */

function StatCard({ title, value, icon: Icon, color }) {
  const gradient = {
    violet: "from-violet-500 to-purple-600",
    blue: "from-blue-500 to-indigo-600",
    green: "from-green-500 to-emerald-600",
    yellow: "from-amber-400 to-yellow-500",
    pink: "from-pink-500 to-rose-600",
  };

  return (
    <div
      className={`p-5 rounded-xl shadow-xl bg-gradient-to-br ${gradient[color]} text-white 
      hover:shadow-2xl hover:-translate-y-1 transition`}
    >
      <div className="flex items-center gap-4">
        <div className="p-3 bg-white/20 backdrop-blur-md rounded-full shadow">
          <Icon size={28} />
        </div>
        <div>
          <p className="text-sm opacity-90">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------
             BEAUTIFUL SECTION BOX (WITH SHADOW)
--------------------------------------------------------- */

function CardBox({ title, children }) {
  return (
    <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

/* --------------------------------------------------------
            COLORED ITEM (FOR LISTS INSIDE BOX)
--------------------------------------------------------- */

function ColoredItem({ children, color }) {
  const bg = {
    violet: "from-violet-50 to-purple-100 border-violet-300",
    blue: "from-blue-50 to-indigo-100 border-blue-300",
    green: "from-green-50 to-emerald-100 border-green-300",
    pink: "from-pink-50 to-rose-100 border-pink-300",
  };

  return (
    <div
      className={`p-4 rounded-xl bg-gradient-to-r ${bg[color]} border shadow hover:shadow-md hover:-translate-y-1 transition`}
    >
      {children}
    </div>
  );
}
