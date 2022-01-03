import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const token = localStorage.Token;
  const navigate = useNavigate();

  return (
    <div>
      <nav className="#673ab7 deep-purple" style={{ padding: "0px 50px" }}>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo left">
            Quote-Apps
          </Link>
          <ul id="nav-mobile" className="right">
            {token ? (
              <>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/Createquote ">Create Quote</Link>
                </li>
                <li>
                  <button
                    className="btn red"
                    onClick={() => {
                      localStorage.removeItem("Token");
                      navigate("/login");
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Signup</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
