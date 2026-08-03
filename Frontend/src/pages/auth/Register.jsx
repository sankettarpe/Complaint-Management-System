import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const passwordRef = useRef();
  const checkboxRef = useRef();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
      password: passwordRef.current.value,
      acceptedPolicy: checkboxRef.current.checked,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData,
      );

      console.log(response.data);

      alert("Registered Successfully");

      localStorage.setItem("token", response.data.token);

      // Store User Information
      // localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: response.data.user.name,
          role: response.data.user.role,
        }),
      );

      nameRef.current.value = "";
      emailRef.current.value = "";
      phoneRef.current.value = "";
      passwordRef.current.value = "";
      checkboxRef.current.checked = false;

      navigate("/login"); // or navigate("/login")
    } catch (error) {
      console.error(error);

      const message = error.response?.data?.message || "Registration Failed";

      alert(message);
    }
  };

  const handlelogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center backgroundImage">
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative border p-10 {w-[350px]} text-center backdrop-blur-md rounded-2xl shadow-lg">
        <h3 className="py-3 text-xl font-semibold text-white underline">
          Create an Account
        </h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your Name"
            ref={nameRef}
            className="w-full mb-4 p-2 border rounded text-white"
            required
          />

          <input
            type="email"
            placeholder="Enter your Email"
            ref={emailRef}
            className="w-full mb-4 p-2 border rounded text-white"
            required
          />

          <input
            type="tel"
            placeholder="Enter your Mobile Number"
            ref={phoneRef}
            className="w-full mb-4 p-2 border rounded text-white"
            required
          />

          <input
            type="password"
            placeholder="Password"
            ref={passwordRef}
            className="w-full mb-4 p-2 border rounded text-white"
            required
          />

          <div className="flex items-center mb-4 text-left">
            <input
              type="checkbox"
              id="accept"
              ref={checkboxRef}
              className="mr-2"
              required
            />
            <label htmlFor="accept" className="text-sm p-2 text-white">
              I accept the Privacy Policy
            </label>
          </div>

          <button
            type="submit"
            className="w-1/2 bg-purple-500 text-white p-2 rounded hover:bg-purple-600 transition"
          >
            Create Account
          </button>
        </form>

        <p
          className="text-sm mt-4 text-white hover:underline"
          onClick={handlelogin}
        >
          Already have an account? Login
        </p>
      </div>
    </div>
  );
};

export default Register;
