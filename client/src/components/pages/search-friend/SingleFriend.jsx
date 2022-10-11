import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function SingleFriend() {
  return (
    <List sx={{ width: "100%", maxWidth: 500, bgcolor: "background.paper" }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="https://avatars.githubusercontent.com/u/88549805?v=4" />
        </ListItemAvatar>
        <ListItemText
          primary="Ulfat Zakirli"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                @Zakirli
              </Typography>
              <Typography
                sx={{}}
                component="span"
                variant="body2"
                color="text.primary"
                style={{display:'flex',justifyContent:'flex-end'}}
            
              >
              <Button size="small" style={{marginTop:'-30px',fontSize:'13px', textTransform:'capitalize'}} variant="contained">Add as friend</Button>
                
              </Typography>
             
            </React.Fragment>
          }
        />

      </ListItem>
      <Divider variant="inset" component="li"/>

   
      




  
    </List>
  );
}
