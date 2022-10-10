import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar";

const Root = () => {
  return (
    <div style={{ display: "flex", width: "90%", margin: "auto" }}>
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Root;
