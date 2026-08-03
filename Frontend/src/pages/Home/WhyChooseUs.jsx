import React from "react";
import {
  FaClock,
  FaUserShield,
  FaChartPie,
  FaCheckCircle,
} from "react-icons/fa";

const reasons = [
  {
    icon: <FaClock className="text-5xl text-green-600" />,
    title: "Faster Complaint Resolution",
    description:
      "Complaints are automatically routed to administrators, who can assign them to the appropriate staff for quicker resolution.",
  },
  {
    icon: <FaUserShield className="text-5xl text-blue-600" />,
    title: "Secure Role-Based Access",
    description:
      "JWT authentication and role-based authorization ensure that users, admins, and super admins only access permitted features.",
  },
  {
    icon: <FaChartPie className="text-5xl text-purple-600" />,
    title: "Insightful Analytics",
    description:
      "Interactive dashboards help administrators monitor complaint trends, categories, staff workload, and overall system performance.",
  },
  {
    icon: <FaCheckCircle className="text-5xl text-orange-500" />,
    title: "Transparent Workflow",
    description:
      "Every complaint progresses through clearly defined stages—Pending, In Progress, and Completed—allowing users to track progress easily.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-gray-50">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <span className="text-green-600 uppercase font-semibold tracking-widest">
            Why Choose CampusCare
          </span>

          <h2 className="text-4xl font-bold mt-3">
            Designed for Efficient Campus Maintenance
          </h2>

          <p className="mt-5 text-gray-600 max-w-3xl mx-auto leading-8">
            CampusCare streamlines the complete complaint lifecycle by
            connecting students, administrators, and maintenance staff
            through one centralized platform.
          </p>

        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          {reasons.map((item, index) => (

            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition duration-300 p-8 flex gap-6"
            >

              <div className="shrink-0">
                {item.icon}
              </div>

              <div>

                <h3 className="text-2xl font-semibold mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-600 leading-7">
                  {item.description}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default WhyChooseUs;