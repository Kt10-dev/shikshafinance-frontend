import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // <a> ki jagah <Link> ka istemaal

function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7 } },
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left Side: Animated Text Content */}
          <motion.div
            className="md:w-1/2 lg:w-2/5 text-center md:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight"
            >
              Apne Sapno Ko De Udaan, <br />
              <span className="text-indigo-600">
                Ek Behtar Future Ke Saath.
              </span>
            </motion.h1>

            {/* BADLAAV YAHAN HAI */}
            <motion.p
              variants={itemVariants}
              className="mt-4 text-lg text-gray-600"
            >
              Bharat ka #1 platform jo students ko unke education ke liye best
              loan options se jodta hai. Aasan application process aur quick
              support.
            </motion.p>

            {/* BADLAAV YAHAN HAI */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex justify-center md:justify-start space-x-4"
            >
              <Link
                to="/register"
                className="bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-300"
              >
                Get Started
              </Link>
              <Link
                to="/how-it-works"
                className="bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition duration-300"
              >
                Know More
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Side: Animated Image */}
          <motion.div
            className="md:w-1/2 lg:w-3/5 mt-10 md:mt-0 md:ml-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="h-80 rounded-lg flex items-center justify-center">
              <img
                src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Happy students achieving their dreams"
                className="rounded-lg shadow-lg object-cover w-full h-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
