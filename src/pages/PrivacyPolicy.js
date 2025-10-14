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
          Last Updated: October 13, 2025
        </p>

        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-2xl font-semibold mb-2">
              1. Information We Collect
            </h2>
            <p>
              We collect information to provide better services to all our
              users. We may collect the following types of information:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2">
              <li>
                <strong>Personal Information:</strong> Your name, email address,
                phone number, date of birth, and PAN/Aadhaar number when you
                register or apply for a loan.
              </li>
              <li>
                <strong>Financial Information:</strong> Bank account details,
                income details, and other financial information required for
                loan processing.
              </li>
              <li>
                <strong>Documents:</strong> Scanned copies of your
                identification, academic records, and other documents you
                upload.
              </li>
              <li>
                <strong>Usage Data:</strong> Information about how you access
                and use our website, including your IP address and browser type.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">
              2. How We Use Your Information
            </h2>
            <p>We use the information we collect for the following purposes:</p>
            <ul className="list-disc list-inside ml-4 mt-2">
              <li>To process and evaluate your loan application.</li>
              <li>To verify your identity (eKYC).</li>
              <li>
                To communicate with you regarding your application status and
                repayments.
              </li>
              <li>To improve and personalize our services.</li>
              <li>To comply with legal and regulatory requirements.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">
              3. Data Sharing and Disclosure
            </h2>
            <p>
              We do not share your personal information with companies,
              organizations, or individuals outside of ShikshaFinance except in
              the following cases:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2">
              <li>
                <strong>With Lending Partners:</strong> We share your
                application data with our registered NBFCs and lending partners
                for the purpose of loan approval and disbursal.
              </li>
              <li>
                <strong>For Legal Reasons:</strong> We will share personal
                information if we have a good-faith belief that access, use, or
                disclosure of the information is necessary to meet any
                applicable law or legal process.
              </li>
              <li>
                <strong>With Your Consent:</strong> We will share personal
                information with others when we have your explicit consent to do
                so.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">4. Data Security</h2>
            <p>
              We work hard to protect your data from unauthorized access. We use
              encryption (such as SSL) to keep your data safe during
              transmission. Your documents are stored in a secure cloud
              environment with restricted access.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">5. Your Rights</h2>
            <p>
              You have the right to access and update your personal information
              through your user dashboard. If you wish to delete your account,
              please contact our support team.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">
              6. Changes to This Policy
            </h2>
            <p>
              We may change our Privacy Policy from time to time. We will post
              any privacy policy changes on this page and, if the changes are
              significant, we will provide a more prominent notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">7. Contact Us</h2>
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
