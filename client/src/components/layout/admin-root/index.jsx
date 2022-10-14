import React from "react";
import { Outlet } from "react-router-dom";

const AdminRoot = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default AdminRoot;
