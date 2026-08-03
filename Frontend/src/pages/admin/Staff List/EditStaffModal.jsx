import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const EditStaffModal = ({
  isOpen,
  onClose,
  staff,
  refreshStaff,
}) => {
  const [loading, setLoading] = useState(false);

  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const departmentRef = useRef();
  const designationRef = useRef();
  const statusRef = useRef();

  useEffect(() => {
    if (staff && nameRef.current) {
      nameRef.current.value = staff.name || "";
      emailRef.current.value = staff.email || "";
      phoneRef.current.value = staff.phone || "";
      departmentRef.current.value = staff.department || "";
      designationRef.current.value = staff.designation || "";
      statusRef.current.value = staff.status || "Available";
    }
  }, [staff]);

  if (!isOpen || !staff) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const payload = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        phone: phoneRef.current.value,
        department: departmentRef.current.value,
        designation: designationRef.current.value,
        status: statusRef.current.value,
      };

      const { data } = await axios.put(
        `http://localhost:5000/api/admin/update-staff/${staff._id}`,
        payload,
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
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Unable to update staff."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-8">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            Edit Staff Member
          </h2>

          <button
            onClick={onClose}
            className="text-2xl"
          >
            ✕
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-5"
        >

          <input
            ref={nameRef}
            className="border rounded-lg p-3"
            placeholder="Full Name"
            required
          />

          <input
            ref={emailRef}
            type="email"
            className="border rounded-lg p-3"
            placeholder="Email"
            required
          />

          <input
            ref={phoneRef}
            className="border rounded-lg p-3"
            placeholder="Phone"
            required
          />

          <select
            ref={departmentRef}
            className="border rounded-lg p-3"
            required
          >
            <option value="Cleanliness">Cleanliness</option>
            <option value="Electrical">Electrical</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Carpentry">Carpentry</option>
            <option value="Gardening">Gardening</option>
            <option value="Security">Security</option>
            <option value="Others">Others</option>
          </select>

          <input
            ref={designationRef}
            className="border rounded-lg p-3"
            placeholder="Designation"
          />

          <select
            ref={statusRef}
            className="border rounded-lg p-3"
          >
            <option value="Available">Available</option>
            <option value="Busy">Busy</option>
            <option value="On Leave">On Leave</option>
          </select>

          <div className="md:col-span-2 flex justify-end gap-4 mt-6">

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-lg bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-500"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default EditStaffModal;