import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import ResetPassword from "./pages/auth/ResetPassword.jsx";
import ForgetPassword from "./pages/auth/ForgetPassword.jsx";
import Dashboard from "./pages/student/Dashboard.jsx";
import Layouts from "./components/layout/Layouts.jsx";
import SubmitComplaint from "./pages/student/SubmitComplaint.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import StaffData from "./pages/admin/StaffData.jsx";
import MyComplaints from "./pages/student/MyComplaints.jsx";
import AllComplaints from "./pages/admin/AllComplaints.jsx";
import ComplaintDetails from "./pages/admin/ComplaintDetails.jsx";
import AddStaff from "./pages/admin/AddStaff.jsx";
import Home from "./pages/Home/Home.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot-password",
    element: <ForgetPassword />,
  },
  {
    path: "/reset-password/:token",
    element: <ResetPassword />,
  },

  {
    path: "/user/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/user/submit-complaint",
    element: <SubmitComplaint />,
  },
  {
    path: "/user/my-complaints",
    element: <MyComplaints />,
  },

  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/admin/all-complaints",
    element: <AllComplaints />,
  },
  {
    path: "/admin/staff",
    element: <StaffData />,
  },
  {
    path: "/admin/add-staff",
    element: <AddStaff />,
  },
  {
    path: "/admin/complaints/:id",
    element: <ComplaintDetails />,
  },

  // {
  //   path: "/super-admin/dashboard",
  //   element: <SuperAdminDashboard />,
  // },
  // {
  //   path: "/super-admin/manage-admins",
  //   element: <ManageAdmins />,
  // },
  // {
  //   path: "/super-admin/admin-activity",
  //   element: <AdminActivity />,
  // },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </StrictMode>,
);
