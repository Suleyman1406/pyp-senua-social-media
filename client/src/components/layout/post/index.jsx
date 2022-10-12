import React, {useContext} from "react";
import {postModuleContext} from '../../../context/postModuleContext'

import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Button from "@mui/material/Button";

const styles = {
  module: {
    position: "absolute",
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "white",
    padding: "10px 0px",
    boxShadow: "0 4px 8px 0 rgb(0 0 0 / 10%)",
    width: "400px",
    borderRadius: "10px",
    zIndex: "10",
  },
  line: {
    height: "1px",
    backgroundColor: "rgb(0 0 0 / 10%)",
  },
  iconWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: 'center',
    padding: "6px 7px 6px 20px",
  },
  text: {
    border: "none",
    resize: "none",
    padding: "20px",
    width: "100%",
    height: "100px",
  },
  wrapper: {
    padding: "10px",
    display: "flex",
    justifyContent: "space-between",
  },
};

function Index() {

    const {setShow } = useContext(postModuleContext);

  return (
    <div style={styles.module}>
      <div style={styles.iconWrapper}>
        <h4 style={{margin: '0'}}>New Post</h4>
        <CloseIcon onClick={()=> setShow(false)} style={{cursor: 'pointer'}}/>
      </div>
      <hr style={styles.line} />
      <form style={styles.form}>
        <textarea placeholder="What is on your mind?..." style={styles.text} />
        <div style={styles.wrapper}>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <input hidden accept="image/*" type="file" />
            <PhotoCamera />
          </IconButton>
          <Button variant="contained">Share</Button>
        </div>
      </form>
    </div>
  );
}

export default Index;
