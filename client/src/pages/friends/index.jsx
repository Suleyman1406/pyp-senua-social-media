import React from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SingleUser from "components/pages/single-user/SingleUser";

const FriendsPage = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" style={{height:'90vh',backgroundColor:'#eff3f4',marginTop:'20px'}}>
        <Stack style={{marginTop:'40px',marginLeft:'20px'}} spacing={2} direction="row">
      <Button style={{width:'250px'}} size="large" variant="outlined">Add Friends</Button>
      <Button style={{width:'250px'}} size="large" variant="contained">Requests</Button>
    </Stack>
    <Container maxWidth="sm" style={{height:'70vh',backgroundColor:'#fff',marginTop:'20px'}}>
<SingleUser/>
    </Container>
      </Container>
    </React.Fragment>
  );
};

export default FriendsPage;
