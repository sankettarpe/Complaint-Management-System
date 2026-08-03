import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const passwordRef = useRef();
  const confirmRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    const password = passwordRef.current.value;

    const confirmPassword = confirmRef.current.value;

    if (password !== confirmPassword) {
      setLoading(false);
      return setError("Passwords do not match.");
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        {
          password,
        },
      );

      setSuccess(response.data.message);

      passwordRef.current.value = "";

      confirmRef.current.value = "";

      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center  backgroundImage">
      <div className="relative bg-black/10 backdrop-blur-md p-8 rounded-2xl shadow-md w-{[350px]}">
        <h2 className="text-xl font-semibold mb-4 text-center text-white underline">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="password"
            placeholder="New Password"
            ref={passwordRef}
            required
            className="w-full rounded-xl border px-4 py-3 bg-transparent text-white"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            ref={confirmRef}
            required
            className="w-full rounded-xl border px-4 py-3 bg-transparent text-white"
          />

          {success && <p className="text-green-400">{success}</p>}

          {error && <p className="text-red-400">{error}</p>}

          <button
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-xl text-white disabled:bg-gray-500"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
