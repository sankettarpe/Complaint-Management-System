import React from "react";
import {
  FaClipboardList,
  FaUserPlus,
  FaCheckCircle,
  FaTools,
} from "react-icons/fa";

const ActivityTimeline = ({ activities = [] }) => {
  const getIcon = (type) => {
    switch (type) {
      case "NEW_COMPLAINT":
        return (
          <div className="bg-blue-100 p-2 rounded-full">
            <FaClipboardList className="text-blue-600" />
          </div>
        );

      case "STAFF_ASSIGNED":
        return (
          <div className="bg-yellow-100 p-2 rounded-full">
            <FaTools className="text-yellow-600" />
          </div>
        );

      case "COMPLAINT_RESOLVED":
        return (
          <div className="bg-green-100 p-2 rounded-full">
            <FaCheckCircle className="text-green-600" />
          </div>
        );

      case "STAFF_ADDED":
        return (
          <div className="bg-purple-100 p-2 rounded-full">
            <FaUserPlus className="text-purple-600" />
          </div>
        );

      default:
        return (
          <div className="bg-gray-100 p-2 rounded-full">
            <FaClipboardList />
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-8">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-xl font-bold">
          Recent Activity
        </h2>

        <span className="text-gray-500 text-sm">
          Latest System Updates
        </span>

      </div>

      <div className="space-y-5">

        {activities.length === 0 ? (
          <p className="text-gray-500">
            No recent activity available.
          </p>
        ) : (
          activities.map((activity) => (
            <div
              key={activity._id}
              className="flex gap-4 items-start border-b pb-4"
            >
              {getIcon(activity.type)}

              <div className="flex-1">

                <h3 className="font-semibold">
                  {activity.title}
                </h3>

                <p className="text-gray-600 text-sm">
                  {activity.description}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  {activity.time}
                </p>

              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
};

export default ActivityTimeline;