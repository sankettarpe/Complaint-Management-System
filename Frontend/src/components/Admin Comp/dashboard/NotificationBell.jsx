import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { IoNotificationsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  const notificationRef = useRef(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/notifications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotifications(response.data.notifications);
      setUnreadCount(response.data.unreadCount);
      console.log("Fetched Notifications:", response.data.notifications);
    } catch (error) {
      console.error(
        "Failed to fetch notifications:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    if (!token) return;

    fetchNotifications();

    // Check for new notifications every 30 seconds
    const interval = setInterval(() => {
      fetchNotifications();
    }, 30000);

    return () => clearInterval(interval);
  }, [token]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNotificationClick = async (notification) => {
    try {
      if (!notification.isRead) {
        await axios.put(
          `http://localhost:5000/api/notifications/${notification._id}/read`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setNotifications((prev) =>
          prev.map((item) =>
            item._id === notification._id
              ? { ...item, isRead: true }
              : item
          )
        );

        setUnreadCount((prev) => Math.max(0, prev - 1));
      }

      setShowNotifications(false);

      if (notification.complaint?._id) {
        navigate(
          `/admin/complaints/${notification.complaint._id}`
        );
      }
    } catch (error) {
      console.error(
        "Failed to update notification:",
        error.response?.data || error.message
      );
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await axios.put(
        "http://localhost:5000/api/notifications/read-all",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          isRead: true,
        }))
      );

      setUnreadCount(0);
    } catch (error) {
      console.error(
        "Failed to mark notifications as read:",
        error.response?.data || error.message
      );
    }
  };

  const formatTime = (date) => {
    const notificationDate = new Date(date);
    const now = new Date();

    const difference = Math.floor(
      (now - notificationDate) / 1000
    );

    if (difference < 60) {
      return "Just now";
    }

    if (difference < 3600) {
      return `${Math.floor(difference / 60)} min ago`;
    }

    if (difference < 86400) {
      return `${Math.floor(difference / 3600)} hour ago`;
    }

    return `${Math.floor(difference / 86400)} day ago`;
  };

  return (
    <div
      className="relative"
      ref={notificationRef}
    >
      {/* Notification Bell */}

      <button
        onClick={() =>
          setShowNotifications((prev) => !prev)
        }
        className="relative p-2 rounded-full hover:bg-gray-100 transition"
      >
        <IoNotificationsOutline className="text-3xl text-gray-700" />

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold min-w-5 h-5 px-1 rounded-full flex items-center justify-center">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}

      {showNotifications && (
        <div className="absolute right-0 mt-3 w-96 bg-white rounded-xl shadow-2xl border z-50 overflow-hidden">

          {/* Header */}

          <div className="flex justify-between items-center px-4 py-3 border-b">
            <h3 className="font-semibold text-lg">
              Notifications
            </h3>

            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-sm text-blue-600 hover:underline"
              >
                Mark all as read
              </button>
            )}
          </div>

          {/* Notifications */}

          <div className="max-h-100 overflow-y-auto">

            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <IoNotificationsOutline className="text-4xl mx-auto mb-2 text-gray-300" />

                <p>No notifications</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification._id}
                  onClick={() =>
                    handleNotificationClick(notification)
                  }
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition ${
                    !notification.isRead
                      ? "bg-blue-50"
                      : "bg-white"
                  }`}
                >

                  <div className="flex gap-3">

                    {/* Notification indicator */}

                    <div
                      className={`mt-1 w-2 h-2 rounded-full shrink-0 ${
                        notification.isRead
                          ? "bg-gray-300"
                          : "bg-red-500"
                      }`}
                    />

                    <div className="flex-1">

                      <p className="font-semibold text-sm">
                        {notification.title}
                      </p>

                      <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>

                      {notification.complaint && (
                        <p className="text-xs text-blue-600 mt-2">
                          Click to view complaint
                        </p>
                      )}

                      <p className="text-xs text-gray-400 mt-2">
                        {formatTime(notification.createdAt)}
                      </p>

                    </div>
                  </div>

                </div>
              ))
            )}

          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;