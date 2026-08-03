import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Dashboard from "../../pages/student/Dashboard";

const Layouts = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 bg-gray-100">{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default Layouts;
