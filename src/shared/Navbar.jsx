import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { NavLink, useNavigate } from "react-router-dom";
import { removeItem } from "../helpers/persistanceStore";
import { logoutUser } from "../slice/auth";

function Navbar() {
  const { loggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logoutUser());
    removeItem("token");
    navigate("auth/login");
  };

  return (
    <div className="header__head flex justify-between items-center px-4 py-4 border-b">
      <div className="header__head-logo">
        <NavLink to={"/"} className="text-2xl font-bold">
          logo
        </NavLink>
      </div>
      <nav className="header__head-nav">
        <ul className="flex items-center gap-3 text-lg font-semibold cursor-pointer">
          {loggedIn ? (
            <>
              <li>
                <span className="uppercase">{user.username}</span>
              </li>
              <li>
                <button className="uppercase  rounded-lg text-white bg-blue-700 p-1 px-4 active:scale-75 hover:bg-blue-400">
                  <NavLink to={"/create-articles"}> create articles</NavLink>
                </button>
              </li>
              <li>
                <button
                  onClick={logoutHandler}
                  className="uppercase  rounded-lg text-white bg-red-600 p-1 px-4 active:scale-75 hover:bg-red-400"
                >
                  logout
                </button>
              </li>
            </>
          ) : (
            <>
              {" "}
              <li>
                <NavLink to={"/auth/login"}>login</NavLink>
              </li>
              <li>
                <NavLink to={"/auth/register"}>register</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
