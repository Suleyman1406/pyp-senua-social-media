import React, { useContext } from "react";
import { postModuleContext } from '../../../context/postModuleContext'
import { Outlet } from "react-router-dom";
import AuthGuard from "../auth-guard";
import Sidebar from "../sidebar";
import Menu from "../menu";
import Post from "../post";
import useMediaQuery from '@mui/material/useMediaQuery';
import styles from "./root.module.css"
const Root = () => {

  const { show } = useContext(postModuleContext);
  const matches = useMediaQuery('(min-width:900px)');
  return (
    <AuthGuard>
      {!matches && <Menu />}
      <div style={{ display: "flex" }}>

        {matches && <Sidebar />}

        <div className={matches?styles.container:''}>
          {
            show === true && (
              <Post />
            )
          }
          <Outlet />
        </div>
      </div>
    </AuthGuard>
  );
};

export default Root;
