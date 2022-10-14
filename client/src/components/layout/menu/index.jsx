import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import styles from "./menu.module.css";
import { useNavigate } from "react-router-dom";
export default function Menu() {
  const navigate = useNavigate();

  function goLogout() {
    navigate("/login");
  }
  function goProfile() {
    navigate("/profile");
  }
  function goFriends() {
    navigate("/friends");
  }
  function goChat() {
    navigate("/chat");
  }
  function goHome() {
    navigate("/");
  }
  return (
    <Box className={styles.box} sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ justifyContent: "space-around" }}>
        <Toolbar
          style={{ backgroundColor: "#00798C", justifyContent: "space-around" }}
        >
          <Button color="inherit" onClick={goHome}>
            Home
          </Button>
          <Button color="inherit" onClick={goProfile}>
            Profile
          </Button>
          <Button color="inherit" onClick={goFriends}>
            Friends
          </Button>
          <Button color="inherit" onClick={goChat}>
            Chat
          </Button>
          <Button color="inherit" onClick={goLogout}>
            Log out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
