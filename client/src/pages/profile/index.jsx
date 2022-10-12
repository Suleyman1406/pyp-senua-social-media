import { AccountCircle } from '@mui/icons-material';
import { Button, Divider, InputAdornment, TextField } from '@mui/material';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import React from 'react';
import style from './profile.module.css'
import { styled } from "@mui/material/styles";
import { blue } from '@mui/material/colors';
import { Link } from 'react-router-dom';


const Profile = () => {

    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(blue[500]),
        backgroundColor: "#00798C",
        marginLeft: 10,
        borderRadius: 10,
        "&:hover": {
          backgroundColor: blue[900],
        },
      }));


    return (
        <>
        <div>
            <div className={style.background}></div>
            <div className={style.imgWrapper}>
                <img className={style.image} src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" />
            </div>
            <div className={style.text}>
                <h3>Ebulfez Sadiqov</h3>
            </div>
            <div className={style.friend}>
                <div>
                <h4 style={{color:'blue'}}>4</h4>
                <h4><i>Friends</i></h4>
                </div>
                <div>
                    <Link to='/chat'>
                        <ColorButton>Chat</ColorButton>
                    </Link>
                </div>
            </div>
            <Divider style={{position:'relative',top:100}}/>
        </div>
            <div className={style.inputBox}>
                <TextField
                    label="Name"
                    className={style.input}
                    multiline
                    maxRows={4}
                    value="Fikret"
                    variant="standard"
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        ),
                      }}
                />

            </div>
            <div className={style.inputBox}>
            <TextField
                    label="Surname"
                    className={style.input}
                    multiline
                    maxRows={4}
                    value="Sadiqov"
                    variant="standard"
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        ),
                      }}
                />
            </div>
            <div className={style.inputBox}>
            <TextField
                    label="Email"
                    className={style.input}
                    multiline
                    maxRows={4}
                    value="fikret@gmail.com"
                    variant="standard"
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AttachEmailIcon fontSize='medium' />
                          </InputAdornment>
                        ),
                      }}
                />
            </div>
        </>
    )
}

export default Profile