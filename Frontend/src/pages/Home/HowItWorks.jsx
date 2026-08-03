import React from "react";
import {
  FaUserPlus,
  FaClipboardList,
  FaUserCog,
  FaTools,
  FaCheckCircle,
  FaCommentDots,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaUserPlus />,
    title: "Register & Login",
    description:
      "Users create an account and securely log in using JWT authentication.",
  },
  {
    icon: <FaClipboardList />,
    title: "Submit Complaint",
    description:
      "Provide title, category, location, priority, description, and an optional image.",
  },
  {
    icon: <FaUserCog />,
    title: "Admin Verification",
    description:
      "The administrator reviews the complaint, verifies the details, and assigns it to the appropriate staff member.",
  },
  {
    icon: <FaTools />,
    title: "Staff Assignment",
    description:
      "The assigned staff receives the complaint and updates its progress while resolving the issue.",
  },
  {
    icon: <FaCheckCircle />,
    title: "Issue Resolved",
    description:
      "After the maintenance work is completed, the complaint status is updated to Completed.",
  },
  {
    icon: <FaCommentDots />,
    title: "User Feedback",
    description:
      "Users can review the resolution and provide feedback to help improve the maintenance process.",
  },
];

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-20">

          <span className="uppercase tracking-widest text-green-600 font-semibold">
            Workflow
          </span>

          <h2 className="text-4xl font-bold mt-3">
            How CampusCare Works
          </h2>

          <p className="text-gray-600 mt-5 max-w-3xl mx-auto leading-8">
            CampusCare follows a simple and transparent workflow that ensures
            every complaint is properly tracked, assigned, and resolved in the
            shortest possible time.
          </p>

        </div>

        <div className="relative">

          <div className="hidden md:block absolute left-1/2 top-0 h-full w-1 bg-green-200 -translate-x-1/2"></div>

          <div className="space-y-16">

            {steps.map((step, index) => (

              <div
                key={index}
                className={`relative flex flex-col md:flex-row items-center ${
                  index % 2 === 0
                    ? "md:flex-row"
                    : "md:flex-row-reverse"
                }`}
              >


                <div className="md:w-1/2 px-8">

                  <div className="bg-gray-50 rounded-2xl shadow hover:shadow-lg transition p-8">

                    <div className="text-5xl text-green-600 mb-5">
                      {step.icon}
                    </div>

                    <h3 className="text-2xl font-semibold mb-3">
                      {step.title}
                    </h3>

                    <p className="text-gray-600 leading-7">
                      {step.description}
                    </p>

                  </div>

                </div>

                <div className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-green-600 text-white text-xl font-bold shadow-lg">
                  {index + 1}
                </div>

                <div className="md:w-1/2"></div>

              </div>

            ))}

          </div>

        </div>

      </div>
    </section>
  );
};

export default HowItWorks;