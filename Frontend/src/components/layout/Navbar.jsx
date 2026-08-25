import React, { useEffect, useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { BiChevronDown } from "react-icons/bi";
import { MdPerson } from "react-icons/md";
import logo from "../../images/logo2.gif";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to read user data:", error);
    }
  }, []);

  return (
    <header className=" top-1 z-30 h-16 bg-white border-b border-gray-200 shadow-sm">
      <div className="h-full flex items-center justify-between my-1 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Campus Care Logo"
            className="h-11 w-11 object-contain rounded-lg"
          />

          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-gray-800 leading-tight">
              Campus Care
            </h1>

            <p className="text-xs text-gray-500">GCOEA Complaint Management</p>
          </div>

          {/* Mobile brand */}

          <h1 className="sm:hidden text-lg font-bold text-gray-800">
            CampusCare
          </h1>
        </div>

        <div className="flex items-center gap-3 sm:gap-5">
          <button
            className="
              relative
              p-2.5
              rounded-xl
              text-gray-600
              hover:bg-gray-100
              hover:text-blue-600
              transition-all
              duration-200
            "
            title="Notifications"
          >
            <IoNotificationsOutline className="text-2xl" />

            <span
              className="
                absolute
                -top-0.5
                -right-0.5
                min-w-5
                h-5
                px-1
                flex
                items-center
                justify-center
                rounded-full
                bg-red-500
                text-white
                text-[10px]
                font-bold
                border-2
                border-white
              "
            >
              0
            </span>
          </button>

          <div className="hidden sm:block h-8 w-px bg-gray-200" />

          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="
                flex
                items-center
                gap-2
                sm:gap-3
                px-2
                sm:px-3
                py-1.5
                rounded-xl
                hover:bg-gray-100
                transition-all
                duration-200
              "
            >
              <div
                className="
                  w-9
                  h-9
                  rounded-full
                  bg-blue-600
                  text-white
                  flex
                  items-center
                  justify-center
                  font-semibold
                  shadow-sm
                "
              >
                {user?.name ? (
                  user.name.charAt(0).toUpperCase()
                ) : (
                  <MdPerson className="text-xl" />
                )}
              </div>

              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-gray-800 max-w-32 truncate">
                  {user?.name || "User"}
                </p>

                <p className="text-xs text-gray-500">
                  {user?.role || "Student"}
                </p>
              </div>

              <BiChevronDown
                className={`
                  hidden sm:block
                  text-xl
                  text-gray-500
                  transition-transform
                  duration-200
                  ${showProfile ? "rotate-180" : ""}
                `}
              />
            </button>

            {showProfile && (
              <div
                className="
                  absolute
                  right-0
                  top-14
                  w-64
                  bg-white
                  rounded-xl
                  shadow-xl
                  border
                  border-gray-200
                  p-3
                  z-50
                "
              >
                <div className="flex items-center gap-3 p-3">
                  <div
                    className="
                      w-11
                      h-11
                      rounded-full
                      bg-blue-600
                      text-white
                      flex
                      items-center
                      justify-center
                      font-bold
                    "
                  >
                    {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>

                  <div className="min-w-0">
                    <p className="font-semibold text-gray-800 truncate">
                      {user?.name || "User"}
                    </p>

                    <p className="text-xs text-gray-500 truncate">
                      {user?.email || "No email available"}
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-200 my-2" />

                <div className="px-2 py-2">

                  <p className="px-2 mb-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                    Account
                  </p>

                  <div className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-gray-50 transition">
                    <div>
                      <p className="text-xs text-gray-400">Role</p>

                      <p className="text-sm font-medium text-gray-700 mt-0.5 capitalize">
                        {user?.role || "Student"}
                      </p>
                    </div>

                    <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-medium">
                      {user?.role || "Student"}
                    </span>
                  </div>

                  <div className="px-2 py-2">
                    <p className="text-xs text-gray-400">Email</p>

                    <p className="text-sm font-medium text-gray-700 mt-0.5 truncate">
                      {user?.email || "Not available"}
                    </p>
                  </div>

                  <div className="flex items-center justify-between px-2 py-2">
                    <div>
                      <p className="text-xs text-gray-400">Account Status</p>

                      <p className="text-sm font-medium text-gray-700 mt-0.5">
                        Active
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>

                      <span className="text-xs font-medium text-green-600">
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
