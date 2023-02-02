import React from "react";

import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import DefPerson from "../../../../../images/defPerson.jpg";

function Index({ currentChat }) {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  return (
    <Container
      sx={{
        borderBottom: "1px solid rgb(0 0 0 / 10%)",
        p: 3,
        display: "flex",
        alignItems: "center",
      }}
    >
      <img
        src={
          currentChat.members[1]?._id === currentUser.id
            ? currentChat.members[0].profilePhotoURL
              ? "http://localhost:8080"+
                currentChat.members[0].profilePhotoURL
              : DefPerson
            : currentChat.members[1].profilePhotoURL
            ? "http://localhost:8080"+
              currentChat.members[1].profilePhotoURL
            : DefPerson
        }
        style={{ width: "50px", height: '50px', borderRadius: "50%" }}
      />
      <span style={{ fontSize: "20px", marginLeft: "30px" }}>
      {currentChat.members[0]?._id === currentUser.id ? currentChat.members[1].username : currentChat.members[0].username}
      </span>
      <div style={{ width: "100%", textAlign: "end" }}>
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </div>
    </Container>
  );
}

export default Index;
