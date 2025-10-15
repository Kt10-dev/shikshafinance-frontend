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
          Last Updated: October 15, 2025
        </p>

        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold mb-2">
              1. Acceptance of Terms
            </h2>
            <p>
              Welcome to ShikshaFinance. We provide a technology platform that
              connects student loan applicants with our network of partner
              financial institutions. By using our website and services, you
              agree to comply with and be bound by the following terms and
              conditions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">
              2. Description of Service
            </h2>
            <p>
              ShikshaFinance is not a lender, bank, or NBFC. Our service
              consists of providing a platform to help you prepare, submit, and
              track your loan application, which is then forwarded to our
              third-party lending partners for their evaluation and approval.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">
              3. User Accounts and Eligibility
            </h2>
            <p>
              You must be at least 18 years old and a resident of India to use
              our services. You are responsible for maintaining the
              confidentiality of your account and for providing accurate and
              complete information during registration and application.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">
              4. Application Process
            </h2>
            <p>
              Submitting an application through our platform does not guarantee
              loan approval. The final decision to approve or reject an
              application, as well as the loan terms (amount, interest rate,
              tenure), rests solely with our lending partners.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">
              5. Platform & Processing Fees
            </h2>
            <p>
              To use our platform's services for application submission,
              document management, and processing, a non-refundable **Platform
              Processing Fee of ₹199** is required. This fee is for the services
              provided by ShikshaFinance and is not a loan processing fee
              charged by the lender. Failure to pay an approved loan's EMI on
              time will result in late fees as per the terms of the respective
              lending partner.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">
              6. Limitation of Liability
            </h2>
            <p>
              ShikshaFinance shall not be held liable for the rejection of any
              loan application or for any terms and conditions set by our
              lending partners. Our liability is limited to the services
              provided on our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">
              7. Governing Law & Jurisdiction
            </h2>
            <p>
              These terms will be governed by the laws of India. Any disputes
              will be subject to the jurisdiction of the courts located in
              Indore, Madhya Pradesh.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default TermsAndConditions;
