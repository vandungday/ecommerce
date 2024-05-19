import React from "react";
import Sidebar from "./components/Sidebar";
import "./admin.css";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Admin = () => {
  const navigate = useNavigate();
  const roleID = localStorage.getItem("roleID");
  useEffect(() => {
    if (roleID != 1) {
      navigate("/");
    }
  }, []);

  return (
    <div className="Admin">
      <div className="AdminGlass">
        <Sidebar></Sidebar>
        <Outlet></Outlet>
        {/* <RightSide></RightSide> */}
      </div>
    </div>
  );
};

export default Admin;
