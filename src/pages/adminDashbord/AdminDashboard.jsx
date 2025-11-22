import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { Outlet } from "react-router-dom";


import { Home, Users, FileText, UserCog, UserCircle, BarChart } from "lucide-react";

const adminMenu = [
  { title: "Dashboard", icon: Home, route: "/adminDashboard" },
  { title: "Users", icon: Users, route: "/adminDashboard/users" },
  { title: "Form-Request", icon: FileText, route: "/adminDashboard/Form-Request" },
  { title: "Sub-admin", icon: UserCog, route: "/adminDashboard/Sub-admin" },
  { title: "Employee", icon: UserCircle, route: "/adminDashboard/Employee " },
  { title: "Billing", icon: BarChart, route: "/adminDashboard/Billing" },
  { title: "TeamPerformance", icon: BarChart, route: "/adminDashboard/TeamPerformance" },
  { title: "Revenue", icon: BarChart, route: "/adminDashboard/Revenue" },
  { title: "FormCategories", icon: BarChart, route: "/adminDashboard/FormCategories" },
  { title: "FormMaster", icon: BarChart, route: "/adminDashboard/FormMaster" },
];

export default function AdminDashboard() {
  return (
   
    
    <div className="flex min-h-screen bg-gray-100">
    

      {/* Sidebar */}
      <Sidebar roleMenus={adminMenu} />

      {/* Main Content */}
      <div
        className="
          flex-1 
          min-h-screen
          transition-all duration-300
          md:ml-72
          ml-0
        "
      >
        <Header username="Abhishek Patidar" />

        <div className="p-6">
           <Outlet />
        </div>

      </div>
    </div>
  );
}
