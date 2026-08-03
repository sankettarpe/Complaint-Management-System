import axios from "axios";
import { useState } from "react";

const DeleteStaffModal = ({
  isOpen,
  onClose,
  staff,
  refreshStaff,
}) => {

  const [loading, setLoading] = useState(false);

  if (!isOpen || !staff) return null;

  const handleDelete = async () => {

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      const { data } = await axios.delete(
        `http://localhost:5000/api/admin/delete-staff/${staff._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(data.message);

      refreshStaff();

      onClose();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Unable to delete staff."
      );

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl p-8 w-full max-w-md">

        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Delete Staff
        </h2>

        <p className="text-gray-600 mb-6">
          Are you sure you want to delete
          <span className="font-semibold">
            {" "}
            {staff.name}
          </span>
          ?
        </p>

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-5 py-2 rounded bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-5 py-2 rounded bg-red-600 text-white"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default DeleteStaffModal;