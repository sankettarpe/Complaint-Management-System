import { useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";

const ForgotPassword = () => {
  const emailRef = useRef();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const email = emailRef.current.value;

      const response = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        {
          email,
        },
      );

      setMessage(response.data.message);

      emailRef.current.value = "";
    } catch (err) {
      setError(err.response?.data?.message || "Unable to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center back backgroundImage">
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative bg-white/10 backdrop-blur-md p-15 rounded-2xl shadow-md w-{[550px]}">
        <h3 className="text-xl font-semibold mb-4 text-center text-white pb-3 underline">
          Forgot Password
        </h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <input
              type="email"
              ref={emailRef}
              placeholder="Enter your registered email"
              required
              className="w-full rounded-xl border px-12 py-3 bg-transparent text-white placeholder-gray-300 outline-none focus:border-green-500"
            />

            <MdOutlineMail className="absolute left-4 top-4 text-2xl text-white" />
          </div>

          {message && <p className="text-green-400 text-sm">{message}</p>}

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 transition text-white py-3 rounded-xl disabled:bg-gray-500"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-purple-800 hover:text-blue-400"
          >
            <FaArrowLeft />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
