import React from "react";
import {
  FaClipboardList,
  FaClock,
  FaSpinner,
  FaCheckCircle,
} from "react-icons/fa";

const StatsCards = ({ stats }) => {
  const cards = [
    {
      title: "Total Complaints",
      value: stats?.total || 0,
      icon: <FaClipboardList />,
      bg: "bg-blue-100",
      text: "text-blue-700",
      iconBg: "bg-blue-500",
    },
    {
      title: "Pending",
      value: stats?.pending || 0,
      icon: <FaClock />,
      bg: "bg-yellow-100",
      text: "text-yellow-700",
      iconBg: "bg-yellow-500",
    },
    {
      title: "In Progress",
      value: stats?.inProgress || 0,
      icon: <FaSpinner />,
      bg: "bg-indigo-100",
      text: "text-indigo-700",
      iconBg: "bg-indigo-500",
    },
    {
      title: "Completed",
      value: stats?.completed || 0,
      icon: <FaCheckCircle />,
      bg: "bg-green-100",
      text: "text-green-700",
      iconBg: "bg-green-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${card.bg} rounded-2xl shadow-md p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className={`font-medium ${card.text}`}>
                {card.title}
              </p>

              <h2 className="text-4xl font-bold mt-3 text-gray-800">
                {card.value}
              </h2>

              <p className="text-sm text-gray-500 mt-2">
                Live Statistics
              </p>
            </div>

            <div
              className={`${card.iconBg} text-white text-3xl p-4 rounded-full shadow-lg`}
            >
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;