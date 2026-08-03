import React, { useState } from "react";

const RecentComplaints = ({ complaints = [] }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-md p-6 mt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Recent Complaints</h2>

          <span className="text-sm text-gray-500">
            Showing latest {Math.min(5, complaints.length)} complaints
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Location</th>
                <th className="p-3 text-left">Priority</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {complaints.slice(0, 5).map((complaint) => (
                <tr
                  key={complaint._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3">
                    <button
                      onClick={() => {
                        console.log("Stored image path:", complaint.image);
                        const imageUrl = `http://localhost:5000/${complaint.image.replace(/\\/g, "/")}`;
                        console.log("Final URL:", imageUrl);
                        setSelectedImage(imageUrl);
                      }}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </button>
                  </td>

                  <td className="p-3 font-medium">{complaint.title}</td>

                  <td className="p-3">{complaint.category}</td>

                  <td className="p-3">{complaint.location}</td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        complaint.priority === "High"
                          ? "bg-red-100 text-red-700"
                          : complaint.priority === "Medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : complaint.priority === "Critical"
                              ? "bg-red-200 text-purple-700"
                              : "bg-green-100 text-green-700"
                      }`}
                    >
                      {complaint.priority}
                    </span>
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        complaint.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : complaint.status === "In Progress"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                      }`}
                    >
                      {complaint.status}
                    </span>
                  </td>

                  <td className="p-3">
                    {new Date(complaint.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-4">
            <img
              src={selectedImage}
              alt="Complaint"
              className="w-125 h-125object-contain rounded-lg"
              onLoad={() => console.log("Image loaded")}
              onError={(e) => {
                console.log("Image failed");
                console.log(selectedImage);
                console.log(e);
              }}
            />

            <button
              onClick={() => setSelectedImage(null)}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default RecentComplaints;
