import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";

function ContactUs() {
  // Abhi ke liye yeh form sirf alert dikhayega
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your message. We will get back to you soon!");
    e.target.reset();
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-6 py-24 max-w-5xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="text-lg text-gray-600 mb-12">
            We'd love to hear from you. Please fill out the form below or
            contact us directly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-lg shadow-md">
          {/* Left Side: Contact Info */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Contact Information
              </h2>
              <p className="text-gray-600">
                You can reach out to us through the following channels. We are
                available from Monday to Friday, 10 AM to 6 PM.
              </p>
            </div>
            <div className="flex items-start space-x-4">
              <FaMapMarkerAlt className="text-indigo-600 w-6 h-6 mt-1" />
              <div>
                <h3 className="font-semibold">Our Address</h3>
                <p className="text-gray-600">Indore, Madhya Pradesh, India</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <FaEnvelope className="text-indigo-600 w-6 h-6 mt-1" />
              <div>
                <h3 className="font-semibold">Email</h3>
                {/* BADLAAV YAHAN HAI */}
                <p className="text-gray-600">kt103263gmail.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <FaPhone className="text-indigo-600 w-6 h-6 mt-1" />
              <div>
                <h3 className="font-semibold">Phone</h3>
                {/* BADLAAV YAHAN HAI */}
                <p className="text-gray-600">+91 9694200417</p>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="mt-1 block w-full p-3 border rounded-md"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="mt-1 block w-full p-3 border rounded-md"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  required
                  className="mt-1 block w-full p-3 border rounded-md"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ContactUs;
