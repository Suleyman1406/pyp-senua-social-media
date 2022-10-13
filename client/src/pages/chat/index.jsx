import React from "react";
import ChatBody from "../../components/pages/chat/chatBody";
import Chats from "../../components/pages/chat/chats";

import Grid from "@mui/material/Grid";

const ChatPage = () => {
  return (
    <Grid container>
      <Grid item xs={4}>
        <Chats />
      </Grid>
      <Grid item xs={8}>
        <ChatBody />
      </Grid>
    </Grid>
  );
};

export default ChatPage;
