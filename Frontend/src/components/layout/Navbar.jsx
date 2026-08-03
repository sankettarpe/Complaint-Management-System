import React from "react";
import logo from "../../images/logo2.gif"

const Navbar = () => {
  return (
    <div className="sticky top-0 z-10 h-14 bg-green-600 flex items-center justify-between px-6 shadow-md">
      <div className="flex gap-2">
        <img src = {logo} alt="logo" className="h-12 w-12"/>
        <h2 className="font-semibold text-lg text-purple-500">Clean Campus GCOEA</h2>
      </div>

      <div className="flex items-center gap-4 mx-5">
        <button className="bg-white text-green-600 px-4 py-1 rounded">
          {(() => {
            const user = JSON.parse(localStorage.getItem("user"));
            return user ? user.name : "User";
          })()}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
