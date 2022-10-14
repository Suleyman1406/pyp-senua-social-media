import React from 'react'

import Header from './header'
import Messages from './messagesArea'

import { Container } from '@mui/material'

function Index({currentChat, socket}) {
  
  return (
    <Container sx={{m: '0', p: '0', width: "100%"}}>
      <Header currentChat={currentChat}/>
      <Messages currentChat={currentChat} socket={socket}/>
    </Container>
  )
}

export default Index
