import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoSearch } from "react-icons/io5";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AdminLayouts from "../../components/layout/AdminLayout";
import EditStaffModal from "./Staff List/EditStaffModal";
import DeleteStaffModal from "./Staff List/DeleteStaffModal";
import Pagination from "../../components/common/Pagination";
import Loader from "../../components/common/Loader";

const StaffData = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    fetchStaff();
  }, [currentPage, search, department]);

  const fetchStaff = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        "http://localhost:5000/api/admin/staff",
        {
          params: {
            page: currentPage,
            search,
            department,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setStaff(data.staff);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

    const handleEdit = (staff) => {
    setSelectedStaff(staff);
    setIsEditModalOpen(true);
  };
    const handleDeleteClick = (staff) => {
    setStaffToDelete(staff);
    setDeleteModalOpen(true);
  };

  if (loading) {
    return (
      <AdminLayouts>
        <div className="flex justify-center items-center h-[70vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600"></div>
        </div>
      </AdminLayouts>
    );
  }

  return (
    <AdminLayouts>
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Staff Management
            </h1>

            <p className="text-gray-500">
              Manage all maintenance staff members
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/add-staff")}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg font-semibold transition"
          >
            + Add Staff
          </button>
        </div>

        {staff.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            <h2 className="text-2xl font-semibold text-gray-600">
              No Staff Found
            </h2>

            <p className="text-gray-400 mt-2">Please add a staff member.</p>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-xl shadow p-5 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Search & Filter */}

                <div className="relative">
                  <IoSearch className="absolute left-3 top-3.5 text-gray-400 text-xl" />

                  <input
                    type="text"
                    placeholder="Search by name or Employee ID..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
                  />
                </div>

                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="border rounded-lg p-3 focus:ring-2 focus:ring-green-500"
                >
                  <option value="">All Departments</option>
                  <option value="Cleanliness">Cleanliness</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="Carpentry">Carpentry</option>
                  <option value="Gardening">Gardening</option>
                  <option value="Security">Security</option>
                  <option value="Others">Others</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-4 text-left">Staff</th>
                    <th className="p-4 text-left">Employee ID</th>
                    <th className="p-4 text-left">Department</th>
                    <th className="p-4 text-left">Status</th>
                    <th className="p-4 text-left">Assigned</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {staff.map((member) => (
                    <tr
                      key={member._id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                            {member.profileImage ? (
                              <img
                                src={member.profileImage}
                                alt={member.name}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                            ) : (
                              member.name.charAt(0)
                            )}
                          </div>

                          <div>
                            <p className="font-semibold">{member.name}</p>

                            <p className="text-gray-500 text-sm">
                              {member.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">{member.employeeId}</td>

                      <td className="p-4">{member.department}</td>

                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold

                                      ${
                                        member.status === "Available"
                                          ? "bg-green-100 text-green-700"
                                          : member.status === "Busy"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : "bg-red-100 text-red-700"
                                      }
                                      `}
                        >
                          {member.status}
                        </span>
                      </td>

                      <td className="p-4">
                        {member.assignedComplaints?.length || 0}
                      </td>

                      <td className="p-4">
                        <div className="flex justify-center gap-3" >
                          <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg" onClick={() => handleEdit(member)}>
                            <FaEdit />
                          </button>

                          <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg" onClick={() => handleDeleteClick(member)}>
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
        <EditStaffModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        staff={selectedStaff}
        refreshStaff={fetchStaff}
      />
      <DeleteStaffModal
      isOpen={deleteModalOpen}
      onClose={() => setDeleteModalOpen(false)}
      staff={staffToDelete}
      refreshStaff={fetchStaff}
    />
    </AdminLayouts>
  );
};

export default StaffData;
