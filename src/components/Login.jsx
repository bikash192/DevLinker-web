import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {addUser} from '../utils/userSlice'
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmailId] = useState("bkd18@gmail.com");
  const [password, setPassword] = useState("Bkd@1234");
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // prevent form refresh
    try {
      const res = await axios.post(BASE_URL+"/login", {
        email,
        password,
      },{
        withCredentials:true
      });
      dispatch(addUser(res.data));
    
      navigate('/feed');
      // console.log(res.data); 
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center m-10">
      <div className="card bg-base-200 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Developer Login</h2>

          {/* Use onSubmit on the form */}
          <form onSubmit={handleLogin}>
            {/* Email */}
            <div className="form-control">
              <label className="label mb-1" htmlFor="email">
                <span className="label-text">Email Address</span>
              </label>
              <input
                value={email}
                onChange={(e) => setEmailId(e.target.value)}
                type="email"
                id="email"
                placeholder="Enter your email"
                className="input input-bordered w-full px-4 py-3"
                required
              />
            </div>

            {/* Password */}
            <div className="form-control mt-4">
              <label className="label mb-1" htmlFor="password">
                <span className="label-text">Password</span>
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                placeholder="Enter your password"
                className="input input-bordered w-full px-4 py-3"
                required
              />
            </div>

            {/* Button */}
            <div className="card-actions mt-5">
              <button type="submit" className="btn btn-primary w-full">
                Login
              </button>
            </div>
          </form>

          {/* Sign Up Link */}
          <p className="text-sm text-center mt-4">
            Don’t have an account?{" "}
            <a href="/sign" className="text-primary hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
