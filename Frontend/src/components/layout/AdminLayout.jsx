import React from "react";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import Footer from "./Footer";

const AdminLayouts = ({ children }) => {
  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-h-screen">
        {/* <AdminNavbar /> */}

        <div className="flex-1 p-4 bg-gray-100">{children}</div>

        <Footer />
      </div>
    </div>
  );
};

export default AdminLayouts;
