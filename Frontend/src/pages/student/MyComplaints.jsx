import React, { useEffect, useState } from "react";
import Layouts from "../../components/layout/Layouts";
import axios from "axios";
import { toast } from "react-toastify";

const MyComplaints = () => {
  const [complaints, setComplaints] = useState([]);

  const userId = "123";

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:5000/api/complaints/my-complaints",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setComplaints(response.data.complaints);
      } catch (error) {
        console.error(error);

        toast.error(
          error.response?.data?.message || "Failed to fetch complaints",
        );
      }
    };

    fetchComplaints();
  }, []);

  return (
    <Layouts>
      <h1 className="text-2xl font-bold mb-6">My Complaints</h1>

      <div className="bg-white p-4 rounded shadow">
        {complaints.length === 0 ? (
          <p className="text-gray-500">No complaints found</p>
        ) : (
          <table className="w-full border text-left">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Title</th>
                <th className="p-2">Location</th>
                <th className="p-2">Status</th>
                <th className="p-2">Date</th>
              </tr>
            </thead>

            <tbody>
              {complaints.map((c) => (
                <tr key={c._id} className="border-t">
                  <td className="p-2">{c.title}</td>
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

                  <td className="p-2">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </td>
                  {/* <img
                    src={`http://localhost:5000/${c.image}`}
                    className="w-16 h-16 rounded object-cover"
                  /> */}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layouts>
  );
};

export default MyComplaints;
