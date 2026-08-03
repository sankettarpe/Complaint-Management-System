import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layouts from "../../components/layout/Layouts";
import { PiSortAscendingFill } from "react-icons/pi";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();

  const [hovering, setHovering] = useState(false);

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
  });

  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:5000/api/complaints/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStats(response.data.stats);
        setComplaints(response.data.recentComplaints);

      } catch (error) {
        console.error(error);

        if (error.response?.status === 401) {
          localStorage.clear();
          navigate("/login");
        }
      }
    };

    fetchDashboard();
  }, [navigate]);

  return (
    <Layouts>

      <div className="flex justify-between px-3 mb-5">

        <h2 className="text-2xl font-bold underline">
          Dashboard
        </h2>

        <div className="bg-purple-500 rounded-full p-2">

          <span
            className="text-4xl cursor-pointer"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            <PiSortAscendingFill />
          </span>

        </div>

      </div>

      {hovering && (
        <p className="fixed right-2 top-32 bg-white shadow rounded p-2 text-sm">
          Sort According To Date
        </p>
      )}

      <div className="grid grid-cols-4 gap-4 mb-6">

        <div className="bg-white p-4 rounded shadow">
          <h3>Total</h3>
          <p className="text-xl font-bold">{stats.total}</p>
        </div>

        <div className="bg-yellow-100 p-4 rounded shadow">
          <h3>Pending</h3>
          <p className="text-xl font-bold">{stats.pending}</p>
        </div>

        <div className="bg-blue-100 p-4 rounded shadow">
          <h3>In Progress</h3>
          <p className="text-xl font-bold">{stats.inProgress}</p>
        </div>

        <div className="bg-green-100 p-4 rounded shadow">
          <h3>Completed</h3>
          <p className="text-xl font-bold">{stats.completed}</p>
        </div>

      </div>

      <div className="bg-white p-4 rounded shadow">

        <h2 className="text-lg font-semibold mb-4">
          Recent Complaints
        </h2>

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

            {complaints.length === 0 ? (

              <tr>

                <td
                  colSpan="4"
                  className="text-center p-5"
                >
                  No complaints found.
                </td>

              </tr>

            ) : (

              complaints.map((c) => (

                <tr key={c._id} className="border-t">

                  <td className="p-2">
                    {c.title}
                  </td>

                  <td className="p-2">
                    {c.location}
                  </td>

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

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      <button
        onClick={() => navigate("/user/submit-complaint")}
        className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Submit Complaint
      </button>

    </Layouts>
  );
};

export default Dashboard;