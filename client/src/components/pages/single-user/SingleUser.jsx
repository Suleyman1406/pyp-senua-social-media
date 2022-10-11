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

export default function SingleUser() {
const [isActive,setIsActive]=useState(false)

  
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
              <Button size="small"  style={{marginTop:'-30px',fontSize:'13px',backgroundColor:isActive? '#000':''}} variant="contained" onClick={()=>setIsActive(!isActive)}>{isActive? "Unfriend": 'Friend' }</Button>
                
              </Typography>
            </React.Fragment>
          }
        />

      </ListItem>
      <Divider variant="inset" component="li"/>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="https://avatars.githubusercontent.com/u/79119900?v=4" />
        </ListItemAvatar>
        <ListItemText
          primary="Fatima Mirzezade"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                @F_Mirzezade
              </Typography>
              <Typography
                sx={{}}
                component="span"
                variant="body2"
                color="text.primary"
                style={{display:'flex',justifyContent:'flex-end'}}
            
              >
              <Button size="small" style={{marginTop:'-30px',fontSize:'13px',backgroundColor:'#000'}} variant="contained">Unfriend</Button>
                
              </Typography>
            </React.Fragment>
          }
        />

      </ListItem>
      <Divider variant="inset" component="li"/>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="https://avatars.githubusercontent.com/u/87971060?v=4" />
        </ListItemAvatar>
        <ListItemText
          primary="Kamran Ekhberov"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                @Ekhberov_22
              </Typography>
              <Typography
                sx={{}}
                component="span"
                variant="body2"
                color="text.primary"
                style={{display:'flex',justifyContent:'flex-end'}}
            
              >
              <Button size="small" style={{marginTop:'-30px',fontSize:'13px',backgroundColor:'#000'}} variant="contained">Unfriend</Button>
                
              </Typography>
            </React.Fragment>
          }
        />

      </ListItem>
      <Divider variant="inset" component="li"/>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="https://avatars.githubusercontent.com/u/100721454?v=4" />
        </ListItemAvatar>
        <ListItemText
          primary="Efsane Sadiqova"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                @Efso23
              </Typography>
              <Typography
                sx={{}}
                component="span"
                variant="body2"
                color="text.primary"
                style={{display:'flex',justifyContent:'flex-end'}}
            
              >
              <Button size="small" style={{marginTop:'-30px',fontSize:'13px',backgroundColor:'#000'}} variant="contained">Unfriend</Button>
                
              </Typography>
            </React.Fragment>
          }
        />

      </ListItem>
      <Divider variant="inset" component="li"/>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="https://avatars.githubusercontent.com/u/76852149?v=4" />
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
               
              <Button size="small" style={{marginTop:'-30px',fontSize:'13px',backgroundColor:'#000'}} variant="contained">Unfriend</Button>
              
                
              </Typography>
            </React.Fragment>
          }
        />

      </ListItem>
      <Divider variant="inset" component="li"/>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Fatima Mirzezade"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                @F_Mirzezade
              </Typography>
              <Typography
                sx={{}}
                component="span"
                variant="body2"
                color="text.primary"
                style={{display:'flex',justifyContent:'flex-end'}}
            
              >
              <Button size="small" style={{marginTop:'-30px',fontSize:'13px',backgroundColor:'#000'}} variant="contained">Unfriend</Button>
                
              </Typography>
            </React.Fragment>
          }
        />

      </ListItem>
      <Divider variant="inset" component="li"/>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Kamran Ekhberov"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                @Ekhberov_22
              </Typography>
              <Typography
                sx={{}}
                component="span"
                variant="body2"
                color="text.primary"
                style={{display:'flex',justifyContent:'flex-end'}}
            
              >
              <Button size="small" style={{marginTop:'-30px',fontSize:'13px',backgroundColor:'#000'}} variant="contained">Unfriend</Button>
                
              </Typography>
            </React.Fragment>
          }
        />

      </ListItem>
      <Divider variant="inset" component="li"/>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Efsane Sadiqova"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                @Efso23
              </Typography>
              <Typography
                sx={{}}
                component="span"
                variant="body2"
                color="text.primary"
                style={{display:'flex',justifyContent:'flex-end'}}
            
              >
              <Button size="small" style={{marginTop:'-30px',fontSize:'13px',backgroundColor:'#000'}} variant="contained">Unfriend</Button>
                
              </Typography>
            </React.Fragment>
          }
        />

      </ListItem>
      <Divider variant="inset" component="li"/>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
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
              <Button size="small" style={{marginTop:'-30px',fontSize:'13px',backgroundColor:'#000'}} variant="contained">Unfriend</Button>
                
              </Typography>
            </React.Fragment>
          }
        />

      </ListItem>
      <Divider variant="inset" component="li"/>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Fatima Mirzezade"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                @F_Mirzezade
              </Typography>
              <Typography
                sx={{}}
                component="span"
                variant="body2"
                color="text.primary"
                style={{display:'flex',justifyContent:'flex-end'}}
            
              >
              <Button size="small" style={{marginTop:'-30px',fontSize:'13px',backgroundColor:'#000'}} variant="contained">Unfriend</Button>
                
              </Typography>
            </React.Fragment>
          }
        />

      </ListItem>
      <Divider variant="inset" component="li"/>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Kamran Ekhberov"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                @Ekhberov_22
              </Typography>
              <Typography
                sx={{}}
                component="span"
                variant="body2"
                color="text.primary"
                style={{display:'flex',justifyContent:'flex-end'}}
            
              >
              <Button size="small" style={{marginTop:'-30px',fontSize:'13px',backgroundColor:'#000'}} variant="contained">Unfriend</Button>
                
              </Typography>
            </React.Fragment>
          }
        />

      </ListItem>
      <Divider variant="inset" component="li"/>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Efsane Sadiqova"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                @Efso23
              </Typography>
              <Typography
                sx={{}}
                component="span"
                variant="body2"
                color="text.primary"
                style={{display:'flex',justifyContent:'flex-end'}}
            
              >
              <Button size="small" style={{marginTop:'-30px',fontSize:'13px',backgroundColor:'#000'}} variant="contained">Unfriend</Button>
                
              </Typography>
            </React.Fragment>
          }
        />

      </ListItem>
      <Divider variant="inset" component="li"/>






  
    </List>
  );
}
