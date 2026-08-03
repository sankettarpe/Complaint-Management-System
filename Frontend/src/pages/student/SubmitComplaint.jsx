//import { ComplaintsList } from "../../store/complaint-list-store";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Layouts from "../../components/layout/Layouts";

const SubmitComplaint = () => {
  // const {addComplaint} = useContext(ComplaintsList)
  const [complaints, setComplaints] = useState([]);

  const titleRef = useRef();
  const descRef = useRef();
  const locationRef = useRef();
  const imageRef = useRef();
  const categoryRef = useRef();
 // const buildingRef = useRef();
  const priorityRef = useRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState(null);

  const handleImageChange = () => {
    const file = imageRef.current.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed.");

      imageRef.current.value = "";

      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image should be less than 5 MB.");

      imageRef.current.value = "";

      return;
    }

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", titleRef.current.value);
    formData.append("description", descRef.current.value);
    formData.append("category", categoryRef.current.value);
   // formData.append("building", buildingRef.current.value);
    formData.append("location", locationRef.current.value);
    formData.append("priority", priorityRef.current.value);

    if (imageRef.current.files[0]) {
      formData.append("image", imageRef.current.files[0]);
    }
    setLoading(true);

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/complaints/submit",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(response.data);

      toast.success("Complaint submitted successfully!");

      titleRef.current.value = "";
      descRef.current.value = "";
      categoryRef.current.value = "";
      // buildingRef.current.value = "";
      locationRef.current.value = "";
      priorityRef.current.value = "";
      imageRef.current.value = "";
      setPreview(null);
      navigate("/user/my-complaints");
    } catch (error) {
      console.error("Error submitting complaint:", error);

      toast.error(
        error.response?.data?.message || "Failed to submit complaint.",
      );
    } finally {
      setLoading(false);
    }
  };

  const removeImage = () => {
    imageRef.current.value = "";

    setPreview(null);
  };

  return (
    <Layouts>
      <div className="bg-gray-200 min-h-screen p-3">
        <div className=" bg-gray-100 "></div>
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Submit Complaint</h1>

          <p className="text-gray-500 mt-2">
            Report any cleanliness or maintenance issue around the campus.
          </p>
        </div>

        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-8 p-10"
          >
            <div>
              <label className="block mb-2 font-semibold">
                Complaint Title
              </label>

              <input
                type="text"
                ref={titleRef}
                placeholder="Enter complaint title"
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-2 font-semibold">Description</label>

              <textarea
                rows="5"
                ref={descRef}
                placeholder="Describe your complaint..."
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none resize-none"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Category</label>

              <select
                ref={categoryRef}
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500"
              >
                <option value="">Choose Category</option>

                <option>Cleanliness</option>

                <option>Electricity</option>

                <option>Water Supply</option>

                <option>Furniture</option>

                <option>Infrastructure</option>

                <option>Internet</option>

                <option>Other</option>
              </select>
            </div>

            {/* <div>
              <label className="block mb-2 font-semibold">Building</label>

              <select
                ref={buildingRef}
                className="w-full border rounded-xl px-4 py-3"
              >
                <option value="">Select Building</option>

                <option>Academic Block</option>

                <option>Library</option>

                <option>Canteen</option>

                <option>Admin Building</option>

                <option>Boys Hostel</option>

                <option>Girls Hostel</option>
              </select>
            </div> */}
            <div>
              <label className="block mb-2 font-semibold">Location</label>

              <input
                type="text"
                ref={locationRef}
                placeholder="Example: Room 203"
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Priority</label>

              <select
                ref={priorityRef}
                className="w-full border rounded-xl px-4 py-3"
              >
                <option>Low</option>

                <option>Medium</option>

                <option>High</option>

                <option>Critical</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block mb-3 font-semibold">
                Upload Evidence
              </label>

              <div className="border-2 border-dashed border-green-400 rounded-xl p-8 text-center">
                <input
                  type="file"
                  accept="image/*"
                  ref={imageRef}
                  onChange={handleImageChange}
                  className="mb-4"
                />

                <p className="text-gray-500">
                  Supported formats: JPG, PNG, JPEG
                </p>
              </div>
            </div>

            {preview && (
              <div className="md:col-span-2">
                <h3 className="font-semibold mb-3">Preview</h3>

                <div className="relative w-60">
                  <img src={preview} className="rounded-xl shadow-lg" />

                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full px-3 py-1"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-linear-to-r from-green-600 to-emerald-500 text-white font-semibold text-lg hover:scale-105 transition duration-300 disabled:opacity-50 flex justify-center items-center gap-3"
              >
                {loading && (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                )}

                {loading ? "Submitting..." : "Submit Complaint"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layouts>
  );
};

export default SubmitComplaint;
