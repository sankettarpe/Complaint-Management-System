import React from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

const Contact = () => {
  return (
    <section
      id="contact"
      className="py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <span className="uppercase tracking-widest text-green-600 font-semibold">
            Contact Us
          </span>

          <h2 className="text-4xl font-bold mt-3">
            We'd Love to Hear From You
          </h2>

          <p className="text-gray-600 mt-5 max-w-3xl mx-auto leading-8">
            Have questions, suggestions, or feedback? Reach out to us using
            the information below or send us a message through the contact
            form.
          </p>

        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          <div className="space-y-6">

            <div className="flex gap-5 p-6 rounded-2xl shadow bg-gray-50">

              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-2xl">
                <FaEnvelope />
              </div>

              <div>
                <h3 className="font-bold text-lg">
                  Email
                </h3>

                <p className="text-gray-600">
                  support@campuscare.com
                </p>

              </div>

            </div>

            <div className="flex gap-5 p-6 rounded-2xl shadow bg-gray-50">

              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl">
                <FaPhoneAlt />
              </div>

              <div>
                <h3 className="font-bold text-lg">
                  Phone
                </h3>

                <p className="text-gray-600">
                  +91 98765 43210
                </p>

              </div>

            </div>

            <div className="flex gap-5 p-6 rounded-2xl shadow bg-gray-50">

              <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-2xl">
                <FaMapMarkerAlt />
              </div>

              <div>
                <h3 className="font-bold text-lg">
                  Address
                </h3>

                <p className="text-gray-600">
                  Government College of Engineering,
                  Amravati, Maharashtra, India
                </p>

              </div>

            </div>

            <div className="flex gap-5 p-6 rounded-2xl shadow bg-gray-50">

              <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-2xl">
                <FaClock />
              </div>

              <div>
                <h3 className="font-bold text-lg">
                  Working Hours
                </h3>

                <p className="text-gray-600">
                  Monday - Saturday
                </p>

                <p className="text-gray-600">
                  9:00 AM - 5:00 PM
                </p>

              </div>

            </div>

          </div>

          <div className="bg-gray-50 rounded-2xl shadow-lg p-8">

            <form className="space-y-5">

              <input
                type="text"
                placeholder="Full Name"
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
              />

              <textarea
                rows="5"
                placeholder="Your Message..."
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
              />

              <button
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
              >
                Send Message
              </button>

            </form>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;