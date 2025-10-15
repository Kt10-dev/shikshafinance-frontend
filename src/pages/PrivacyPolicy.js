import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function PrivacyPolicy() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-6 py-24 max-w-4xl">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Privacy Policy for ShikshaFinance
        </h1>
        <p className="text-sm text-gray-500 mb-8 text-center">
          Last Updated: October 15, 2025
        </p>

        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold mb-2">1. Our Role</h2>
            <p>
              ShikshaFinance ("we", "us", "our") is a technology platform that
              connects student loan applicants ("you") with our network of
              partner banks and Non-Banking Financial Companies (NBFCs)
              ("Lending Partners"). This Privacy Policy explains how we collect,
              use, and protect your information when you use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">
              2. Information We Collect
            </h2>
            <p>
              To process your application and provide our services, we collect
              the following types of information:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>
                <strong>Personal Identification Information:</strong> Your name,
                email address, phone number, date of birth, gender, address,
                Aadhaar number, and PAN number.
              </li>
              <li>
                <strong>Family & Co-Applicant Information:</strong> Details
                about your parents and any co-applicants, including their names,
                contact information, and income details.
              </li>
              <li>
                <strong>Academic Information:</strong> Your course name, college
                name, course duration, and academic performance records.
              </li>
              <li>
                <strong>Financial Information:</strong> Details about your
                family's annual income and the loan amount you require.
              </li>
              <li>
                <strong>KYC Documents:</strong> Digital copies of your
                identification documents (Aadhaar, PAN) that you upload for
                verification.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">
              3. How We Use Your Information
            </h2>
            <p>Your information is used to:</p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>Create and manage your account on our platform.</li>
              <li>Facilitate the KYC verification process.</li>
              <li>
                Prepare and submit your application package to our Lending
                Partners for their review and approval.
              </li>
              <li>
                Communicate with you regarding your application status, EMI
                payments, and other updates.
              </li>
              <li>
                Process payments for platform fees and EMIs through our payment
                gateway partners.
              </li>
              <li>
                Comply with all applicable legal and regulatory requirements.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">
              4. Data Sharing and Disclosure
            </h2>
            <p>
              We are committed to protecting your privacy. We only share your
              information with third parties in the following ways:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>
                <strong>With Lending Partners:</strong> We share your completed
                application, including personal and financial data, with our
                partner NBFCs and banks for the sole purpose of evaluating your
                loan eligibility.
              </li>
              <li>
                <strong>With Service Providers:</strong> We may share
                information with trusted third-party service providers who
                assist us in operating our platform, such as payment gateways
                (e.g., Razorpay) and cloud storage providers (e.g., Cloudinary).
                These providers are contractually obligated to protect your
                data.
              </li>
              <li>
                <strong>For Legal Compliance:</strong> We may disclose your
                information if required by law or in response to valid requests
                by public authorities.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">5. Data Security</h2>
            <p>
              We implement robust security measures to protect your data. All
              data is transmitted over secure, encrypted channels (SSL). Your
              uploaded documents are stored in a secure cloud environment with
              strict access controls to prevent unauthorized access.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">6. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at{" "}
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
      <Footer />
    </div>
  );
}

export default PrivacyPolicy;
