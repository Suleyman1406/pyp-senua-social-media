import React, {useContext} from "react";
import {postModuleContext} from '../../../context/postModuleContext'
import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar";
import Post from "../post";

const Root = () => {

  const { show } = useContext(postModuleContext);
  console.log(show)

  return (
    
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ width: "calc(100% - 270px)", marginLeft: "auto" }}>
          {
            show===true && (
              <Post />
            )
          }
          <Outlet />
        </div>
      </div>
  );
};

export default Root;
