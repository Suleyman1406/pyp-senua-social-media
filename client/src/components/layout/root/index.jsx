import React from "react";
import { Outlet } from "react-router-dom";
import AuthGuard from "../auth-guard";
import Sidebar from "../sidebar";

const Root = () => {
  return (
    <AuthGuard>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ width: "calc(100% - 270px)", marginLeft: "auto" }}>
          <Outlet />
        </div>
      </div>
    </AuthGuard>
  );
};

export default Root;
