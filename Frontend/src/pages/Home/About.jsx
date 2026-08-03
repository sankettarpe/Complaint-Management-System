import React from "react";
import {
  FaBullseye,
  FaEye,
  FaHandsHelping,
} from "react-icons/fa";

const About = () => {
  return (
    <section
      id="about"
      className="py-24 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <span className="uppercase tracking-widest text-green-600 font-semibold">
            About CampusCare
          </span>

          <h2 className="text-4xl font-bold mt-3">
            Building a Cleaner, Smarter and More Connected Campus
          </h2>

          <p className="mt-6 text-gray-600 leading-8 max-w-4xl mx-auto">
            CampusCare is a modern Complaint Management System designed to
            simplify the process of reporting, tracking, and resolving campus
            maintenance issues. It provides a single platform where students,
            faculty, administrators, and maintenance staff work together to
            improve campus facilities efficiently.
          </p>

        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">

            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-3xl mb-6">
              <FaBullseye />
            </div>

            <h3 className="text-2xl font-bold mb-4">
              Our Mission
            </h3>

            <p className="text-gray-600 leading-7">
              To provide an efficient, transparent, and user-friendly platform
              that enables quick complaint resolution while improving the
              overall campus experience for everyone.
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">

            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-3xl mb-6">
              <FaEye />
            </div>

            <h3 className="text-2xl font-bold mb-4">
              Our Vision
            </h3>

            <p className="text-gray-600 leading-7">
              To become a smart digital platform that transforms campus
              maintenance through technology, real-time monitoring, and
              data-driven decision making.
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition">

            <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-3xl mb-6">
              <FaHandsHelping />
            </div>

            <h3 className="text-2xl font-bold mb-4">
              Our Values
            </h3>

            <p className="text-gray-600 leading-7">
              We believe in accountability, transparency, collaboration,
              responsiveness, and continuous improvement to deliver a better
              experience for every campus community member.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
};

export default About;