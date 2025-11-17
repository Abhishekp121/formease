import React from 'react';

import { Routes, Route } from 'react-router-dom';
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

export default function App() {


  return (
    <>
      <Routes>

        {/* Parent Route */}
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />

          {/* Nested routes (⚠️ HERE: remove / from child paths) */}
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="otp-verify" element={<OtpVerify />} />
          <Route path="forgot-password" element={<ForgotPassword />} />

          <Route path="form/:id" element={<FormDetails />} />
          <Route path="booking/:id" element={<BookingForm />} />
          <Route path="payment" element={<Payment />} />
           <Route path="/flights" element={<FlightSearchUI />} />
        </Route>

      </Routes>

      <Footer />
    </>
  );
}
