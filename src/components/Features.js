import React from "react";
import { motion } from "framer-motion";
import {
  FaRocket,
  FaBalanceScale,
  FaFileUpload,
  FaTasks,
} from "react-icons/fa";

function Features() {
  // BADLAAV YAHAN HAI: Naye icons aur compliant text
  const featureList = [
    {
      icon: <FaRocket className="h-10 w-10 text-white" />,
      title: "Simplified Application",
      description:
        "Our smart, single application form saves you time and effort by applying to multiple lending partners at once.",
    },
    {
      icon: <FaBalanceScale className="h-10 w-10 text-white" />,
      title: "Compare Multiple Offers",
      description:
        "Get access to loan offers from our network of partner NBFCs and banks, helping you choose the best rates and terms.",
    },
    {
      icon: <FaFileUpload className="h-10 w-10 text-white" />,
      title: "Digital Document Upload",
      description:
        "No more physical paperwork. Securely upload all your required documents directly through our encrypted portal.",
    },
    {
      icon: <FaTasks className="h-10 w-10 text-white" />,
      title: "End-to-End Tracking",
      description:
        "Track every step of your application process, from submission to disbursal, right from your personal dashboard.",
    },
  ];

  // Animation variants (No changes here)
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Why Choose <span className="text-indigo-600">ShikshaFinance</span>?
          </h2>
          <p className="mt-2 text-gray-600">
            A modern platform designed to make your education finance journey
            smooth and transparent.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featureList.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 p-6 rounded-lg"
              variants={itemVariants}
            >
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-500 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Features;
