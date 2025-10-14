import React from "react";

import {
  FaUserCheck,
  FaWpforms,
  FaSearch,
  FaSignature,
  FaRupeeSign,
} from "react-icons/fa";

function HowItWorks() {
  const steps = [
    {
      icon: <FaUserCheck className="w-8 h-8 text-white" />,
      title: "Register & Check Eligibility",
      description:
        "Create your account with a valid email. Fill in some basic details in our eligibility checker to see the loan options available for you.",
    },
    {
      icon: <FaWpforms className="w-8 h-8 text-white" />,
      title: "Complete Your Application",
      description:
        "Fill out our simple, multi-step application form with your personal, academic, and financial details. Upload the required documents securely through our portal.",
    },
    {
      icon: <FaSearch className="w-8 h-8 text-white" />,
      title: "Verification & Approval",
      description:
        "Our team will verify the information and documents you've provided. We may contact you for additional information. This process is quick and transparent.",
    },
    {
      icon: <FaSignature className="w-8 h-8 text-white" />,
      title: "Accept the Offer & e-Sign",
      description:
        "Once your application is approved, you will receive a loan offer detailing the amount, interest rate, and tenure. Accept the offer and digitally sign the loan agreement.",
    },
    {
      icon: <FaRupeeSign className="w-8 h-8 text-white" />,
      title: "Funds Disbursed & Repay",
      description:
        "After the agreement is signed, the loan amount is disbursed directly to the designated bank account. You can manage your loan and repay your EMIs through your personal dashboard.",
    },
  ];

  return (
    <div>
      <div className="container mx-auto px-6 py-24 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4 text-center">
          Our Simple 5-Step Loan Process
        </h1>
        <p className="text-lg text-gray-600 mb-12 text-center">
          From application to disbursal, we've made everything easy and
          transparent for you.
        </p>

        <div className="space-y-10">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-600">
                  {step.icon}
                </div>
              </div>
              <div className="ml-6">
                <h3 className="text-2xl font-semibold text-gray-900">
                  Step {index + 1}: {step.title}
                </h3>
                <p className="mt-2 text-gray-700">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
