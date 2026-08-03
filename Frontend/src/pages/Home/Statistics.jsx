import React from "react";
import {
  FaClipboardCheck,
  FaUsers,
  FaTools,
  FaChartLine,
} from "react-icons/fa";

const stats = [
  {
    icon: <FaClipboardCheck />,
    value: "2,500+",
    title: "Complaints Submitted",
    description: "Successfully registered through the platform.",
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    icon: <FaChartLine />,
    value: "95%",
    title: "Resolution Rate",
    description: "Complaints resolved efficiently by staff.",
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    icon: <FaUsers />,
    value: "1,200+",
    title: "Active Users",
    description: "Students, faculty, and staff using CampusCare.",
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
  {
    icon: <FaTools />,
    value: "35+",
    title: "Maintenance Staff",
    description: "Dedicated staff available to resolve issues.",
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
];

const Statistics = () => {
  return (
    <section className="py-24 bg-linear-to-r from-green-600 to-emerald-700">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <span className="uppercase tracking-widest text-green-100 font-semibold">
            Platform Statistics
          </span>

          <h2 className="text-4xl font-bold text-white mt-3">
            Trusted by the Campus Community
          </h2>

          <p className="text-green-100 mt-5 max-w-3xl mx-auto leading-8">
            CampusCare helps educational institutions manage complaints
            efficiently through transparency, accountability, and
            real-time monitoring.
          </p>

        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {stats.map((item, index) => (

            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition duration-300"
            >

              <div
                className={`w-20 h-20 mx-auto rounded-full ${item.bg} flex items-center justify-center text-4xl ${item.color}`}
              >
                {item.icon}
              </div>

              <h3 className="text-4xl font-bold mt-6">
                {item.value}
              </h3>

              <h4 className="text-xl font-semibold mt-3">
                {item.title}
              </h4>

              <p className="text-gray-600 mt-3 leading-7">
                {item.description}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default Statistics;