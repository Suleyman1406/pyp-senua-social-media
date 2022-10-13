import React, { useContext } from "react";
import { postModuleContext } from "../../../context/postModuleContext";
import { Outlet } from "react-router-dom";
import AuthGuard from "../auth-guard";
import Sidebar from "../sidebar";
import Post from "../post";
import { Toaster } from "react-hot-toast";

const Root = () => {
  const { show } = useContext(postModuleContext);

  return (
    <AuthGuard>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ width: "calc(100% - 270px)", marginLeft: "auto" }}>
          {show === true && <Post />}
          <Outlet />
        </div>
      </div>
      <Toaster />
    </AuthGuard>
  );
};

export default Root;
