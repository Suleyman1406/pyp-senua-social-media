import React from "react";
import "./addModal.css";
import { TextField } from "@mui/material";
import { useState } from "react";
import List from "../search-friend/List";
import axios from "axios";
import { Avatar } from "@mui/material";
import SingleUser from "../single-user/SingleUser";
import { ListItem } from "@mui/material";
import { ListItemAvatar } from "@mui/material";
import { ListItemText } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
const AddModal = ({ setAddModal }) => {
  const [inputText, setInputText] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [friend, setFriend] = useState({});
  let inputHandler = (e) => {
    let lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  function searchUser() {
    const user = JSON.parse(localStorage.getItem("user"));

    axios
      .get(`http://localhost:8080/api/user/${inputText}`, {
        headers: {
          "x-access-token": user?.token,
          "content-type": "application/json",
        },
      })
      .then((res) => setFriend(res.data));
    console.log(friend.id);
  }
  function addAsFriend() {
    const user = JSON.parse(localStorage.getItem("user"));
console.log("user id", user.id);
    axios
      .post(`http://localhost:8080/api/requests/create/${friend.id}`,{}, {
        headers: {
          "x-access-token": user?.token,
          "content-type": "application/json",
        },
      })
      .then((res) => console.log(res));
  }

  function cancelReq(){
    const user=JSON.parse(localStorage.getItem("user"));
    axios.post(`http://localhost:8080/api/requests/cancel/${friend.id}`, {}, {
      headers: {
        "x-access-token": user?.token,
        "content-type": "application/json",
      },
    })
    .then((res) => console.log(res));

  }
  return (
    <aside className="modal-container" onClick={() => setAddModal(false)}>
      <div
        className="modal"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h4>Search friends</h4>
        <br />
        <div className="main">
          <div className="search">
            <TextField
              id="outlined-basic"
              onChange={inputHandler}
              variant="outlined"
              fullWidth
              label="Search"
              name="value"
            />
          </div>

          {friend.username && (
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt="Remy Sharp"
                  src="https://avatars.githubusercontent.com/u/39061716?v=4"
                />
              </ListItemAvatar>
              <ListItemText
                primary={friend.username}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {friend.email}
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
                          backgroundColor:isActive ? '':'#be2625'
                        }}
                        variant="contained"
                        onClick={() =>{
                         isActive? addAsFriend(): cancelReq()
                          setIsActive(!isActive)
                        }
                      }
                      >
                     {
                        isActive? 
                     "add as friend":'cancel'
                     }  
                      </Button>
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          )}
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn clear-btn"
            style={{ marginTop: "2rem" }}
            onClick={searchUser}
          >
            search
          </button>
          <button
            type="button"
            className="btn clear-btn"
            style={{ marginTop: "2rem" }}
            onClick={() => setAddModal(false)}
          >
            close
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AddModal;
