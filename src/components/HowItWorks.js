import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  FaUserPlus,
  FaWpforms,
  FaShieldAlt,
  FaCreditCard,
  FaUniversity,
} from "react-icons/fa";

function HowItWorks() {
  const steps = [
    {
      icon: <FaUserPlus className="w-8 h-8 text-white" />,
      title: "Create Your Account & Complete KYC",
      description:
        "Start by creating a secure account on our platform. Then, complete a quick KYC process by uploading your documents to verify your profile.",
    },
    {
      icon: <FaWpforms className="w-8 h-8 text-white" />,
      title: "Fill Out the Common Application Form",
      description:
        "Fill out our single, detailed application form with your personal, academic, and financial information. This one form will be used to apply to multiple lending partners.",
    },
    {
      icon: <FaCreditCard className="w-8 h-8 text-white" />,
      title: "Pay the Platform Fee",
      description:
        "Pay a small, one-time platform fee. This allows us to process your application, manage your documents securely, and forward your profile to our network of financial institutions.",
    },
    {
      icon: <FaUniversity className="w-8 h-8 text-white" />,
      title: "Application Review by Lending Partners",
      description:
        "Once your fee is paid, your application is sent to our partner NBFCs and Banks. They will review your profile and make a decision based on their credit policies.",
    },
    {
      icon: <FaRupeeSign className="w-8 h-8 text-white" />,
      title: "Receive Offers & Get Funds Disbursed",
      description:
        "If your application is approved by a lending partner, you will receive a loan offer directly from them. Upon your acceptance, the funds are disbursed to the designated account.",
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-6 py-24 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4 text-center">
          Our Simple 5-Step Application Process
        </h1>
        <p className="text-lg text-gray-600 mb-12 text-center">
          We've made everything easy and transparent for you to connect with the
          best lenders.
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
      <Footer />
    </div>
  );
}

export default HowItWorks;
