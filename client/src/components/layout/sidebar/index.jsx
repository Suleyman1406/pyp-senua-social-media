import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import styles from "./sidebar.module.css";
import { styled } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const Sidebar = () => {
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(blue[800]),
    backgroundColor: blue[500],
    marginLeft:10,
    borderRadius: 100,
    "&:hover": {
      backgroundColor: blue[700],
    },
  }));

  const style = {
    width: "100%",
    maxWidth: 400,
    bgcolor: "salmon",
  };


  return (
    <>
      <List sx={style} component="nav" aria-label="mailbox folders">
        <div className={styles.profileWrapper}>
          <img
            className={styles.image}
            src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt=""
          />
          <p className={styles.name}>username</p>
        </div>
        <Link to="/" className={styles.route}>
          <ListItem button>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>
        <Link to="/chat" className={styles.route}>
          <ListItem button>
            <ListItemText primary="Chat" />
          </ListItem>
        </Link>
        <Link to="/profile" className={styles.route}>
          <ListItem button>
            <ListItemText primary="Profile" />
          </ListItem>
        </Link>
        <Link to="/friends" className={styles.route}>
          <ListItem button>
            <ListItemText primary="Friends" />
          </ListItem>
        </Link>
        <ColorButton>Add Post</ColorButton>
      <ColorButton>Logout</ColorButton>
      </List>
    </>
  );
};

export default Sidebar;
