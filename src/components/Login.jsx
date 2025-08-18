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
  const [email, setEmailId] = useState("bkd18@gmail.com");
  const [password, setPassword] = useState("Bkd@1234");
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

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Glassmorphism Card */}
      <div className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl rounded-2xl p-8 w-full max-w-md transition-transform hover:scale-[1.01]">
        {/* Logo / Branding */}
        <h1 className="text-4xl font-extrabold text-center text-white drop-shadow">
          DevLinker
        </h1>
        <p className="text-gray-200 text-center text-sm mb-8 tracking-wide">
          Developer Login
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-xs text-gray-200 mb-1" htmlFor="email">
              Email Address
            </label>
            <input
              value={email}
              onChange={(e) => setEmailId(e.target.value)}
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              className="block text-xs text-gray-200 mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold hover:scale-[1.03] transition-transform shadow-lg py-2 text-sm"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-white/30"></div>
          <span className="px-3 text-xs text-gray-200">OR</span>
          <div className="flex-1 h-px bg-white/30"></div>
        </div>

        {/* Sign Up CTA */}
        <p className="text-sm text-center text-gray-200">
          Don’t have an account?{" "}
          <a
            href="/sign"
            className="text-pink-400 font-semibold hover:underline hover:text-pink-300 transition"
          >
            Sign Up
          </a>
        </p>
      </div>

      {/* ✅ Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default Login;
