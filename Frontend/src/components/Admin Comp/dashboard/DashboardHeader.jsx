import React from "react";
import { FaBell } from "react-icons/fa";
import { HiOutlineUserCircle } from "react-icons/hi";

const DashboardHeader = () => {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center bg-white rounded-2xl shadow-md px-8 py-6 mb-8">

      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Admin Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome back, Admin 👋
        </p>

        <p className="text-sm text-gray-400 mt-1">
          {today}
        </p>
      </div>

      <div className="flex items-center gap-6 mt-5 lg:mt-0">

        <div className="relative cursor-pointer">

          <FaBell className="text-2xl text-gray-600 hover:text-blue-600 transition"/>

          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex justify-center items-center">
            3
          </span>

        </div>

        <div className="flex items-center gap-3">

          <HiOutlineUserCircle className="text-5xl text-gray-600"/>

          <div>

            <h3 className="font-semibold">
              Admin
            </h3>

            <p className="text-sm text-gray-500">
              Complaint Manager
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default DashboardHeader;