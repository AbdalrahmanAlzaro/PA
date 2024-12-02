import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layout Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Pages
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import PricingPage from "./pages/pricing";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import VerifyEmailOTPPage from "./pages/VerifyEmailOTPPage";
import ForgotPassword from "./pages/ForgotPassword";

import { CartProvider } from "./hooks/CartContext";
import SetNewPassword from "./pages/SetNewPassword";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const location = useLocation();
  const hideNavbarFooter =
    location.pathname === "/Login" || location.pathname === "/signup";

  return (
    <div className="flex flex-col min-h-screen">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />{" "}
      <CartProvider>
        {!hideNavbarFooter && <Navbar />}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/Verify-email" element={<VerifyEmailPage />} />
            <Route path="/forget-password" element={<ForgotPassword />} />
            <Route path="/set-new-password" element={<SetNewPassword />} />
            <Route path="/verify-otp/:email" element={<VerifyEmailOTPPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signup" element={<Signup setUser={setUser} />} />
            <Route path="/Login" element={<Login setUser={setUser} />} />
            <Route path="/PricingPage" element={<PricingPage />} />
          </Routes>
        </main>
        {!hideNavbarFooter && <Footer />}
      </CartProvider>
    </div>
  );
};

export default App;
