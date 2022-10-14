import React, { useEffect, useState } from "react";
import axios from "axios";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import DefPerson from "../../../../images/defPerson.jpg";

function Index({setCurrentChat}) {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const [conversations, setConversations] = useState();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}/api/conversations`, {
        headers: {
          "x-access-token": currentUser?.token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => setConversations(res.data));
  }, []);

  return (
    <Container
      fixed
      sx={{
        position: "fixed",
        zIndex: "2",
        overflowX: "hidden",
        overflowY: "auto",
        m: "0",
        width: "350px",
        height: "100vh",
        borderRight: "1px solid rgb(0 0 0 / 10%)",
        pt: 3,
        pb: 3,
      }}
    >
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          mb: "40px",
          display: "flex",
          alignItems: "center",
          width: 300,
          borderRadius: "25px",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search..."
          inputProps={{ "aria-label": "search google maps" }}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      {conversations && conversations.map((conv) => (
        <Paper
          key={conv.id}
          sx={{
            p: "9px 9px",
            mt: "20px",
            display: "flex",
            alignItems: "center",
            width: 300,
            cursor: "pointer",
            border: "1px solid rgb(0 0 0 / 10%)",
          }}
          onClick={()=> setCurrentChat(conv)}
        >
          {console.log(conversations)}
          <img src={
            
            conv.members[1]._id === currentUser.id 
            ? (conv.members[1].profilePhotoURL ? (process.env.REACT_APP_SERVER_BASE_URL+conv.members[1].profilePhotoURL) : DefPerson) 
            : (conv.members[0].profilePhotoURL ? (process.env.REACT_APP_SERVER_BASE_URL+conv.members[0].profilePhotoURL) : DefPerson)} 
          style={{ width: "50px", borderRadius: "50%" }} />
          <span style={{ fontSize: "20px", marginLeft: "20px" }} >
            {conv.members[0]._id === currentUser.id ? conv.members[1].username : conv.members[0].username}
          </span>
        </Paper>
      ))}
    </Container>
  );
}

export default Index;
