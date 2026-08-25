import React, { useRef } from "react";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoArrowBackSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { useState } from "react";
import Loader from "../../components/common/Loader";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const EmailElement = useRef();
  const PasswordElement = useRef();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const UserInfo = {
      email: EmailElement.current.value,
      password: PasswordElement.current.value,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        UserInfo,
      );

      console.log(response.data);

      alert("Login Successfully");

      localStorage.setItem("token", response.data.token);

      localStorage.setItem("user", JSON.stringify(response.data.user));

      EmailElement.current.value = "";
      PasswordElement.current.value = "";

      if (response.data.user.role === "superadmin") {
        navigate("/super-admin/dashboard");
      } else if (response.data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } catch (error) {
      console.error(error);

      const message = error.response?.data?.message || "Login Failed";

      setError(message);
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleHomepage = () => {
    navigate("/");
  };

  const ResetPassword = () => {
    navigate("/forget-password");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center relative backgroundImage">
      <div className="absolute inset-0 bg-black/50"></div>

      <form
        onSubmit={handleSubmit}
        className="relative /90 backdrop-blur-md p-10 rounded-2xl shadow-md w-{[450px]}"
      >
        <p
          className="text-sm mt-2 text-center hover:underline cursor-pointer text-purple-200"
          onClick={handleHomepage}
        >
          <IoArrowBackSharp className="text-2xl" />
        </p>
        <h2 className="text-2xl font-bold mb-6 text-center underline pb-10 mx-10 text-white">
          User Login
        </h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <div className="flex items-center gap-2 ">
          <input
            type="email"
            placeholder="Email"
            ref={EmailElement}
            className="w-full mb-4 p-2 border rounded text-white"
            required
          />
          <span className="text-2xl text-white pb-4">
            <FaUser />
          </span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              ref={PasswordElement}
              className="w-full p-2 pr-12 border rounded text-white bg-transparent outline-none"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-lg hover:text-green-400 transition"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <span className="text-2xl text-white">
            <RiLockPasswordFill />
          </span>
        </div>

        <p className="text-sm text-right mt-2">
          <Link
            to="/forgot-password"
            className="text-blue-600 hover:underline"
            onClick={ResetPassword}
          >
            Forgot Password?
          </Link>
        </p>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? <Loader /> : "Login"}
        </button>

        <p
          className="text-sm mt-4 text-center hover:underline cursor-pointer text-white"
          onClick={handleRegister}
        >
          Don't have an account? Register
        </p>
      </form>
    </div>
  );
};

export default Login;
