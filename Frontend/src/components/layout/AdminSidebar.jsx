import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiSolidFoodMenu } from "react-icons/bi";

const AdminSidebar = () => {
  const Navigate = useNavigate();
  const handleLogout = () => {
    alert("Logout Successfully");
    Navigate("/login");
  };

  return (
    <div className="sticky top-0 h-screen w-64 bg-gray-800 text-white flex flex-col p-4 ">
      <div className="flex gap-2">
        <BiSolidFoodMenu className="text-3xl text-white" />
        <h3 className="text-xl font-semibold mb-6">Menu</h3>
      </div>
      <div className="bg-gray-400 h-0.5 mt-3 w-full"></div>

      <Link
        to="/admin/dashboard"
        className="mb-3  mt-4 hover:bg-gray-700 p-2 rounded text-white text-decoration-none text-xl hover:underline"
      >
        Dashboard
      </Link>

      <Link
        to="/admin/all-complaints"
        className="mb-3 hover:bg-gray-700 p-2 rounded text-white text-xl text-decoration-none"
      >
        All Complaints
      </Link>

      <Link
        to="/admin/staff"
        className="mb-3 hover:bg-gray-700 p-2 rounded text-white text-xl text-decoration-none"
      >
        Staff Data
      </Link>
      <button
        onClick={() => {
          console.log("Moved");
          Navigate("/admin/add-staff")
        }}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
         Add Staff
      </button>

      {/* <Link to="/login" className="mt-auto bg-red-500 text-center p-2 rounded text-white text-decoration-none">
        Logout
      </Link> */}
      <button
        className="mt-auto bg-red-500 text-center p-2 rounded text-white text-decoration-none"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default AdminSidebar;
