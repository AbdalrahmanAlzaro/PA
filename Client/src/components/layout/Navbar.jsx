import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser, FiLogOut } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";
import Login from "../../pages/Login";
import Signup from "../../pages/Signup";
import Logo from "../../assets/images/Logo.png";

import { ToastContainer } from "react-toastify";

import { useAuth } from "../../hooks/AuthContext";
import { useCart } from "../../hooks/CartContext";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();

  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isHomeServicesOpen, setIsHomeServicesOpen] = useState(false);
  const [isAutoServicesOpen, setIsAutoServicesOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");
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
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
    if (menuRef.current && !menuRef.current.contains(event.target)) {
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

  const handleMouseEnter = (setState) => {
    setState(true);
  };

  const handleMouseLeave = (setState) => {
    setState(false);
  };

  const handleMobileMenuClick = (menu) => {
    setActiveMenu(activeMenu === menu ? "" : menu);
  };

  const { cartItems, totalAmount } = useCart();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const cartRef = useRef(null);
  totalAmount;
  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
  };

  const handleClickOutside1 = (event) => {
    if (cartRef.current && !cartRef.current.contains(event.target)) {
      setIsCartVisible(false);
    }
  };

  useEffect(() => {
    if (isCartVisible) {
      document.addEventListener("mousedown", handleClickOutside1);
    } else {
      document.removeEventListener("mousedown", handleClickOutside1);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside1);
    };
  }, [isCartVisible]);

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
                  Shop
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
                  Our Story
                </NavLink>
              </li>

              <div className="flex items-center cursor-pointer text-gray-700 hover:text-gray-900">
                <NavLink
                  to="/category/list"
                  className={({ isActive }) =>
                    isActive
                      ? "text-gray-900 underline font-bold flex items-center"
                      : "text-gray-700 flex items-center"
                  }
                >
                  Category
                </NavLink>
              </div>
            </ul>
          </div>

          {isLoggedIn ? (
            <>
              <div className="flex items-center">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsg0F0hqjo2pVSEgusU_JvJ4WOxd-U1QWMnw&usqp=CAU"
                  alt="name"
                  className="mr-4 rounded-full"
                  style={{ width: "40px", height: "40px" }}
                />{" "}
                <FaChevronDown
                  className="cursor-pointer"
                  onClick={toggleDropdown}
                />
              </div>
              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute mt-28 right-0 w-48 bg-white rounded-md shadow-lg py-2"
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
                    <FiLogOut className="mr-2" />
                    <span>Logout</span>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="flex items-center hidden md:block">
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
          <div className="pr-4">
            <button
              className="text-gray-600 relative hover:text-red-500 transition-colors"
              onClick={toggleCart}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItems.length}
              </span>
            </button>
          </div>
          {isCartVisible && (
            <div
              ref={cartRef}
              className={`${
                isCartVisible
                  ? `opacity-100 scale-100 ${
                      cartItems.length === 0 ? "mt-64" : "mt-[27rem]"
                    }`
                  : "opacity-0 scale-90 "
              } transition-all duration-300 transform ease-in-out absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-xl p-4 z-50`}
            >
              <h3 className="text-lg font-semibold mb-3 border-b pb-2">
                Cart Summary
              </h3>
              <div className="overflow-y-auto max-h-60">
                {cartItems.length === 0 ? (
                  <p>Your cart is empty.</p>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between space-x-2 border-b pb-2"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                      <div className="flex flex-col flex-grow">
                        <span className="font-medium text-sm">{item.name}</span>
                        <span className="text-gray-500 text-xs">
                          Price: ${item.price}
                        </span>
                        <span className="text-gray-500 text-xs">
                          Qty: {item.quantity}
                        </span>
                        <span className="text-gray-500 text-xs">
                          Total: ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))
                )}
                <div className="flex justify-between border-t pt-2 font-bold text-lg">
                  <span>Total</span>
                  <span>${totalAmount}</span>
                </div>
              </div>
              <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors">
                View Cart
              </button>
            </div>
          )}
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
                        <div className="flex items-center">
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsg0F0hqjo2pVSEgusU_JvJ4WOxd-U1QWMnw&usqp=CAU"
                            alt="name"
                            className="mr-4 rounded-full"
                            style={{ width: "40px", height: "40px" }}
                          />{" "}
                          <FaChevronDown
                            className="cursor-pointer"
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
                              <FiLogOut className="mr-2" />{" "}
                              {/* Updated logout icon */}
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
