import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AboutUs() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-6 py-24 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4 text-center">
          About ShikshaFinance
        </h1>
        <div className="space-y-4 text-lg text-gray-700 text-center">
          <p>
            Our mission is to empower students by simplifying the process of
            securing education loans.
          </p>
          <p className="font-semibold text-indigo-600">
            ShikshaFinance is a technology platform, not a direct lender. We
            connect aspiring students with our partner NBFCs and financial
            institutions to help them find the best possible loan options for
            their educational needs.
          </p>
          <p>
            We handle the application process, help with document submission,
            and provide support at every step, making education finance easy and
            accessible for everyone.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default AboutUs;
