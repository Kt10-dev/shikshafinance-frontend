// src/pages/AboutUs.js
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AboutUs() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-8 pt-24 text-center">
        <h1 className="text-4xl font-bold mb-4">About ShikshaFinance</h1>
        <p className="text-lg">
          Our mission is to empower students by providing easy and accessible
          financial solutions for their education.
        </p>
      </div>
      <Footer />
    </div>
  );
}
export default AboutUs;
