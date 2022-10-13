import React from "react";

import { Container } from "@mui/material";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import DefPerson from "../../../../../images/defPerson.jpg";

function Index() {
  return (
    <Container sx={{ px: 3, position: "relative" }}>
      <div style={{ height: "75vh", padding: "10px 0", overflowY: "auto" }}>
        <Box
          sx={{
            mt: "20px",
          }}
        >
          <img
            src={DefPerson}
            style={{ width: "40px", borderRadius: "50%", marginRight: "10px", display: "inline-block"}}
          />
          <p
            style={{
              display: "inline-block",
              width: "300px",
              wordWrap: "breakWord",
              wordBreak: "break-word",
            }}
          >
            ksdufcbjsgfcsfbkabekusbrgfvaergfvakrfbjkaebfujreiwshdbaduavdudvwsauvduwvduavdua
            ksdufcbjsgfcsfbkabekusbrgfvaergfvakrfbjkaebfujreiwshdbaduavdudvwsauvduwvduavdua
            ksdufcbjsgfcsfbkabekusbrgfvaergfvakrfbjkaebfujreiwshdbaduavdudvwsauvduwvduavdua

          </p>
        </Box>
      </div>
      <Paper
        component="form"
        sx={{
          width: "100%",
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          borderRadius: "25px",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, pl: 1 }}
          placeholder="Message..."
          inputProps={{ "aria-label": "search google maps" }}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SendIcon />
        </IconButton>
      </Paper>
    </Container>
  );
}

export default Index;
