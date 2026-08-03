import "bootstrap/dist/css/bootstrap.min.css";
// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import Layouts from "./components/layout/Layouts";
// import ResetPassword from "./pages/auth/ResetPassword";
// import Dashboard from "./pages/student/Dashboard";
// import AdminNavbar from "./pages/admin/AdminNavbar";
// import AdminSidebar from "./pages/admin/AdminSidebar";
// import ComplaintsListProvider from "./store/complaint-list-store";
import "./App.css";
function App() {
  return (
    <>
      {/* <h2 className='text-3xl mx-100'>Welcome to our Complaint Management System</h2> */}
      <Login/>
      {/* <Register/> */}
      {/* <Layouts></Layouts> */}
      {/* <ComplaintsListProvider>
        <Dashboard></Dashboard>
      </ComplaintsListProvider> */}
      {/* <AdminNavbar></AdminNavbar>
    <AdminSidebar></AdminSidebar> */}
    </>
  );
}

export default App;
