// src/components/EMICalculator.js

import React, { useState, useEffect } from "react";
import { FaRupeeSign } from "react-icons/fa";

function EMICalculator() {
  const [principal, setPrincipal] = useState(50000);
  const [interest, setInterest] = useState(10); // Annual interest rate
  const [tenure, setTenure] = useState(12); // Tenure in months
  const [emi, setEmi] = useState(0);

  useEffect(() => {
    const calculateEmi = () => {
      const p = parseFloat(principal);
      const r = parseFloat(interest) / 12 / 100; // Monthly interest rate
      const n = parseFloat(tenure);

      if (p > 0 && r > 0 && n > 0) {
        const numerator = p * r * Math.pow(1 + r, n);
        const denominator = Math.pow(1 + r, n) - 1;
        const calculatedEmi = numerator / denominator;
        setEmi(calculatedEmi);
      } else {
        setEmi(0);
      }
    };

    calculateEmi();
  }, [principal, interest, tenure]);

  return (
    <div className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            EMI Calculator
          </h2>
          <p className="mt-2 text-gray-600">
            Plan your finances with our easy-to-use calculator.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-gray-50 p-8 rounded-lg shadow-lg">
          <div className="space-y-6">
            {/* Principal Amount Slider */}
            <div>
              <label className="flex justify-between items-center font-semibold text-gray-700">
                <span>Loan Amount</span>
                <span className="text-indigo-600 font-bold">
                  ₹ {parseInt(principal).toLocaleString("en-IN")}
                </span>
              </label>
              <input
                type="range"
                min="10000"
                max="1000000"
                step="10000"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
              />
            </div>

            {/* Interest Rate Slider */}
            <div>
              <label className="flex justify-between items-center font-semibold text-gray-700">
                <span>Interest Rate (% p.a.)</span>
                <span className="text-indigo-600 font-bold">{interest} %</span>
              </label>
              <input
                type="range"
                min="5"
                max="20"
                step="0.5"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
              />
            </div>

            {/* Tenure Slider */}
            <div>
              <label className="flex justify-between items-center font-semibold text-gray-700">
                <span>Loan Tenure (Months)</span>
                <span className="text-indigo-600 font-bold">
                  {tenure} months
                </span>
              </label>
              <input
                type="range"
                min="6"
                max="60"
                step="1"
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
              />
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-lg text-gray-600">Your Monthly EMI</p>
            <p className="text-4xl font-bold text-indigo-700 mt-2">
              <FaRupeeSign className="inline-block mb-2" />{" "}
              {emi > 0 ? emi.toFixed(2).toLocaleString("en-IN") : "0.00"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EMICalculator;
