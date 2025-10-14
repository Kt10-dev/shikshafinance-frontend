// src/components/Footer.js

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Link ka istemaal karenge

function Footer() {
  return (
    <motion.footer
      className="bg-gray-800 text-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">ShikshaFinance</h3>
            <p className="text-gray-400">
              Empowering students to achieve their dreams by providing
              accessible financial solutions.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul>
              {/* BADLAAV YAHAN HAI: <a> ki jagah <Link> aur 'to' attribute */}
              <li className="mb-2">
                <Link to="/" className="hover:text-indigo-400">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="hover:text-indigo-400">
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="hover:text-indigo-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul>
              {/* BADLAAV YAHAN HAI: <a> ki jagah <Link> aur 'to' attribute */}
              <li className="mb-2">
                <Link to="/privacy-policy" className="hover:text-indigo-400">
                  Privacy Policy
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/cancellations-and-refunds"
                  className="hover:text-indigo-400"
                >
                  Refund Policy
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/terms-and-conditions"
                  className="hover:text-indigo-400"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                FB
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                TW
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                IN
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} ShikshaFinance. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;
