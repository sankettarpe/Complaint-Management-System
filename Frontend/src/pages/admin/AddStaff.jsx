import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminLayout from "../../components/layout/AdminLayout";

const AddStaff = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const departmentRef = useRef();
  const designationRef = useRef();
  const statusRef = useRef();
  const imageRef = useRef();

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();

  const handleImageChange = () => {
    const file = imageRef.current.files[0];

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    imageRef.current.value = "";
    setPreview(null);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);

  try {
    const token = localStorage.getItem("token");

    const staffData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
      department: departmentRef.current.value,
      designation: designationRef.current.value,
      status: statusRef.current.value,
    };

    const { data } = await axios.post(
      "http://localhost:5000/api/admin/add-staff",
      staffData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(data.message);

    navigate("/admin/staff");

  } catch (error) {

    console.error(error);

    alert(
      error.response?.data?.message ||
      "Unable to add staff."
    );

  } finally {

    setLoading(false);

  }
};

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Add Staff Member
        </h1>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
          <input
            ref={nameRef}
            type="text"
            placeholder="Full Name"
            className="border rounded-lg p-3"
            required
          />

          <input
            ref={emailRef}
            type="email"
            placeholder="Email"
            className="border rounded-lg p-3"
            required
          />

          <input
            ref={phoneRef}
            type="text"
            placeholder="Mobile Number"
            className="border rounded-lg p-3"
            required
          />

          <select
            ref={departmentRef}
            className="border rounded-lg p-3"
            required
          >
            <option value="">Select Department</option>
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
            type="text"
            placeholder="Designation"
            className="border rounded-lg p-3"
          />

          <select ref={statusRef} className="border rounded-lg p-3">
            <option value="Available">Available</option>
            <option value="Busy">Busy</option>
            <option value="On Leave">On Leave</option>
          </select>

          <div className="md:col-span-2">
            <input
              ref={imageRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mb-3"
            />

            {preview && (
              <div>
                <img
                  src={preview}
                  alt="Preview"
                  className="w-40 h-40 rounded-lg object-cover border"
                />

                <button
                  type="button"
                  onClick={removeImage}
                  className="mt-3 text-red-600 hover:underline"
                >
                  Remove Image
                </button>
              </div>
            )}
          </div>

          <div className="md:col-span-2 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/admin/staff")}
              className="px-6 py-3 bg-gray-300 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
            >
              {loading ? "Adding..." : "Add Staff"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddStaff;
