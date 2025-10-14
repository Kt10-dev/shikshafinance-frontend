// src/pages/Home.js

import React from "react";
// Corrected Paths: ../components/
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Features from "../components/Features";

import EMICalculator from "../components/EMICalculator"; // NAYI LINE
import Contact from "../components/Contact";
import Footer from "../components/Footer";

function Home() {
  return (
    // <> fragment yahaan zaroori hai
    <>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <EMICalculator /> {/* NAYI LINE */}
      <Contact />
      <Footer />
    </>
  );
}

export default Home; // Yeh line bhi zaroori hai
