import React from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaClipboardCheck,
  FaUsers,
  FaShieldAlt,
} from "react-icons/fa";
// import heroImage from "../../assets/home/hero-illustration.svg";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="pt-32 pb-20 bg-linear-to-br from-green-50 via-white to-blue-50"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          <div>

            <span className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium mb-6">
              Smart Campus Complaint Management
            </span>

            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900">
              Report Campus Issues
              <span className="text-green-600"> Quickly </span>
              and Track Them in Real Time
            </h1>

            <p className="mt-6 text-lg text-gray-600 leading-8">
              CampusCare enables students, faculty, and staff to report
              maintenance and cleanliness issues with ease. Administrators can
              assign staff, monitor progress, and resolve complaints efficiently
              through a centralized dashboard.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">

              <Link
                to="/register"
                style={{ textDecoration: "none" }}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                Get Started
                <FaArrowRight />
              </Link>

              <Link
                to="/login"
                style={{ textDecoration: "none" }}
                className="px-6 py-3 rounded-xl border-2 border-green-600 text-green-600 hover:bg-green-50 font-semibold transition"
              >
                Login
              </Link>

            </div>

            <div className="grid sm:grid-cols-3 gap-4 mt-12">

              <div className="bg-white shadow rounded-xl p-5">
                <FaClipboardCheck className="text-green-600 text-3xl mb-3" />
                <h3 className="font-semibold">
                  Complaint Tracking
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  Track every complaint from submission to resolution.
                </p>
              </div>

              <div className="bg-white shadow rounded-xl p-5">
                <FaUsers className="text-blue-600 text-3xl mb-3" />
                <h3 className="font-semibold">
                  Staff Assignment
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  Assign complaints to the appropriate maintenance staff.
                </p>
              </div>

              <div className="bg-white shadow rounded-xl p-5">
                <FaShieldAlt className="text-purple-600 text-3xl mb-3" />
                <h3 className="font-semibold">
                  Secure Access
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  JWT-based authentication with role-based authorization.
                </p>
              </div>

            </div>

          </div>

          <div className="flex justify-center">

            <div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-md">

              <div className="aspect-square rounded-2xl bg-linear-to-br from-green-100 to-blue-100 flex items-center justify-center">

                {/* <img
                  src={heroImage}
                  alt="CampusCare"
                  className="w-full"
                /> */}

                <p className="text-center text-gray-500 font-medium">
                  Complaint Management Illustration
                </p>

              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">

                <div className="text-center bg-green-50 rounded-xl p-4">
                  <h2 className="text-3xl font-bold text-green-600">
                    95%
                  </h2>
                  <p className="text-sm text-gray-600">
                    Resolution Rate
                  </p>
                </div>

                <div className="text-center bg-blue-50 rounded-xl p-4">
                  <h2 className="text-3xl font-bold text-blue-600">
                    24/7
                  </h2>
                  <p className="text-sm text-gray-600">
                    Complaint Tracking
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default HeroSection;