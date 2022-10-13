import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useQuery } from 'react-query';
import  axios  from 'axios';

export default function SingleUser() {
  const [isActive, setIsActive] = useState(false)
  const user = JSON.parse(localStorage.getItem("user"));

  const { data } = useQuery(
    "user-friends",
    async () => {
      const { data } = await axios.get("http://localhost:8080/api/user/friends/all", {
        headers: {
          "x-access-token": user?.token,
          "content-type": "application/json",
        },
      });
      return data;
    }
  );

  function UnFriend(item) {
    const user = JSON.parse(localStorage.getItem("user"));
console.log("user id", item);
    axios
      .delete(`http://localhost:8080/api/user/friends/${item.id}`, {
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
          <Avatar
            alt="Remy Sharp"
            src="https://avatars.githubusercontent.com/u/39061716?v=4"
          />
        </ListItemAvatar>
        <ListItemText
          primary={item.name}
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
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button
                  size="small"
                  style={{
                    marginTop: "-30px",
                    fontSize: "13px",
                    backgroundColor:  "#000" 
                  }}
                  variant="contained"
                  onClick={() => UnFriend(item)}
                >
                 Unfriend
                </Button>
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
          <Divider variant="inset" component="li" />
          </>


          )
        
        })
      }
    </List>
  );
}
