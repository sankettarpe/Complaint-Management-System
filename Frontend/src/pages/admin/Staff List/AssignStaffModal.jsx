import React, { useEffect, useState } from "react";
import axios from "axios";

const AssignStaffModal = ({
  complaint,
  onClose,
  onAssigned,
}) => {
  const [staff, setStaff] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchAvailableStaff();
  }, []);

  const fetchAvailableStaff = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/staff",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const availableStaff = response.data.staff.filter(
        (member) => member.status === "Available"
      );

      setStaff(availableStaff);

    } catch (error) {
      console.error(error);
      alert("Unable to fetch staff");
    }
  };

  const handleAssign = async () => {
    if (!selectedStaff) {
      return alert("Please select a staff member");
    }

    try {
      setLoading(true);

      await axios.put(
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

      alert("Staff assigned successfully");

      onAssigned();

      onClose();

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Unable to assign staff"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl shadow-xl w-125 p-6">

        <h2 className="text-2xl font-bold mb-6">
          Assign Staff
        </h2>

        <div className="space-y-4">

          <div>
            <label className="font-semibold">
              Complaint
            </label>

            <input
              value={complaint.title}
              disabled
              className="w-full border rounded p-2 mt-1 bg-gray-100"
            />
          </div>

          <div>
            <label className="font-semibold">
              Category
            </label>

            <input
              value={complaint.category}
              disabled
              className="w-full border rounded p-2 mt-1 bg-gray-100"
            />
          </div>

          <div>
            <label className="font-semibold">
              Priority
            </label>

            <input
              value={complaint.priority}
              disabled
              className="w-full border rounded p-2 mt-1 bg-gray-100"
            />
          </div>

          <div>
            <label className="font-semibold">
              Select Staff
            </label>

            <select
              className="w-full border rounded p-2 mt-1"
              value={selectedStaff}
              onChange={(e) =>
                setSelectedStaff(e.target.value)
              }
            >
              <option value="">
                Select Staff
              </option>

              {staff.map((member) => (
                <option
                  key={member._id}
                  value={member._id}
                >
                  {member.name} ({member.department})
                </option>
              ))}
            </select>
          </div>

        </div>

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={handleAssign}
            className="px-5 py-2 rounded bg-green-600 text-white hover:bg-green-700"
          >
            {loading
              ? "Assigning..."
              : "Assign Staff"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default AssignStaffModal;