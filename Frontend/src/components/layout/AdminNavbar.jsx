import React from "react";
import { FaBell } from "react-icons/fa";
import { HiOutlineUserCircle } from "react-icons/hi";

const AdminNavbar = () => {
  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-700">
        Complaint Management System
      </h1>

      <div className="flex items-center gap-5">
        <FaBell className="text-xl cursor-pointer" />
        <HiOutlineUserCircle className="text-3xl cursor-pointer" />
      </div>
    </div>
  );
};

export default AdminNavbar;