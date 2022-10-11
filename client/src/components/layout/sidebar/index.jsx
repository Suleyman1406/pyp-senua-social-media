import * as React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Person2Icon from "@mui/icons-material/Person2";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import { Link } from "react-router-dom";
import styles from "./sidebar.module.css";
import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import { blue } from "@mui/material/colors";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import LogoutIcon from "@mui/icons-material/Logout";
import { Typography } from "@mui/material";

const categories = [
  {
    id: "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    children: [
      { id: "Home", icon: <HomeIcon />, to: "/" },
      { id: "Chat", icon: <ChatIcon />, to: "/chat" },
      { id: "Profile", icon: <Person2Icon />, to: "/profile" },
      { id: "Friends", icon: <Diversity1Icon />, to: "/friends" },
    ],
  },
];

const item = {
  px: 5,
  py: 1.5,
  color: "#000",
  "&:hover, &:focus": {
    bgcolor: "#00798C",
    color: "white",
  },
};

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(blue[500]),
  backgroundColor: "#00798C",
  marginLeft: 10,
  borderRadius: 100,
  "&:hover": {
    backgroundColor: blue[900],
  },
}));

export default function Navigator(props) {
  const { ...other } = props;
  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding >
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: "#fff", py: 3 }}>
            <ListItem sx={{ py: 3, px: 3 }}>
              <img src={id} className={styles.image} alt="" />
              <p className={styles.name}>Username</p>
            </ListItem>
            {children.map(({ id: childId, icon, active, to }) => (
              <Link to={to} className={styles.route}>
                <ListItem disablePadding key={childId}>
                  <ListItemButton selected={active} sx={item}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography style={{ fontWeight: "bolder" }}>
                          {childId}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
            <ColorButton sx={{ mx: 5, my: 5, px: 7 }}>Senua</ColorButton>
            <ColorButton sx={{ mx: 5, mt: 44, px: 6, display: "block" }}>
              <LogoutIcon
                fontSize="small"
                style={{ position: "absolute", top: 7, left: 26 }}
              />
              Logout
            </ColorButton>
          </Box>
        ))}
      </List>
    </Drawer>
  );
}
