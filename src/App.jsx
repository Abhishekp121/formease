import React from 'react';

import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import OtpVerify from './pages/Auth/Otp-Verify';
import ForgotPassword from './pages/Auth/ForgotPassword';

import FormDetails from './pages/Forms/FormDetails';
import BookingForm from './pages/Booking/BookingForm';
import Payment from './pages/Booking/Payment';
import Footer from './components/Footer';
import FlightSearchUI from './pages/Auth/FlightSearchUI';
import TotalRequestsCard from './pages/adminDashbord/TotalRequestsCard';
import AllUsers from './pages/adminDashbord/AllUsers';
import AdminHome from './pages/adminDashbord/AdminHome';
import AdminDashboard from './pages/AdminDashbord/AdminDashboard';
import SubAdminPage from './pages/adminDashbord/SubAdminPage';
import Employees from './pages/adminDashbord/Employees';
import BillingPage from './pages/adminDashbord/BillingPage';
import TeamPerformance from './pages/adminDashbord/TeamPerformance';
import Revenue from './pages/adminDashbord/Revenue';
import FormCategories from './pages/adminDashbord/FormCategories';
import FormMaster from './pages/adminDashbord/FormMaster';
import SubadminDashboard from './pages/subadmnDashbord/subadminDashbord';
import SubAdminHome from './pages/subadmnDashbord/SubAdminHome';
import CreateTeam from './pages/subadmnDashbord/CreateTeam';
export default function App() {


  return (
    <>
    {/* <BrowserRouter> */}
      <Routes>

        {/* Parent Route */}
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />

          {/* Nested routes (⚠️ HERE: remove / from child paths) */}
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="/otp-verify" element={<OtpVerify />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/form/:id" element={<FormDetails />} />
          <Route path="/booking/:id" element={<BookingForm />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/flights" element={<FlightSearchUI />} />
           
           
        </Route>


        <Route path="/adminDashboard" element={<AdminDashboard />}>
          <Route index element={<AdminHome />} />
          <Route path="users" element={<AllUsers />} />
           <Route path="Form-Request" element={<TotalRequestsCard/>} />
            <Route path="Sub-admin" element={<SubAdminPage/>} />
            <Route path="Employee" element={<Employees/>} />
            <Route path="Billing" element={<BillingPage/>} />
            <Route path="TeamPerformance" element={<TeamPerformance/>} />
            <Route path="Revenue" element={<Revenue/>} />
            <Route path="FormCategories" element={<FormCategories/>} />
             <Route path="FormMaster" element={<FormMaster/>} />
        </Route>




        <Route path="/subadminDashbord" element={<SubadminDashboard/>}>
          <Route index element={<SubAdminHome />} />
           <Route path="CreateTeam" element={<CreateTeam/>} />
         
        </Route>
   

      </Routes>
{/* /BrowserRouter> */}
      

      {/* <Footer /> */}
    </>
  );
}
