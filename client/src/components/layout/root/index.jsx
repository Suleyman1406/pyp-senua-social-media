import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar";

const Root = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ width: "calc(100% - 270px)", marginLeft: "auto" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
