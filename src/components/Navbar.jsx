import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="navbar bg-gray-900 shadow-lg px-6">
        {/* Left side: Logo */}
        <div className="flex-1 flex items-center">
          <Link
            to="/"
            className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-indigo-400 via-purple-400 to-yellow-400 bg-clip-text text-transparent hover:scale-105 transition-transform"
          >
            Dev<span className="text-yellow-400">Linker</span>
          </Link>
        </div>

        {/* Right side: Welcome + Avatar */}
        <div className="flex items-center gap-3 mx-3">
          {user && (
            <span className="text-lg font-semibold text-white">
              Welcome, {user.firstName}!
            </span>
          )}

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              {user && (
                <div className="w-10 rounded-full ring ring-yellow-400 ring-offset-2 ring-offset-gray-900">
                  <img alt="User Avatar" src={user.photoUrl} />
                </div>
              )}
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  
                </Link>
              </li>
              <li>
                <Link to="/connections">
                Connections
                </Link>
              </li>
              <li>
                <Link to='/request'>
                Requests
                </Link>
              </li>
              <li>
                <Link to='/feed'>
                Feed
                </Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
