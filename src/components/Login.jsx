import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

// ✅ Toastify
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ Background image
import bgImage from "../assets/bg.jpg";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { email, password },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));

      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate("/feed");
      }, 2000);
    } catch (err) {
      const message = err?.response?.data?.message || "Invalid credentials";
      toast.error(message, {
        position: "top-right",
        autoClose: 3000,
      });
      console.error(err);
    }
  };
 const handleSignUp = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(
      BASE_URL + "/sign",
      { firstName, lastName, email, password },
      { withCredentials: true }
    );

    dispatch(addUser(res.data.data));
    toast.success("Account created successfully!", {
      position: "top-right",
      autoClose: 2000,
    });

    return navigate("/profile");
  } catch (err) {
    // ✅ Extract error message
    const message =
      err?.response?.data?.message || err?.response?.data || "Something went wrong";
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
    });
    console.error("Signup error:", err);
  }
};


  return (
    <div
  className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
  style={{ backgroundImage: `url(${bgImage})` }}
>
  {/* Glassmorphism Card */}
  <div className="backdrop-blur-2xl bg-white/10 border border-white/20 shadow-2xl 
                  rounded-2xl p-8 w-full max-w-md text-white relative overflow-hidden
                  max-h-[90vh] overflow-y-auto">
    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl"></div>

    <div className="relative z-10">
      {/* Branding */}
      <h1 className="text-3xl font-extrabold text-center text-white drop-shadow-lg mb-1">
        DevLinker
      </h1>
      <p className="text-gray-200 text-center text-xs mb-6 tracking-wide">
        {login ? "Developer Login" : "Create New Developer Account"}
      </p>

      {/* Form */}
      <form onSubmit={login?handleLogin:handleSignUp} className="space-y-4">
        {!login && (
          <>
            {/* FirstName */}
            <div>
              <label className="block text-xs font-semibold text-white mb-1">
                First Name
              </label>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                placeholder="Enter your First Name"
                className="w-full px-3 py-2 rounded-lg bg-white text-gray-900 text-sm
                           placeholder-gray-500 border border-gray-300 shadow-sm 
                           focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
              />
            </div>

            {/* LastName */}
            <div>
              <label className="block text-xs font-semibold text-white mb-1">
                Last Name
              </label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                placeholder="Enter your Last Name"
                className="w-full px-3 py-2 rounded-lg bg-white text-gray-900 text-sm
                           placeholder-gray-500 border border-gray-300 shadow-sm 
                           focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
              />
            </div>
          </>
        )}

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-white mb-1">
            Email Address
          </label>
          <input
            value={email}
            onChange={(e) => setEmailId(e.target.value)}
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 rounded-lg bg-white text-gray-900 text-sm
                       placeholder-gray-500 border border-gray-300 shadow-sm 
                       focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-semibold text-white mb-1">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
            className="w-full px-3 py-2 rounded-lg bg-white text-gray-900 text-sm
                       placeholder-gray-500 border border-gray-300 shadow-sm 
                       focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        {/* Login/Signup Button */}
        <button
          type="submit"
          className="cursor-pointer w-full rounded-lg bg-gradient-to-r 
                     from-indigo-500 via-purple-500 to-pink-500 text-white 
                     font-semibold hover:scale-[1.02] transition-transform 
                     shadow-lg py-2.5 text-sm"
        >
          {login ? "Login" : "Sign Up"}
        </button>
      </form>

      {/* Toggle CTA */}
      <p
        onClick={() => setLogin((value) => !value)}
        className="mt-4 text-xs text-center text-black hover:text-pink-700-300 cursor-pointer transition"
      >
        {login ? "New Developer? Sign Up here" : "Existing Developer? Login here"}
      </p>
    </div>
  </div>

  {/* Toast Container */}
  <ToastContainer />
</div>

  );
};

export default Login;
