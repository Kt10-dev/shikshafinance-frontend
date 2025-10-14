import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function TermsAndConditions() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-6 py-24 max-w-4xl">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Terms and Conditions
        </h1>
        <p className="text-sm text-gray-500 mb-8 text-center">
          Last Updated: October 13, 2025
        </p>

        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
            <p>
              Welcome to ShikshaFinance. These terms and conditions outline the
              rules and regulations for the use of our website and services. By
              accessing this website, you accept these terms and conditions in
              full. Do not continue to use ShikshaFinance's website if you do
              not accept all of the terms and conditions stated on this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">2. Eligibility</h2>
            <p>
              To be eligible to apply for a loan through our platform, you must
              be at least 18 years of age, a resident of India, and meet the
              specific eligibility criteria for the loan product you are
              applying for.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">
              3. User Accounts and Registration
            </h2>
            <p>
              You are responsible for maintaining the confidentiality of your
              account password and for all activities that occur under your
              account. You agree to provide accurate, current, and complete
              information during the registration process.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">
              4. Loan Application Process
            </h2>
            <p>
              Submitting a loan application does not guarantee approval. All
              applications are subject to review and verification. Providing
              false information will result in immediate rejection of your
              application and may lead to legal action.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">
              5. Fees and Payments
            </h2>
            <p>
              A non-refundable registration fee of <strong>₹199</strong> is
              required to process your loan application. This fee covers initial
              administrative and verification costs. If your loan is approved,
              you are obligated to repay the Equated Monthly Installments (EMIs)
              as per your loan agreement. Failure to pay an EMI by the due date
              will result in a late fee.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">
              6. Limitation of Liability
            </h2>
            <p>
              ShikshaFinance is a platform connecting students with financial
              services. We are not a bank. We shall not be held liable for any
              losses or damages in connection with the use of our website. The
              final loan terms and approval are at the sole discretion of our
              lending partners.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">
              7. Governing Law & Jurisdiction
            </h2>
            <p>
              These terms will be governed by and construed in accordance with
              the laws of India. Any disputes will be subject to the
              jurisdiction of the courts located in Indore, Madhya Pradesh.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">8. Changes to Terms</h2>
            <p>
              We reserve the right to revise these terms and conditions at any
              time. By using this website, you are expected to review these
              terms on a regular basis.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default TermsAndConditions;
