import React from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Navbar.module.css";

function Navbar(props) {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    props.setUserData(null);
    navigate("/login");
  };
  return (
    <header className={classes.header}>
      <h1>Auth</h1>
      <nav>
        <ul className="navbar">
          {props.userData ? (
            <>
              {" "}
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <Link className={classes.logout} onClick={logoutHandler}>
                Logout
              </Link>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
