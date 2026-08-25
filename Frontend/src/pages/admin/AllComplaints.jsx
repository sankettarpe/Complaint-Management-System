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
import img2 from "../../images/Dirty_classroom.jpg";
import img1 from "../../images/Dustbin_overflow.jpeg";

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
      setComplaints(data.complaints);
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Failed to fetch complaints");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

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
      <div className="flex justify-between px-3 mb-5">
        <h2 className="text-2xl font-bold underline">Manage the Complaints</h2>

        <div className="flex gap-15 items-center">
          <div className="relative w-full max-w-md">
            <IoSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl pointer-events-none" />

            <input
              type="text"
              placeholder="Search complaints by location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className=" w-125 pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-full shadow-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-green-200 focus:border-green-500  transition-all duration-300 hover:shadow-lg"
            />
          </div>

          <div className="bg-purple-400 rounded-full p-2 ">
            <span
              className="text-2xl cursor-pointer"
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              <PiSortAscendingFill className="text-4xl" />
            </span>
          </div>
        </div>
      </div>

      {hovering && (
        <p className="fixed right-2 top-32 text-sm bg-white p-2 rounded shadow">
          Sort according to date
        </p>
      )}

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">All Complaints</h2>

        <table className="w-full border text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Image</th>
              <th className="p-2">Title</th>
              <th className="p-2">Location</th>
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredComplaints.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No complaints found
                </td>
              </tr>
            ) : (
              filteredComplaints.map((c) => (
                <tr key={c._id} className="border-t">
                  <td className="p-2">
                    <button
                      onClick={() => {
                        console.log("Stored image path:", c.image);
                        const imageUrl = `http://localhost:5000/${c.image.replace(/\\/g, "/")}`;
                        console.log("Final URL:", imageUrl);
                        setSelectedImage(imageUrl);
                      }}
                      className="text-blue-600 underline"
                    >
                      View Image
                    </button>
                  </td>

                  <td className="p-2 " onClick={() => navigate(`/admin/complaints/${c._id}`)} style={{ cursor: "pointer" }}>
                    {c.title}
                  </td>
                  <td className="p-2">{c.location}</td>

                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        c.status === "Pending"
                          ? "bg-yellow-500"
                          : c.status === "Completed"
                            ? "bg-green-500"
                            : "bg-blue-500"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>

                  <td className="p-2 flex gap-2">
                    <button
                      onClick={() => handleAssignClick(c)}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      <MdAssignmentAdd />
                    </button>
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
                      onClick={() => handleUpdate(c._id, c.status)}
                    >
                      <MdOutlineFeedback />
                    </button>

                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                      onClick={() => handleDelete(c._id)}
                    >
                      <MdDeleteOutline />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      {selectedImage && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-xl">
            <img
              src={selectedImage}
              alt="Complaint"
              className="max-w-lg max-h-[80vh] object-contain rounded"
            />

            <button
              onClick={() => setSelectedImage(null)}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
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
