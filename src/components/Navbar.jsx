import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  // const dispatch=useDispatch();
  const user = useSelector((store) => store.user);
  console.log(user);
  // const handleLogout=async()=>{
  //   try{
  //     const res=await axios.post(BASE_URL+'/logout',{withCredentials:true})
  //     dispatch(removeUser(res));
  //   }catch(err){
  //     console.log(err);
  //   }
  // }

  return (
    <div>
      <div className="navbar bg-base-300 shadow-sm">
        {/* Left side: Logo */}
        <div className="flex-1 flex items-center">
          <Link to='/' className="btn btn-ghost text-xl">DevLinker</Link>
        </div>

        {/* Right side: Welcome + Avatar */}
        <div className="flex items-center gap-3 mx-3">
          {user && (
            <span className="text-lg font-semibold">
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
                <div className="w-10 rounded-full">
                  <img
                    alt="User Avatar"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              )}
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to='/profile' className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a >Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
