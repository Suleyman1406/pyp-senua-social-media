import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useQuery } from 'react-query';
import  axios  from 'axios';
import { useEffect,useState } from "react";

export default function Invitation() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { isLoading, isError, data, error } = useQuery(
    "user-requests",
    async () => {
      const { data } = await axios.get("http://localhost:8080/api/requests/all", {
        headers: {
          "x-access-token": user?.token,
          "content-type": "application/json",
        },
      });
      return data;
    }
  );


  function AcceptReq(item) {
    const user = JSON.parse(localStorage.getItem("user"));
console.log("user id", item.id);
    axios
      .post(`http://localhost:8080/api/requests/confirm/${item.id}`,{}, {
        headers: {
          "x-access-token": user?.token,
          "content-type": "application/json",
        },
      })
      .then((res) =>console.log(res))
  }
    function IgnoreReq(item) {
    const user = JSON.parse(localStorage.getItem("user"));
console.log("user id", item.id);
    axios
      .post(`http://localhost:8080/api/requests/ignore/${item.id}`,{}, {
        headers: {
          "x-access-token": user?.token,
          "content-type": "application/json",
        },
      })
      .then((res) =>console.log(res))
  }


  return (
    <List sx={{ width: "100%", maxWidth: 500, bgcolor: "background.paper" }}>
{
  data?.map((item)=>{
    return (
      <>
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </ListItemAvatar>
      <ListItemText
        primary={item.username}
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {item.email}
            </Typography>
            <Typography
              sx={{}}
              component="span"
              variant="body2"
              color="text.primary"
              style={{display:'flex',justifyContent:'flex-end'}}
          
            >
            <Button size="small" style={{marginTop:'-30px',fontSize:'13px', textTransform:'capitalize'}} variant="contained" onClick={()=>AcceptReq(item)}>Accept</Button>
              
            </Typography>
            <Typography
              sx={{}}
              component="span"
              variant="body2"
              color="text.primary"
              style={{display:'flex',justifyContent:'center'}}
          
            >
            <Button size="small" style={{marginTop:'-31px',fontSize:'13px', marginRight:'-8rem', textTransform:'capitalize'}} variant="outlined" onClick={()=>IgnoreReq(item)}>Ignore</Button>
              
            </Typography>
          </React.Fragment>
        }
      />

    </ListItem>
    <Divider variant="inset" component="li"/>
      </>
    )
  })
}
   

      




  
    </List>
  );
}
