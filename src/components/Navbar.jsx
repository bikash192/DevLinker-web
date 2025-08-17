import React from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  console.log(user);

  return (
    <div>
      <div className="navbar bg-base-300 shadow-sm">
        {/* Left side: Logo */}
        <div className="flex-1 flex items-center">
          <a className="btn btn-ghost text-xl">DevLinker</a>
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
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
