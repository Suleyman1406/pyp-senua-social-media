import React, { useEffect, useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { format, render, cancel, register } from 'timeago.js';

import { Container } from "@mui/material";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import DefPerson from "../../../../../images/defPerson.jpg";

function Index({ currentChat, socket }) {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [messages, setMessages] = useState();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_BASE_URL}/api/messages/${currentChat?._id}`,
        {
          headers: {
            "x-access-token": currentUser?.token,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => setMessages(res.data));
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  const formik = useFormik({
    initialValues: {
      text: "",
    },
    validationSchema: Yup.object({
      text: Yup.string().required(),
    }),
    onSubmit: (values, { resetForm }) => {
      const newMessage = {
        conversationId: currentChat._id,
        text: values.text,
      };

      const receiver = currentChat.members.find(
        (x) => x._id !== currentUser.id
      );

      socket.current?.emit("sendMessage", {
        senderId: currentUser.id,
        text: values.text,
        receiverId: receiver._id,
      });
      axios
        .post(
          `${process.env.REACT_APP_SERVER_BASE_URL}/api/messages/`,
          newMessage,
          {
            headers: {
              "x-access-token": currentUser?.token,
              "Access-Control-Allow-Origin": "*",
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          resetForm();

          setMessages([...messages, res.data]);
        });
    },
  });

  useEffect(() => {
    socket.current?.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        conversationId: currentChat._id,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        text: data.text,
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.find((i) => i._id === arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  console.log(messages);

  return (
    <Container sx={{ px: 3, position: "relative" }}>
      <div style={{ height: "75vh", padding: "10px 0", overflowY: "auto" }}>
        {messages?.map((message) => (
          <div
            style={{
              marginTop: "25px",
              display: "flex",
              justifyContent: `${
                message.sender !== currentUser.id ? "start" : "end"
              }`,
            }}
            ref={scrollRef}
          >
            <Box
              sx={{
                m: 0,
                position: "relative",
                width: "300px",
                p: 2,
                display: "flex",
                alignItems: "top",
                border: "1px solid rgb(0 0 0 / 10%)",
                borderRadius: "10px",
              }}
            >
              <img
                src={DefPerson}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  marginRight: message.sender === currentUser.id ? "0" : "20px",
                  order: message.sender === currentUser.id ? "2" : "1",
                }}
              />
              <p
                style={{
                  width: "300px",
                  wordWrap: "breakWord",
                  wordBreak: "break-word",
                  order: message.sender === currentUser.id ? "1" : "2",
                }}
              >
                {message.text}
              </p>
              <span
                style={{
                  position: "absolute",
                  fontSize: "10px",
                  bottom: "-15px",
                  right: message.sender === currentUser.id && "0px",
                  left: message.sender !== currentUser.id && "0px",
                }}
              >
                {format(message.createdAt)}
              </span>
            </Box>
          </div>
        ))}
      </div>
      <Paper
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          width: "100%",
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          borderRadius: "25px",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, pl: 1 }}
          placeholder="Message..."
          {...formik.getFieldProps("text")}
          inputProps={{ "aria-label": "search google maps" }}
        />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SendIcon />
        </IconButton>
      </Paper>
    </Container>
  );
}

export default Index;
