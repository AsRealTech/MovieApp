import React from 'react';
import { Link } from "react-router-dom";

const LogoutButton = () => {
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    // For example, redirect to login page:
    window.location.href = "/login";
  };

  return <>
  <Link to="/account/dashboard">Dashboard</Link> <button className="btn btn-primary btn-sm" onClick={handleLogout}>Logout</button>;
  </>
};

export default LogoutButton;
