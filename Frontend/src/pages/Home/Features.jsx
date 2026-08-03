import React from "react";
import {
  FaClipboardList,
  FaTasks,
  FaUserShield,
  FaBell,
  FaChartLine,
  FaMobileAlt,
} from "react-icons/fa";

const features = [
  {
    icon: <FaClipboardList className="text-4xl text-green-600" />,
    title: "Easy Complaint Submission",
    description:
      "Users can submit complaints within seconds by providing the complaint details, location, category, priority level, and an optional image.",
  },
  {
    icon: <FaTasks className="text-4xl text-blue-600" />,
    title: "Real-Time Complaint Tracking",
    description:
      "Track complaint progress from Pending to In Progress and finally Completed through an intuitive dashboard.",
  },
  {
    icon: <FaUserShield className="text-4xl text-purple-600" />,
    title: "Role-Based Access Control",
    description:
      "Separate dashboards for Users, Admins, and Super Admins using secure JWT authentication and authorization.",
  },
  {
    icon: <FaBell className="text-4xl text-red-500" />,
    title: "Instant Notifications",
    description:
      "Receive updates whenever a complaint is assigned, its status changes, or it gets resolved.",
  },
  {
    icon: <FaChartLine className="text-4xl text-yellow-500" />,
    title: "Analytics Dashboard",
    description:
      "Visualize complaint statistics, monthly reports, category distribution, and overall system performance.",
  },
  {
    icon: <FaMobileAlt className="text-4xl text-indigo-600" />,
    title: "Mobile Friendly",
    description:
      "Fully responsive design that works smoothly across desktops, tablets, and smartphones.",
  },
];

const Features = () => {
  return (
    <section
      id="features"
      className="py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <span className="text-green-600 font-semibold uppercase tracking-widest">
            Features
          </span>

          <h2 className="text-4xl font-bold mt-3">
            Everything Needed to Manage Campus Complaints
          </h2>

          <p className="text-gray-600 mt-5 max-w-3xl mx-auto leading-8">
            CampusCare simplifies complaint management by connecting
            students, faculty, administrators, and maintenance staff
            on one secure platform. Every complaint can be reported,
            assigned, monitored, and resolved efficiently.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((feature, index) => (

            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition duration-300"
            >

              <div className="mb-6">
                {feature.icon}
              </div>

              <h3 className="text-xl font-semibold mb-4">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-7">
                {feature.description}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
};

export default Features;