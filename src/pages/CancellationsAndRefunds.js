import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function CancellationsAndRefunds() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-6 py-24 max-w-4xl">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Cancellations & Refunds Policy
        </h1>
        <p className="text-sm text-gray-500 mb-8 text-center">
          Last Updated: October 15, 2025
        </p>

        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold mb-2">
              Application Processing Fee
            </h2>
            <p>
              To use the ShikshaFinance platform for applying to our network of
              lending partners, a one-time, non-refundable{" "}
              <strong>Application Processing Fee of ₹199</strong> is required.
              This fee covers the costs associated with platform access,
              document management, application tracking, and support from our
              team.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Refund Policy</h2>
            <p>
              Please note that the{" "}
              <strong>
                Application Processing Fee is strictly non-refundable
              </strong>{" "}
              under any circumstances, including but not limited to:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2">
              <li>
                If you decide to cancel or withdraw your application from our
                platform.
              </li>
              <li>
                If your loan application is rejected by our lending partners
                during their review process.
              </li>
              <li>
                If you provide incorrect or incomplete information or documents.
              </li>
            </ul>
            <p className="mt-2">
              By paying this fee, you acknowledge that you are paying for the
              services provided by the ShikshaFinance platform and agree to this
              no-refund policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
            <p>
              If you have any questions about our Cancellations and Refunds
              Policy, please contact us at{" "}
              <a
                href="kt103263@gmail.com"
                className="text-indigo-600 hover:underline"
              >
                support@shikshafinance.in
              </a>
              .
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CancellationsAndRefunds;
