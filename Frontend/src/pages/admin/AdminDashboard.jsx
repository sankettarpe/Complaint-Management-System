import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/common/Loader";
import AdminLayouts from "../../components/layout/AdminLayout";
import DashboardHeader from "../../components/Admin Comp/dashboard/DashboardHeader";
import StatsCards from "../../components/Admin Comp/dashboard/StatsCards";
import RecentComplaints from "../../components/Admin Comp/dashboard/RecentComplaints";
import ComplaintChart from "../../components/Admin Comp/dashboard/ComplaintChart";
import CategoryChart from "../../components/Admin Comp/dashboard/CategoryChart";
import ActivityTimeline from "../../components/Admin Comp/dashboard/ActivityTimeline";
// import { MdOutlineFeedback } from "react-icons/md";
// import { MdDeleteOutline } from "react-icons/md";
// import { PiSortAscendingFill } from "react-icons/pi";
import img2 from "../../images/Dirty_classroom.jpg";
import img1 from "../../images/Dustbin_overflow.jpeg";

const AdminDashboard = () => {
  const [SelectedImage, setSelectedImage] = useState(null);
const [hovering, ishovering] = useState(false);
const [complaints, setComplaints] = useState([]);
const [stats, setStats] = useState({
  total: 0,
  pending: 0,
  inProgress: 0,
  completed: 0,
});
const [monthlyData, setMonthlyData] = useState([]);
const [categoryData, setCategoryData] = useState([]);
const [recentActivities, setRecentActivities] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        "http://localhost:5000/api/admin/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStats(data.stats);
      setComplaints(data.recentComplaints);
      setMonthlyData(data.monthlyData);
      setCategoryData(data.categoryData);
      setRecentActivities(data.activities);

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  fetchDashboard();
}, []);


if (loading) {
  return (
    <AdminLayouts>
      <h2 className="text-2xl font-semibold">
        <Loader/>
      </h2>
    </AdminLayouts>
  );
}
  return (
    <AdminLayouts>
      {/* <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2> */}
      
      <DashboardHeader/>
      <StatsCards stats={stats} />
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        <ComplaintChart data={monthlyData} />
        <CategoryChart data={categoryData} />
      </div>
      <div className="mb-8">
        <RecentComplaints complaints={complaints} />
      </div>
      <ActivityTimeline activities={recentActivities}/>

    </AdminLayouts>  
  );
};

export default AdminDashboard;
