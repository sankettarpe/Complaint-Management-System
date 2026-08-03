import React from 'react'
import {Link, useNavigate} from "react-router-dom"
import { BiSolidFoodMenu } from "react-icons/bi";


const Sidebar = () => {

  const Navigate = useNavigate()
  const handleLogout = () =>{
    alert("Logout Successfully")
    Navigate("/login")
  }

  return (
     <div className="w-64 sticky top-0 h-screen bg-gray-800 text-white flex flex-col p-4 ">
      
      <div className='flex gap-2'>
        <BiSolidFoodMenu className='text-3xl text-white'/>
      <h3 className="text-xl font-semibold mb-6">
        Menu
      </h3>
      </div>
      <div className='bg-gray-400 h-0.5 mt-3 w-full'></div>

      <Link to="/user/dashboard" className="mb-3  mt-4 hover:bg-gray-700 p-2 rounded text-white text-decoration-none text-xl hover:underline">
        Dashboard
      </Link>

      <Link to="/user/submit-complaint" className="mb-3 hover:bg-gray-700 p-2 rounded text-white text-xl text-decoration-none">
        Submit Complaint
      </Link>

      <Link to="/user/my-complaints" className="mb-3 hover:bg-gray-700 p-2 rounded text-white text-xl text-decoration-none">
        My Complaints
      </Link>

      {/* <Link to="/login" className="mt-auto bg-red-500 text-center p-2 rounded text-white text-decoration-none">
        Logout
      </Link> */}
      <button  className="mt-auto bg-red-500 text-center p-2 rounded text-white text-decoration-none" onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Sidebar