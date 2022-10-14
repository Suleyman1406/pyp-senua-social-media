import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import DefPerson from "../../../../images/defPerson.jpg";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

function Index({ setCurrentChat }) {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const [conversations, setConversations] = useState();
  const [show, setShow] = useState(false);
  const [friends, setFriends] = useState();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}/api/conversations`, {
        headers: {
          "x-access-token": currentUser?.token,
          "content-type": "application/json",
        },
      })
      .then((res) => setConversations(res.data));
  }, []);

  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {},
  });

  const handleFriends = async () => {
    await axios
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}/api/user/friends/all`, {
        headers: {
          "x-access-token": currentUser?.token,
          "content-type": "application/json",
        },
      })
      .then((res) => setFriends(res.data));
    setShow(true);
  };

  const createChat = async (friend) => {
    console.log(friend);
    await axios
      .post(
        `${process.env.REACT_APP_SERVER_BASE_URL}/api/conversations/`,
        {
          receiverId: friend.id,
        },
        {
          headers: {
            "x-access-token": currentUser?.token,
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        let duplicate = conversations.find(x=> x._id === res.data._id)
        if(!duplicate){
          const chat = {
            createdAt: res.data.createdAt,
            updatedAt: res.data.updatedAt,
            _id: res.data._id,
            members: [friend, {
              name: currentUser.name,
              _id: currentUser.id,
              surname: currentUser.surname,
              profilePhotoURL: currentUser.profilePhotoURL,
              username: currentUser.username,
              email: currentUser.email
            }]
          }
          setConversations([...conversations, chat])
          setCurrentChat(chat)
        }else{
          setCurrentChat(duplicate)
        }
        setShow(false)
      });
  };

  return (
    <Container
      fixed
      sx={{
        position: "fixed",
        zIndex: "2",
        overflowX: "hidden",
        overflowY: "auto",
        m: "0",
        width: "350px",
        height: "100vh",
        borderRight: "1px solid rgb(0 0 0 / 10%)",
        pt: 3,
        pb: 3,
      }}
    >
      <Paper
        onSubmit={formik.handleSubmit}
        component="form"
        sx={{
          p: "2px 4px",
          mb: "40px",
          display: "flex",
          alignItems: "center",
          width: 300,
          borderRadius: "25px",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search..."
          inputProps={{ "aria-label": "search" }}
          {...formik.getFieldProps("username")}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>

      {conversations &&
        conversations.map((conv) => (
          <Paper
            key={conv._id}
            sx={{
              p: "9px 9px",
              mt: "20px",
              display: "flex",
              alignItems: "center",
              width: 300,
              cursor: "pointer",
              border: "1px solid rgb(0 0 0 / 10%)",
            }}
            onClick={() => setCurrentChat(conv)}
          >
            <img
              src={
                conv.members[1]._id === currentUser.id
                  ? conv.members[0].profilePhotoURL
                    ? process.env.REACT_APP_SERVER_BASE_URL +
                      conv.members[0].profilePhotoURL
                    : DefPerson
                  : conv.members[1].profilePhotoURL
                  ? process.env.REACT_APP_SERVER_BASE_URL +
                    conv.members[1].profilePhotoURL
                  : DefPerson
              }
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
            <span style={{ fontSize: "20px", marginLeft: "20px" }}>
              {conv.members[0]._id === currentUser.id
                ? conv.members[1].username
                : conv.members[0].username}
            </span>
          </Paper>
        ))}
      <Box sx={{ position: "fixed", bottom: "10px" }}>
        <Button variant="contained" onClick={() => handleFriends()}>
          New Chat
        </Button>
      </Box>
      {show && (
        <Box
          sx={{
            position: "fixed",
            top: "0",
            left: "0",
            height: "100vh",
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper
            sx={{ width: "400px", height: "300px", p: 3, overflowY: "auto" }}
          >
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3 style={{ display: "inline-block", margin: "0" }}>Friends</h3>
              <CloseIcon
                sx={{ cursor: "pointer" }}
                onClick={() => setShow(false)}
              />
            </Box>
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "background.paper",
              }}
            >
              {friends?.map((friend) => (
                <ListItem key={friend.id}>
                  <ListItemAvatar>
                    {friend.profilePhotoURL ? (
                      <img
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                        src={
                          process.env.REACT_APP_SERVER_BASE_URL +
                          friend.profilePhotoURL
                        }
                      />
                    ) : (
                      <Avatar></Avatar>
                    )}
                  </ListItemAvatar>
                  <ListItemText
                    primary={friend.username}
                    secondary={`${friend.name} ${friend.surname}`}
                  />
                  <Button variant="text" onClick={() => createChat(friend)}>
                    Chat
                  </Button>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      )}
    </Container>
  );
}

export default Index;
