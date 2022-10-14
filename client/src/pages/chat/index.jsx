import React, { useEffect, useState, useRef } from "react";
import {io} from 'socket.io-client'

import ChatBody from "../../components/pages/chat/chatBody";
import Chats from "../../components/pages/chat/chats";

import Grid from "@mui/material/Grid";

const ChatPage = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const socket = useRef(io("ws://localhost:8900"))
  const [currentChat, setCurrentChat] = useState()

  useEffect(()=> {
    socket?.current?.emit("addUser", currentUser.id)
    socket?.current.on("getUsers", users => {
      console.log("users",users)
    })
  }, [currentUser])

  return (
    <Grid container>
      <Grid item xs={4}>
        <Chats setCurrentChat={setCurrentChat}/>
      </Grid>
      <Grid item xs={8}>
        {
          currentChat ? <ChatBody currentChat={currentChat} socket={socket}/> : null
        }
        
      </Grid>
    </Grid>
  );
};

export default ChatPage;
