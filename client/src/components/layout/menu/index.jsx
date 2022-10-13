import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import styles from "./menu.module.css"
import { useNavigate } from 'react-router-dom';
export default function Menu() {
  const navigate= useNavigate()
  function showSidebar(){
    console.log("loo");
  }
  function logOut(){
   navigate('/login')
  }
  return (
    <Box className={styles.box} sx={{ flexGrow: 1, }}>
      <AppBar position="static" >
        <Toolbar style={{backgroundColor:'#00798C'}}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2,  }}
          >
            <MenuIcon onClick={showSidebar}/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit" onClick={logOut}>Log out</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
