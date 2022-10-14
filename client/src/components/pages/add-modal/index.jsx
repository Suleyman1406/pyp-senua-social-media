import React from "react";
import "./addModal.css";
import { TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { Avatar } from "@mui/material";
import { ListItem } from "@mui/material";
import { ListItemAvatar } from "@mui/material";
import { ListItemText } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import toast from "react-hot-toast";

const AddModal = ({ setAddModal }) => {
  const [inputText, setInputText] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [friend, setFriend] = useState({});
  let inputHandler = (e) => {
    let lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  function searchUser() {
    setIsActive(true);
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));

    axios
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}/api/user/${inputText}`, {
        headers: {
          "x-access-token": user?.token,
          "content-type": "application/json",
        },
      })
      .then((res) => {
        setLoading(false);
        setFriend(res.data);
      })
      .catch(({ response }) => {
        setFriend({});
        setLoading(false);
        toast.error(response.data.message);
      });
  }

  function addAsFriend() {
    const user = JSON.parse(localStorage.getItem("user"));
    axios
      .post(
        `${process.env.REACT_APP_SERVER_BASE_URL}/api/requests/create/${friend.id}`,
        {},
        {
          headers: {
            "x-access-token": user?.token,
            "content-type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setIsActive(!isActive);
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(({ response }) => {
        toast.error(response.data.message);
      });
  }

  function cancelReq() {
    const user = JSON.parse(localStorage.getItem("user"));
    axios
      .post(
        `${process.env.REACT_APP_SERVER_BASE_URL}/api/requests/cancel/${friend.id}`,
        {},
        {
          headers: {
            "x-access-token": user?.token,
            "content-type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setIsActive(!isActive);
          toast.success(res.data.message);
        }
      })
      .catch(({ response }) => {
        toast.error(response.data.message);
      });
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
                          backgroundColor: isActive ? "" : "#be2625",
                        }}
                        variant="contained"
                        onClick={() => {
                          isActive ? addAsFriend() : cancelReq();
                        }}
                      >
                        {isActive ? "add as friend" : "cancel"}
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
            disabled={loading}
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
