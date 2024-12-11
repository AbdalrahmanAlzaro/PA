import React from "react";
import { NavLink } from "react-router-dom";

const getCurrentYear = () => {
  return new Date().getFullYear();
};

const Footer = () => {
  return (
    <section className="bg-white">
      <div className="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
        <p className="mt-8 text-base leading-6 text-center text-gray-900">
          © {getCurrentYear()} RateMate, All rights reserved.
        </p>
      </div>
    </section>
  );
};

export default Footer;
