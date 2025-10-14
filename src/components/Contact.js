// src/components/Contact.js

import React from "react";
import { motion } from "framer-motion"; // Import motion

function Contact() {
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="bg-gray-50 py-16 md:py-24" id="contact">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Need Help? Get In Touch!
          </h2>
          <p className="mt-2 text-gray-600">
            We are here to help you. Reach out to us for any queries.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            variants={itemVariants}
            className="bg-white p-8 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Our Office
            </h3>
            <p className="text-gray-600">
              123 Learning Street, Education City, New Delhi, India 110001
            </p>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="bg-white p-8 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Email Us
            </h3>
            <p className="text-indigo-600 hover:text-indigo-800 cursor-pointer">
              support@shikshafinance.in
            </p>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="bg-white p-8 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Call Us
            </h3>
            <p className="text-gray-600">+91 98765 43210</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Contact;
