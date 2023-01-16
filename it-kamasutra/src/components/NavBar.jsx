import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { checkIsAuth, logoutUser } from "../features/auth/authSlice";
import { Links } from "./links";
import "./NavBar.css";

const NavBar = () => {
  const isAuth = useSelector(checkIsAuth);
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = (link) => {
    if (link?.name === "Logout") {
      dispatch(logoutUser());
    }
  };

  return (
    <div className="navbar">
      {isAuth && (
        <div>
          {user?.username}
        </div>
      )}
      {Links.map((link) => {
        if (isAuth && !link.public) {
          return (
            <Link
              key={link.name}
              to={link.link}
              onClick={() => handleLogout(link)}
            >
              {link.name}
            </Link>
          );
        } else if (!isAuth && link.public) {
          return (
            <Link key={link.name} to={link.link}>
              {link.name}
            </Link>
          );
        }
      })}
    </div>
  );
};

export default NavBar;
