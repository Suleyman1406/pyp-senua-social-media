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
  const navigate = useNavigate()
  function profile() {
    navigate('/profile')
  }
  function addPost() {
    navigate('/profile')
  }
  function friends() {
    navigate('/friends')
  }
  function chat() {
    navigate('/chat')
  }
  function logOut() {
    navigate('/login')
  }
  return (
    <Box className={styles.box} sx={{ flexGrow: 1, }}>
      <AppBar position="static" >
        <Toolbar style={{ backgroundColor: '#00798C' , display:"flex", justifyContent:"space-around"}}>
          <Button color="inherit" onClick={profile}>Profile</Button>
          <Button color="inherit" onClick={addPost}>Add Post</Button>

          <Button color="inherit" onClick={friends}>Friends</Button>
          <Button color="inherit" onClick={chat}>Chat</Button>

          <Button color="inherit" onClick={logOut}>Log out</Button>

        </Toolbar>
      </AppBar>
    </Box>
  );
}
