// src/pages/ContactUs.js
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ContactUs() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-8 pt-24 text-center">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg">
          For any queries, please reach out to us at support@shikshafinance.in
        </p>
      </div>
      <Footer />
    </div>
  );
}
export default ContactUs;
