import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav
      style={{
        background: "#333",
        padding: "15px",
        marginBottom: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <h3 style={{ color: "white", margin: 0 }}>
          Vehicle Rental
        </h3>

        <Link
          to="/"
          style={{ color: "white", textDecoration: "none" }}
        >
          Home
        </Link>

        {token ? (
          <>
            <Link
              to="/add-rental"
              style={{ color: "white", textDecoration: "none" }}
            >
              Add Vehicle
            </Link>

            <button onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              style={{ color: "white", textDecoration: "none" }}
            >
              Login
            </Link>

            <Link
              to="/signup"
              style={{ color: "white", textDecoration: "none" }}
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;