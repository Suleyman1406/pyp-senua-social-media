import React from "react";

import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import DefPerson from "../../../../../images/defPerson.jpg";

function Index() {
  return (
    <Container
      sx={{
        borderBottom: "1px solid rgb(0 0 0 / 10%)",
        p: 3,
        display: "flex",
        alignItems: "center",
      }}
    >
      <img src={DefPerson} style={{ width: "50px", borderRadius: "50%" }} />
      <span style={{ fontSize: "20px", marginLeft: "30px" }}>username</span>
      <div style={{ width: "100%", textAlign: 'end' }}>
        <IconButton aria-label="delete" >
          <DeleteIcon />
        </IconButton>
      </div>
    </Container>
  );
}

export default Index;
