import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayouts from "../../components/layout/AdminLayout";
import {
  MdArrowBack,
  MdLocationOn,
  MdCategory,
  MdPriorityHigh,
  MdPerson,
  MdCalendarToday,
} from "react-icons/md";

const ComplaintDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [complaint, setComplaint] = useState(null);
  const [staff, setStaff] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState("");
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const fetchComplaint = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `http://localhost:5000/api/admin/complaints/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComplaint(response.data.complaint);
    } catch (error) {
      console.error(
        "Failed to fetch complaint:",
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.message ||
          "Failed to load complaint."
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchStaff = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/staff",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStaff(response.data.staff || []);
    } catch (error) {
      console.error(
        "Failed to fetch staff:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchComplaint();
    fetchStaff();
  }, [id]);

  const handleAssignStaff = async () => {
    if (!selectedStaff) {
      alert("Please select a staff member.");
      return;
    }

    try {
      setAssigning(true);

      const response = await axios.put(
        `http://localhost:5000/api/admin/assign-staff/${complaint._id}`,
        {
          staffId: selectedStaff,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComplaint(response.data.complaint);

      alert("Staff assigned successfully.");

      setSelectedStaff("");
    } catch (error) {
      console.error(
        "Failed to assign staff:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to assign staff."
      );
    } finally {
      setAssigning(false);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/admin/update-status/${id}`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComplaint(response.data.complaint);

      alert("Complaint status updated successfully.");
    } catch (error) {
      console.error(
        "Failed to update status:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to update complaint status."
      );
    }
  };


  if (loading) {
    return (
      <AdminLayouts>
        <div className="flex justify-center items-center min-h-100">
          <p className="text-gray-500 text-lg">
            Loading complaint...
          </p>
        </div>
      </AdminLayouts>
    );
  }

  if (error || !complaint) {
    return (
      <AdminLayouts>
        <div className="p-6">

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-blue-600 mb-6"
          >
            <MdArrowBack />
            Back
          </button>

          <div className="bg-white rounded-xl shadow p-8 text-center">
            <p className="text-red-500 text-lg">
              {error || "Complaint not found."}
            </p>
          </div>

        </div>
      </AdminLayouts>
    );
  }

  const imageUrl = complaint.image
    ? `http://localhost:5000/${complaint.image.replace(
        /\\/g,
        "/"
      )}`
    : null;

  return (
    <AdminLayouts>

      <div className="p-4 md:p-6">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
        >
          <MdArrowBack className="text-xl" />
          Back to Complaints
        </button>

        {/* Page Header */}

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">

          <div>
            <h1 className="text-3xl font-bold">
              Complaint Details
            </h1>

            <p className="text-gray-500 mt-1">
              Review complaint and take necessary action.
            </p>
          </div>

          {/* Status */}

          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              complaint.status === "Pending"
                ? "bg-yellow-100 text-yellow-700"
                : complaint.status === "In Progress"
                ? "bg-blue-100 text-blue-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {complaint.status}
          </span>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 space-y-6">

            <div className="bg-white rounded-2xl shadow-md p-6">

              <h2 className="text-xl font-bold mb-6">
                {complaint.title}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div className="flex items-start gap-3">
                  <MdCategory className="text-2xl text-blue-500" />

                  <div>
                    <p className="text-sm text-gray-500">
                      Category
                    </p>

                    <p className="font-semibold">
                      {complaint.category || "Not specified"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MdLocationOn className="text-2xl text-red-500" />

                  <div>
                    <p className="text-sm text-gray-500">
                      Location
                    </p>

                    <p className="font-semibold">
                      {complaint.location || "Not specified"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MdPriorityHigh className="text-2xl text-orange-500" />

                  <div>
                    <p className="text-sm text-gray-500">
                      Priority
                    </p>

                    <p
                      className={`font-semibold ${
                        complaint.priority === "Critical"
                          ? "text-red-600"
                          : complaint.priority === "High"
                          ? "text-orange-600"
                          : complaint.priority === "Medium"
                          ? "text-yellow-600"
                          : "text-green-600"
                      }`}
                    >
                      {complaint.priority || "Not specified"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MdCalendarToday className="text-2xl text-purple-500" />

                  <div>
                    <p className="text-sm text-gray-500">
                      Submitted On
                    </p>

                    <p className="font-semibold">
                      {complaint.createdAt
                        ? new Date(
                            complaint.createdAt
                          ).toLocaleString()
                        : "Not available"}
                    </p>
                  </div>
                </div>

              </div>

              <div className="mt-7">

                <h3 className="font-semibold mb-2">
                  Description
                </h3>

                <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
                  {complaint.description ||
                    "No description provided."}
                </p>

              </div>

            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">

              <h2 className="text-xl font-bold mb-4">
                Complaint Image
              </h2>

              {imageUrl ? (
                <div className="flex justify-center bg-gray-50 rounded-xl p-4">

                  <img
                    src={imageUrl}
                    alt="Complaint"
                    className="max-h-112.5 max-w-full object-contain rounded-lg"
                    onError={(e) => {
                      console.error(
                        "Complaint image failed:",
                        imageUrl
                      );
                      e.currentTarget.style.display = "none";
                    }}
                  />

                </div>
              ) : (
                <div className="bg-gray-50 rounded-xl p-10 text-center text-gray-500">
                  No image uploaded for this complaint.
                </div>
              )}

            </div>

          </div>

          <div className="space-y-6">

            <div className="bg-white rounded-2xl shadow-md p-6">

              <h2 className="text-xl font-bold mb-5">
                Submitted By
              </h2>

              <div className="flex items-center gap-3">

                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <MdPerson className="text-2xl text-blue-600" />
                </div>

                <div>

                  <p className="font-semibold">
                    {complaint.user?.name ||
                      "Unknown User"}
                  </p>

                  <p className="text-sm text-gray-500">
                    {complaint.user?.email ||
                      "No email available"}
                  </p>

                </div>

              </div>

            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">

              <h2 className="text-xl font-bold mb-2">
                Assign Staff
              </h2>

              <p className="text-sm text-gray-500 mb-5">
                Assign an available staff member to resolve
                this complaint.
              </p>

              <select
                value={selectedStaff}
                onChange={(e) =>
                  setSelectedStaff(e.target.value)
                }
                className="w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">
                  Select Staff Member
                </option>

                {staff.map((member) => (
                  <option
                    key={member._id}
                    value={member._id}
                  >
                    {member.name}
                  </option>
                ))}
              </select>

              <button
                onClick={handleAssignStaff}
                disabled={assigning || !selectedStaff}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {assigning
                  ? "Assigning..."
                  : "Assign Staff"}
              </button>

              {complaint.assignedStaff && (
                <div className="mt-5 bg-green-50 p-4 rounded-lg">

                  <p className="text-sm text-gray-500">
                    Currently Assigned
                  </p>

                  <p className="font-semibold text-green-700 mt-1">
                    {complaint.assignedStaff.name ||
                      "Staff Assigned"}
                  </p>

                </div>
              )}

            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">

              <h2 className="text-xl font-bold mb-4">
                Update Status
              </h2>

              <div className="space-y-2">

                <button
                  onClick={() =>
                    handleStatusUpdate("Pending")
                  }
                  className="w-full border border-yellow-400 text-yellow-700 py-2 rounded-lg hover:bg-yellow-50"
                >
                  Mark as Pending
                </button>

                <button
                  onClick={() =>
                    handleStatusUpdate("In Progress")
                  }
                  className="w-full border border-blue-400 text-blue-700 py-2 rounded-lg hover:bg-blue-50"
                >
                  Mark as In Progress
                </button>

                <button
                  onClick={() =>
                    handleStatusUpdate("Completed")
                  }
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                >
                  Mark as Completed
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </AdminLayouts>
  );
};

export default ComplaintDetails;