import React from "react";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import DefPerson from "../../../../images/defPerson.jpg";


function Index() {
  return (
    <Container
      fixed
      sx={{
        position: 'fixed',
        zIndex: '2',
        overflowX: "hidden",
        overflowY: "auto",
        m: "0",
        width: "350px",
        height: "100vh",
        borderRight: "1px solid rgb(0 0 0 / 10%)",
        pt: 3,
        pb: 3
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
      <Paper
        component="form"
        sx={{ p: "9px 9px", mt: '20px', display: "flex", alignItems: "center", width: 300, cursor: "pointer" }}
      >
        <img src={DefPerson} style={{width: "50px", borderRadius: "50%"}}/>
        <span style={{fontSize: '20px', marginLeft: "20px"}}>username</span>
      </Paper>
    </Container>
  );
}

export default Index;
