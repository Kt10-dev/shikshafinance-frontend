// src/components/Navbar.js

import React from "react";
import { motion } from "framer-motion";

function Navbar() {
  return (
    <motion.nav
      className="bg-white shadow-md sticky top-0 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <motion.a
              href="/"
              className="text-2xl font-bold text-indigo-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ShikshaFinance
            </motion.a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {/* Sabhi links ab motion components hain */}
              <motion.a
                href="/how-it-works"
                className="text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "#eef2ff",
                  color: "#4338ca",
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                How it Works
              </motion.a>
              <motion.a
                href="#loan-types"
                className="text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "#eef2ff",
                  color: "#4338ca",
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                Loan Types
              </motion.a>
              <motion.a
                href="#faq"
                className="text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "#eef2ff",
                  color: "#4338ca",
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                FAQs
              </motion.a>
              <motion.a
                href="#contact"
                className="text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "#eef2ff",
                  color: "#4338ca",
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                Contact Us
              </motion.a>
            </div>
          </div>
          <div className="hidden md:block">
            <motion.a
              href="/login"
              className="ml-4 bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium"
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 0px 8px rgb(99, 102, 241)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Login
            </motion.a>
          </div>
          <div className="md:hidden flex items-center">
            <button className="bg-indigo-600 text-white inline-flex items-center justify-center p-2 rounded-md">
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
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
      </div>
    </motion.nav>
  );
}

export default Navbar;
