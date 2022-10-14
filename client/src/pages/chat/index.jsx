import React, { useEffect, useState } from "react";
import {io} from 'socket.io-client'

import ChatBody from "../../components/pages/chat/chatBody";
import Chats from "../../components/pages/chat/chats";

import Grid from "@mui/material/Grid";

const ChatPage = () => {
  const [socket, setSocket] = useState(null)

  useEffect(()=> {
    console.log("object")
    setSocket(io("ws://localhost:8900"))
  }, [])

  useEffect(()=> {
    socket?.on("welcome", message=> {
      console.log(message)
    })
  }, [socket])



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
