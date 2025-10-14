// src/pages/CancellationsAndRefunds.js

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function CancellationsAndRefunds() {
  return (
    <div>
      <div className="container mx-auto px-6 py-24 max-w-4xl">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Cancellations & Refunds Policy
        </h1>
        <p className="text-sm text-gray-500 mb-8 text-center">
          Last Updated: October 14, 2025
        </p>

        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold mb-2">Registration Fee</h2>
            <p>
              To begin your loan application process with ShikshaFinance, a
              one-time, non-refundable Registration Fee of <strong>₹199</strong>{" "}
              is required. This fee covers the initial administrative costs,
              document verification, and processing of your application.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Refund Policy</h2>
            <p>
              Please note that the{" "}
              <strong>Registration Fee is strictly non-refundable</strong> under
              any circumstances, including but not limited to:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2">
              <li>
                If you decide to cancel or withdraw your loan application.
              </li>
              <li>
                If your loan application is rejected during our review process.
              </li>
              <li>If you provide incorrect or incomplete information.</li>
            </ul>
            <p className="mt-2">
              By paying the registration fee, you acknowledge and agree to this
              no-refund policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
            <p>
              If you have any questions about our Cancellations and Refunds
              Policy, please contact us at{" "}
              <a
                href="mailto:support@shikshafinance.in"
                className="text-indigo-600 hover:underline"
              >
                support@shikshafinance.in
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default CancellationsAndRefunds;
