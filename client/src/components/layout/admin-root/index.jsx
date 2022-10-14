import React from "react";
import { Outlet } from "react-router-dom";
import AdminAuthGuard from "../auth-guard/admin";

const AdminRoot = () => {
  return (
    <AdminAuthGuard>
      <Outlet />
    </AdminAuthGuard>
  );
};

export default AdminRoot;
