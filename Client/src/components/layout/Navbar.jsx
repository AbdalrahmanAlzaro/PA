import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser, FiLogOut } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";
import Login from "../../pages/Login";
import Signup from "../../pages/Signup";
import Logo from "../../assets/Svg/Screenshot_from_2024-12-02_13-16-17-removebg-preview.svg";

import { ToastContainer } from "react-toastify";

import { useAuth } from "../../hooks/AuthContext";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleProfileClick = () => {
    setDropdownOpen(false);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      menuRef.current &&
      !menuRef.current.contains(event.target)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

  const openSignUp = () => setIsSignUpOpen(true);
  const closeSignUp = () => setIsSignUpOpen(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {" "}
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
      <nav className="bg-white px-10  z-50 sticky top-0">
        <div className="container mx-auto flex items-center justify-between">
          <NavLink to="/">
            <div className="flex items-center">
              <img src={Logo} alt="Logo" className="h-[100px] w-[100px]" />
            </div>
          </NavLink>
          <div className="hidden md:flex flex-grow text-center justify-center">
            <ul className="flex justify-center space-x-10">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "text-gray-900 underline font-bold"
                      : "text-gray-700 hover:text-gray-900"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/shop"
                  className={({ isActive }) =>
                    isActive
                      ? "text-gray-900 underline font-bold"
                      : "text-gray-700 hover:text-gray-900"
                  }
                >
                  Our Shop
                </NavLink>
              </li>{" "}
              <li>
                <NavLink
                  to="/adoption"
                  className={({ isActive }) =>
                    isActive
                      ? "text-gray-900 underline font-bold"
                      : "text-gray-700 hover:text-gray-900"
                  }
                >
                  Adoption
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive
                      ? "text-gray-900 underline font-bold"
                      : "text-gray-700 hover:text-gray-900"
                  }
                >
                  Our Vision
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive
                      ? "text-gray-900 underline font-bold"
                      : "text-gray-700 hover:text-gray-900"
                  }
                >
                  Get In Touch
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/treatment"
                  className={({ isActive }) =>
                    isActive
                      ? "text-gray-900 underline font-bold"
                      : "text-gray-700 hover:text-gray-900"
                  }
                >
                  Treatment
                </NavLink>
              </li>
            </ul>
          </div>

          {isLoggedIn ? (
            <>
              <div className="flex items-center" ref={menuRef}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsg0F0hqjo2pVSEgusU_JvJ4WOxd-U1QWMnw&usqp=CAU"
                  alt="name"
                  className="mr-4 rounded-full"
                  style={{ width: "40px", height: "40px" }}
                />{" "}
                <FaChevronDown
                  className={`cursor-pointer transform transition-transform duration-150 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                  onClick={toggleDropdown}
                />
              </div>
              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute mt-28 right-0 w-48 bg-white rounded-md shadow-lg py-2"
                >
                  <div
                    onClick={logout}
                    className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    <FiLogOut className="mr-2" />
                    <span>Logout</span>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="flex items-center  md:block">
                <button
                  onClick={openLogin}
                  className="bg-[#060640] hover:bg-[#060640] hover:opacity-80 text-white font-bold h-8 px-4 rounded-3xl mr-2"
                >
                  LogIn
                </button>
              </div>
              <Login
                isOpen={isLoginOpen}
                onClose={closeLogin}
                onSignUpOpen={openSignUp}
              />
              <Signup
                isOpen={isSignUpOpen}
                onClose={closeSignUp}
                onLoginOpen={openLogin}
              />
            </>
          )}
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-gray-900"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-70 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={toggleMobileMenu}
              />
              <motion.div
                className="fixed inset-y-0 right-0 w-72 bg-gradient-to-b from-white to-gray-100 shadow-lg z-50 flex flex-col overflow-y-auto max-h-screen"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.4 }}
              >
                <div className="p-6 flex justify-between items-center border-b border-gray-300">
                  <img src={Logo} alt="Logo" className="h-12 w-12" />
                  <button
                    onClick={toggleMobileMenu}
                    className="text-gray-800 hover:text-gray-900"
                  >
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <ul className="flex flex-col mt-4">
                  <li className="px-6 py-3">
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        isActive
                          ? "block text-gray-800 font-semibold border-l-4 border-[#060640] pl-4"
                          : "block text-gray-700 hover:text-gray-900  pl-4"
                      }
                      onClick={toggleMobileMenu}
                    >
                      Home
                    </NavLink>
                  </li>

                  <li className="px-6 py-3">
                    {isLoggedIn ? (
                      <>
                        <div className="flex items-center" ref={menuRef}>
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsg0F0hqjo2pVSEgusU_JvJ4WOxd-U1QWMnw&usqp=CAU"
                            alt="name"
                            className="mr-4 rounded-full"
                            style={{ width: "40px", height: "40px" }}
                          />{" "}
                          <FaChevronDown
                            className={`cursor-pointer transform transition-transform duration-150 ${
                              isDropdownOpen ? "rotate-180" : ""
                            }`}
                            onClick={toggleDropdown}
                          />
                        </div>
                        {isDropdownOpen && (
                          <div
                            ref={dropdownRef}
                            className="absolute mt-12 w-48 bg-white rounded-md shadow-lg py-2"
                          >
                            <Link to="/uprofile">
                              <div
                                className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                                onClick={handleProfileClick}
                              >
                                <FiUser className="mr-2" />
                                <span>Profile</span>
                              </div>
                            </Link>
                            <div
                              onClick={logout}
                              className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                            >
                              <FiLogOut className="mr-2" /> <span>Logout</span>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="flex items-center  md:block">
                          <button
                            onClick={openLogin}
                            className="bg-[#060640] hover:bg-[#060640] hover:opacity-80 text-white font-bold h-8 px-4 rounded-3xl mr-2"
                          >
                            LogIn
                          </button>
                        </div>
                        <Login
                          isOpen={isLoginOpen}
                          onClose={closeLogin}
                          onSignUpOpen={openSignUp}
                        />
                        <Signup
                          isOpen={isSignUpOpen}
                          onClose={closeSignUp}
                          onLoginOpen={openLogin}
                        />
                      </>
                    )}
                  </li>
                </ul>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
