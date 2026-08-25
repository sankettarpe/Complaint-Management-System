import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  BiSolidFoodMenu,
  BiHomeAlt2,
  BiClipboard,
  BiGroup,
  BiUserPlus,
  BiBell,
  BiLogOut,
  BiX,
  BiChevronRight,
} from "react-icons/bi";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsOpen(false);

    navigate("/login");
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: BiHomeAlt2,
    },
    {
      name: "All Complaints",
      path: "/admin/all-complaints",
      icon: BiClipboard,
    },
    {
      name: "Staff Data",
      path: "/admin/staff",
      icon: BiGroup,
    },
    {
      name: "Add Staff",
      path: "/admin/add-staff",
      icon: BiUserPlus,
    },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>

      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 h-16 bg-gray-900 text-white flex items-center justify-between px-4 shadow-lg">

        <div className="flex items-center gap-3">

          <div className="bg-blue-600 p-2 rounded-lg">
            <BiSolidFoodMenu className="text-2xl" />
          </div>

          <div>
            <h2 className="font-bold text-lg">
              CampusCare
            </h2>

            <p className="text-xs text-gray-400">
              Admin Panel
            </p>
          </div>

        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-800 transition"
        >
          <BiSolidFoodMenu className="text-2xl" />
        </button>

      </div>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
        />
      )}


      <aside
        className={`
          fixed lg:sticky
          top-0 left-0
          z-50
          h-screen
          w-72
          bg-gray-900
          text-white
          flex flex-col
          shadow-2xl
          transform
          transition-transform
          duration-300
          ease-in-out

          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >

        <div className="px-3 py-3">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div className="bg-blue-600 p-2.5 rounded-xl shadow-lg">

                <BiSolidFoodMenu className="text-2xl" />

              </div>

              <div>

                <h2 className="text-xl font-bold tracking-wide">
                  <div>Campus</div>
                  <div>Care</div>
                </h2>

                <p className="text-xs text-gray-400">
                  Administration
                </p>

              </div>

            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-800 transition"
            >
              <BiX className="text-2xl" />
            </button>

          </div>

        </div>

        <div className="mx-5 border-t border-gray-700" />

        <div className="px-5 pt-6 pb-3">

          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Administration
          </p>

        </div>

        <nav className="px-3 space-y-2">

          {menuItems.map((item) => {

            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`
                  group
                  flex
                  items-center
                  justify-between
                  px-4
                  py-3
                  rounded-xl
                  no-underline!
                  transition-all
                  duration-200

                  ${
                    active
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }
                `}
              >

                <div className="flex items-center gap-3">

                  <Icon
                    className={`
                      text-2xl

                      ${
                        active
                          ? "text-white"
                          : "text-gray-400 group-hover:text-white"
                      }
                    `}
                  />

                  <span className="font-medium">
                    {item.name}
                  </span>

                </div>


                <BiChevronRight
                  className={`
                    text-xl
                    transition-all
                    duration-200

                    ${
                      active
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100 group-hover:translate-x-1"
                    }
                  `}
                />

              </Link>
            );
          })}

        </nav>

        <div className="flex-1" />

        <div className="px-4 mb-3">

          <div className="bg-gray-800 rounded-xl p-3 flex items-center gap-3">

            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">

              A

            </div>


            <div className="flex-1 min-w-0">

              <p className="font-medium text-sm truncate">
                Administrator
              </p>

              <div className="flex items-center gap-1.5 mt-0.5">

                <span className="w-2 h-2 rounded-full bg-green-500" />

                <p className="text-xs text-gray-400">
                  Online
                </p>

              </div>

            </div>

          </div>

        </div>

        <div className="px-4 pb-5">

          <button
            onClick={handleLogout}
            className="
              w-full
              flex
              items-center
              justify-center
              gap-3
              px-4
              py-3
              rounded-xl
              bg-red-500/10
              text-red-400
              border
              border-red-500/20
              hover:bg-red-500
              hover:text-white
              transition-all
              duration-200
            "
          >

            <BiLogOut className="text-xl" />

            <span className="font-medium">
              Logout
            </span>

          </button>

        </div>

      </aside>

      <div className="lg:hidden h-16" />

    </>
  );
};

export default AdminSidebar;