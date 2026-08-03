import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaArrowUp,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

          <div>

            <h2 className="text-3xl font-bold text-white mb-4">
              CampusCare
            </h2>

            <p className="leading-7">
              A modern Complaint Management System that enables students,
              administrators, and maintenance staff to report, monitor,
              assign, and resolve campus issues efficiently.
            </p>

          </div>

          <div>

            <h3 className="text-white text-xl font-semibold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">

              <li><a href="#hero" className="hover:text-green-400">Home</a></li>
              <li><a href="#features" className="hover:text-green-400">Features</a></li>
              <li><a href="#about" className="hover:text-green-400">About</a></li>
              <li><a href="#contact" className="hover:text-green-400">Contact</a></li>

            </ul>

          </div>

          <div>

            <h3 className="text-white text-xl font-semibold mb-5">
              Account
            </h3>

            <ul className="space-y-3">

              <li>
                <Link to="/login" className="hover:text-green-400">
                  Login
                </Link>
              </li>

              <li>
                <Link to="/register" className="hover:text-green-400">
                  Register
                </Link>
              </li>

              <li>
                <Link to="/forgot-password" className="hover:text-green-400">
                  Forgot Password
                </Link>
              </li>

            </ul>

          </div>

          <div>

            <h3 className="text-white text-xl font-semibold mb-5">
              Follow Us
            </h3>

            <div className="flex gap-4">

              <button className="w-12 h-12 rounded-full bg-gray-800 hover:bg-green-600 flex items-center justify-center transition">
                <FaFacebook />
              </button>

              <button className="w-12 h-12 rounded-full bg-gray-800 hover:bg-green-600 flex items-center justify-center transition">
                <FaInstagram />
              </button>

              <button className="w-12 h-12 rounded-full bg-gray-800 hover:bg-green-600 flex items-center justify-center transition">
                <FaLinkedin />
              </button>

              <button className="w-12 h-12 rounded-full bg-gray-800 hover:bg-green-600 flex items-center justify-center transition">
                <FaGithub />
              </button>

            </div>

          </div>

        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">

          <p className="text-sm">
            © {new Date().getFullYear()} CampusCare. All Rights Reserved.
          </p>

          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="mt-5 md:mt-0 w-12 h-12 rounded-full bg-green-600 hover:bg-green-700 flex items-center justify-center transition"
          >
            <FaArrowUp className="text-white" />
          </button>

        </div>

      </div>

    </footer>
  );
};

export default Footer;