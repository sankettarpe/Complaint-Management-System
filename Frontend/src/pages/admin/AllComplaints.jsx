import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminLayouts from "../../components/layout/AdminLayout";
import AssignStaffModal from "./Staff List/AssignStaffModal";
import Loader from "../../components/common/Loader";
import Pagination from "../../components/common/Pagination";

import { MdOutlineFeedback, MdDeleteOutline } from "react-icons/md";
import { PiSortAscendingFill } from "react-icons/pi";
import { IoSearch } from "react-icons/io5";
import { MdAssignmentAdd } from "react-icons/md";
import {
  MdWarningAmber,
  MdVisibility,
  MdClose,
  MdCheckCircle,
} from "react-icons/md";
import { FaRobot } from "react-icons/fa";

const AllComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [hovering, setHovering] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  // AI duplicate modal
  const [selectedDuplicate, setSelectedDuplicate] = useState(null);

  const limit = 10;
  const navigate = useNavigate();

  const fetchComplaints = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        `http://localhost:5000/api/admin/all-complaints?page=${currentPage}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setComplaints(data.complaints);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Failed to fetch complaints");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, [currentPage]);

  const filteredComplaints =
    search === ""
      ? complaints
      : complaints.filter((c) =>
          c.location?.toLowerCase().includes(search.toLowerCase()),
        );

  const handleUpdate = async (id, currentStatus) => {
    let newStatus = "";

    if (currentStatus === "Pending") {
      newStatus = "In Progress";
    } else if (currentStatus === "In Progress") {
      newStatus = "Completed";
    } else {
      newStatus = "Pending";
    }

    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.put(
        `http://localhost:5000/api/admin/update-status/${id}`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.success) {
        setComplaints((prev) =>
          prev.map((c) =>
            c._id === id
              ? {
                  ...c,
                  status: newStatus,
                }
              : c,
          ),
        );

        alert("Status Updated Successfully");
      }
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Status update failed");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this complaint?",
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.delete(
        `http://localhost:5000/api/admin/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.success) {
        setComplaints((prev) =>
          prev.filter((complaint) => complaint._id !== id),
        );

        alert("Complaint Deleted Successfully");
      }
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Delete failed");
    }
  };

  const handleAssignClick = (complaint) => {
    setSelectedComplaint(complaint);
    setShowAssignModal(true);
  };

  // Open AI duplicate details
  const handleViewSimilar = (complaint) => {
    setSelectedDuplicate(complaint);
  };

  // Close AI duplicate modal
  const closeDuplicateModal = () => {
    setSelectedDuplicate(null);
  };
  const handleDuplicateDecision = async (decision) => {
    if (!selectedDuplicate) return;

    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.put(
        `http://localhost:5000/api/admin/review-duplicate/${selectedDuplicate._id}`,
        {
          decision,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.success) {
        setComplaints((prev) =>
          prev.map((complaint) =>
            complaint._id === selectedDuplicate._id
              ? {
                  ...complaint,
                  duplicateAnalysis: {
                    ...complaint.duplicateAnalysis,
                    adminDecision: decision,
                    reviewedAt: new Date(),
                  },
                }
              : complaint,
          ),
        );

        alert(
          decision === "Duplicate"
            ? "Complaint marked as duplicate."
            : "Complaint marked as not duplicate.",
        );

        setSelectedDuplicate(null);
      }
    } catch (error) {
      console.error("Duplicate decision error:", error);

      alert(
        error.response?.data?.message || "Failed to save duplicate decision",
      );
    }
  };

  if (loading) {
    return (
      <AdminLayouts>
        <h2 className="text-xl font-semibold">
          <Loader />
        </h2>
      </AdminLayouts>
    );
  }

  return (
    <AdminLayouts>
      {/* ================= HEADER ================= */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 px-3 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Manage Complaints
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Monitor, assign and review submitted complaints
          </p>
        </div>

        <div className="flex gap-4 items-center">
          {/* SEARCH */}
          <div className="relative">
            <IoSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl pointer-events-none" />

            <input
              type="text"
              placeholder="Search by location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-80 pl-11 pr-4 py-2.5 bg-white border border-gray-300 rounded-full shadow-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-500 transition"
            />
          </div>

          {/* SORT */}
          <div
            className="relative bg-purple-500 hover:bg-purple-600 text-white rounded-full p-2 cursor-pointer transition"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            <PiSortAscendingFill className="text-3xl" />
          </div>
        </div>
      </div>

      {hovering && (
        <p className="fixed right-3 top-32 text-sm bg-white px-4 py-2 rounded-lg shadow-lg border z-40">
          Sort according to date
        </p>
      )}

      {/* ================= TABLE CARD ================= */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        {/* CARD HEADER */}
        <div className="px-5 py-4 border-b flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              All Complaints
            </h2>

            <p className="text-sm text-gray-500">
              {filteredComplaints.length} complaint
              {filteredComplaints.length !== 1 ? "s" : ""} displayed
            </p>
          </div>

          {/* AI indicator */}
          <div className="flex items-center gap-2 text-sm text-purple-700 bg-purple-50 px-3 py-2 rounded-full">
            <FaRobot />
            <span>AI Duplicate Detection</span>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b text-gray-600 text-sm">
                <th className="px-4 py-3 font-semibold">Image</th>

                <th className="px-4 py-3 font-semibold">Title</th>

                <th className="px-4 py-3 font-semibold">Location</th>

                <th className="px-4 py-3 font-semibold">Status</th>

                <th className="px-4 py-3 font-semibold min-w-65">AI Alert</th>

                <th className="px-4 py-3 font-semibold">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredComplaints.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-10 text-gray-500">
                    No complaints found
                  </td>
                </tr>
              ) : (
                filteredComplaints.map((c) => (
                  <tr
                    key={c._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    {/* ================= IMAGE ================= */}
                    <td className="px-4 py-4">
                      <button
                        onClick={() => {
                          console.log("Stored image path:", c.image);

                          const imageUrl = `http://localhost:5000/${c.image.replace(
                            /\\/g,
                            "/",
                          )}`;

                          console.log("Final URL:", imageUrl);

                          setSelectedImage(imageUrl);
                        }}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium underline"
                      >
                        View Image
                      </button>
                    </td>

                    {/* ================= TITLE ================= */}
                    <td
                      className="px-4 py-4"
                      onClick={() => navigate(`/admin/complaints/${c._id}`)}
                    >
                      <button className="font-medium text-gray-800 hover:text-blue-600 text-left transition">
                        {c.title}
                      </button>
                    </td>

                    {/* ================= LOCATION ================= */}
                    <td className="px-4 py-4 text-gray-600">{c.location}</td>

                    {/* ================= STATUS ================= */}
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          c.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : c.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>

                    {/* ================= AI ALERT ================= */}
                    <td className="px-4 py-4">
                      {c.duplicateAnalysis?.adminDecision === "Duplicate" ? (
                        <div className="flex flex-col gap-1">
                          <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 px-2.5 py-1 rounded-full text-xs font-semibold w-fit">
                            ⚠ Duplicate Confirmed
                          </span>

                          <span className="text-xs text-gray-500">
                            Admin reviewed
                          </span>
                        </div>
                      ) : c.duplicateAnalysis?.adminDecision ===
                        "Not Duplicate" ? (
                        <div className="flex flex-col gap-1">
                          <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-xs font-semibold w-fit">
                            ✓ Not Duplicate
                          </span>

                          <span className="text-xs text-gray-500">
                            Admin reviewed
                          </span>
                        </div>
                      ) : c.duplicateAnalysis?.isPossibleDuplicate ? (
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2.5 py-1 rounded-full text-xs font-semibold">
                              ⚠ Possible Duplicate
                            </span>

                            <span className="text-xs font-semibold text-gray-600">
                              {(c.duplicateAnalysis.similarity * 100).toFixed(
                                1,
                              )}
                              %
                            </span>
                          </div>

                          {c.duplicateAnalysis.matchedComplaint && (
                            <button
                              onClick={() => handleViewSimilar(c)}
                              className="text-xs text-purple-600 hover:text-purple-800 font-semibold w-fit"
                            >
                              View Similar
                            </button>
                          )}
                        </div>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full text-xs">
                          No Alert
                        </span>
                      )}
                    </td>

                    {/* ================= ACTION ================= */}
                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        {/* Assign */}
                        <button
                          onClick={() => handleAssignClick(c)}
                          title="Assign Staff"
                          className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition"
                        >
                          <MdAssignmentAdd />
                        </button>

                        {/* Update status */}
                        <button
                          title="Update Status"
                          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700 transition"
                          onClick={() => handleUpdate(c._id, c.status)}
                        >
                          <MdOutlineFeedback />
                        </button>

                        {/* Delete */}
                        <button
                          title="Delete Complaint"
                          className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
                          onClick={() => handleDelete(c._id)}
                        >
                          <MdDeleteOutline />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= PAGINATION ================= */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* ===================================================== */}
      {/* IMAGE MODAL */}
      {/* ===================================================== */}

      {selectedImage && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-5 rounded-xl shadow-2xl max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg text-gray-800">
                Complaint Image
              </h3>

              <button
                onClick={() => setSelectedImage(null)}
                className="text-gray-500 hover:text-red-500"
              >
                <MdClose className="text-2xl" />
              </button>
            </div>

            <img
              src={selectedImage}
              alt="Complaint"
              className="max-w-full max-h-[70vh] mx-auto object-contain rounded-lg"
            />

            <button
              onClick={() => setSelectedImage(null)}
              className="mt-5 w-full bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-lg transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ===================================================== */}
      {/* AI DUPLICATE MODAL */}
      {/* ===================================================== */}

      {selectedDuplicate && (
        <div
          className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4"
          onClick={closeDuplicateModal}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* MODAL HEADER */}
            <div className="flex justify-between items-center px-6 py-5 border-b">
              <div>
                <div className="flex items-center gap-2">
                  <FaRobot className="text-purple-600 text-xl" />

                  <h2 className="text-xl font-bold text-gray-800">
                    AI Duplicate Analysis
                  </h2>
                </div>

                <p className="text-sm text-gray-500 mt-1">
                  AI detected a potentially related complaint
                </p>
              </div>

              <button
                onClick={closeDuplicateModal}
                className="text-gray-500 hover:text-red-500 transition"
              >
                <MdClose className="text-2xl" />
              </button>
            </div>

            {/* SIMILARITY */}
            <div className="px-6 py-5 bg-purple-50 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-purple-700 font-medium">
                    Semantic Similarity
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Based on complaint embeddings
                  </p>
                </div>

                <div className="text-3xl font-bold text-purple-700">
                  {(
                    selectedDuplicate.duplicateAnalysis.similarity * 100
                  ).toFixed(1)}
                  %
                </div>
              </div>
            </div>

            {/* COMPLAINT COMPARISON */}
            <div className="grid md:grid-cols-2 gap-5 p-6">
              {/* CURRENT COMPLAINT */}
              <div className="border rounded-xl p-5 bg-gray-50">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2.5 h-2.5 bg-blue-500 rounded-full"></span>

                  <h3 className="font-semibold text-gray-800">
                    Current Complaint
                  </h3>
                </div>

                <h4 className="font-semibold text-gray-800 mb-3">
                  {selectedDuplicate.title}
                </h4>

                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-medium">Category:</span>{" "}
                    {selectedDuplicate.category}
                  </p>

                  <p>
                    <span className="font-medium">Location:</span>{" "}
                    {selectedDuplicate.location}
                  </p>

                  <p>
                    <span className="font-medium">Description:</span>{" "}
                    {selectedDuplicate.description}
                  </p>
                </div>
              </div>

              {/* MATCHED COMPLAINT */}
              <div className="border border-red-200 rounded-xl p-5 bg-red-50">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2.5 h-2.5 bg-red-500 rounded-full"></span>

                  <h3 className="font-semibold text-gray-800">
                    Similar Complaint
                  </h3>
                </div>

                {selectedDuplicate.duplicateAnalysis.matchedComplaint ? (
                  <>
                    <h4 className="font-semibold text-gray-800 mb-3">
                      {
                        selectedDuplicate.duplicateAnalysis.matchedComplaint
                          .title
                      }
                    </h4>

                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium">Category:</span>{" "}
                        {
                          selectedDuplicate.duplicateAnalysis.matchedComplaint
                            .category
                        }
                      </p>

                      <p>
                        <span className="font-medium">Location:</span>{" "}
                        {
                          selectedDuplicate.duplicateAnalysis.matchedComplaint
                            .location
                        }
                      </p>

                      <p>
                        <span className="font-medium">Status:</span>{" "}
                        {
                          selectedDuplicate.duplicateAnalysis.matchedComplaint
                            .status
                        }
                      </p>

                      <p>
                        <span className="font-medium">Description:</span>{" "}
                        {
                          selectedDuplicate.duplicateAnalysis.matchedComplaint
                            .description
                        }
                      </p>
                    </div>
                  </>
                ) : (
                  <p className="text-gray-500">
                    No matched complaint information available.
                  </p>
                )}
              </div>
            </div>

            {/* ADMIN DECISION */}
            <div className="px-6 pb-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <MdWarningAmber className="text-yellow-600 text-2xl mt-0.5" />

                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Admin Review Required
                    </h3>

                    <p className="text-sm text-gray-600 mt-1">
                      AI only identifies a potentially similar complaint. The
                      final decision should be made by an administrator.
                    </p>
                  </div>
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex justify-end gap-3 mt-5">
                <button
                  onClick={() => handleDuplicateDecision("Not Duplicate")}
                  className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                >
                  Keep Separate
                </button>

                <button
                  onClick={() => handleDuplicateDecision("Duplicate")}
                  className="px-5 py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                >
                  Mark as Duplicate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================== */}
      {/* ASSIGN STAFF MODAL */}
      {/* ===================================================== */}

      {showAssignModal && (
        <AssignStaffModal
          complaint={selectedComplaint}
          onClose={() => setShowAssignModal(false)}
          onAssigned={fetchComplaints}
        />
      )}
    </AdminLayouts>
  );
};

export default AllComplaints;
