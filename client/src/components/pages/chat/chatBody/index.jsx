import React from 'react'

import Header from './header'
import Messages from './messagesArea'

import { Container } from '@mui/material'

function index() {
  return (
    <Container sx={{m: '0', p: '0', width: "100%"}}>
      <Header/>
      <Messages/>
    </Container>
  )
}

export default index
