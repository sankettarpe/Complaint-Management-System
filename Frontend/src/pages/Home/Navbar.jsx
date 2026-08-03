import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiMenu,
  HiX,
  HiOutlineHome,
} from "react-icons/hi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    {
      title: "Home",
      href: "#hero",
    },
    {
      title: "Features",
      href: "#features",
    },
    {
      title: "How It Works",
      href: "#how-it-works",
    },
    {
      title: "About",
      href: "#about",
    },
    {
      title: "Contact",
      href: "#contact",
    },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex justify-between items-center h-20">

          <Link
            to="/"
            className="flex items-center gap-2"
          >
            <div className="bg-green-600 text-white rounded-full p-2">
              <HiOutlineHome className="text-xl" />
            </div>

            <div>
              <h1 className="font-bold text-xl">
                CampusCare
              </h1>

              <p className="text-xs text-gray-500">
                Complaint Management System
              </p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8">

            {navLinks.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="font-medium text-gray-700 hover:text-green-600 transition"
                style={{ textDecoration: "none" }}
              >
                {item.title}
              </a>
            ))}

          </div>

          <div className="hidden lg:flex gap-3">

            <Link
              to="/login"
              style={{ textDecoration: "none" }}
              className="px-5 py-2 rounded-lg border border-green-600 text-green-600 hover:bg-green-50 transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              style={{ textDecoration: "none" }}
              className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
            >
              Register
            </Link>

          </div>

          <button
            className="lg:hidden"
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
          >
            {menuOpen ? (
              <HiX className="text-3xl" />
            ) : (
              <HiMenu className="text-3xl" />
            )}
          </button>

        </div>

      </div>


      {menuOpen && (

        <div className="lg:hidden bg-white shadow-lg">

          <div className="flex flex-col p-5 gap-4">

            {navLinks.map((item) => (

              <a
                key={item.title}
                href={item.href}
                className="text-gray-700 font-medium"
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                {item.title}
              </a>

            ))}

            <Link
              to="/login"
              className="text-center border border-green-600 py-2 rounded-lg"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="text-center bg-green-600 text-white py-2 rounded-lg"
            >
              Register
            </Link>

          </div>

        </div>

      )}

    </nav>
  );
};

export default Navbar;