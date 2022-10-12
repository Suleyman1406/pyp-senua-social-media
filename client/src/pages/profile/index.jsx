import { Button, Divider, TextField } from "@mui/material";
import React, { useState } from "react";
import style from "./profile.module.css";
import { styled } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { Form, Formik } from "formik";

const Profile = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: "#00798C",
    marginLeft: 10,
    borderRadius: 10,
    "&:hover": {
      backgroundColor: blue[900],
    },
  }));

  return (
    <>
      <div>
        <div className={style.background}></div>

        <div className={style.text}>
          <h3>Ebulfez Sadiqov</h3>
        </div>
        <div className={style.friend}>
          <div>
            <h4 style={{ color: "blue" }}>4</h4>
            <h4>
              <i>Friends</i>
            </h4>
          </div>
          <div>
            <Link to="/chat">
              <ColorButton>Chat</ColorButton>
            </Link>
          </div>
        </div>
        <Divider style={{ position: "relative", top: 100 }} />
      </div>
      <Formik
        initialValues={{
          name: "",
          surname: "",
          image:""
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => {
          return (
            <div className={style.inputBox}>
              <Form onSubmit={handleSubmit}>
                <div className={style.imgWrapper}>
                  {selectedImage && (
                    <div className={style.imgWrapper}>
                      <img
                      className={style.image}
                        alt="nimage"
                        width={"250px"}
                        src={URL.createObjectURL(selectedImage)}
                      />
                    </div>
                  )}
                </div>
                <div className={style.input}>
                  <TextField
                    className={style.input}
                    id="name"
                    label="Name"
                    name="name"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                </div>
                <div className={style.input}>
                  <TextField
                    id="surname"
                    className={style.input}
                    label="Surname"
                    name="surname"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.surname}
                  />
                </div>
                <div className={style.input}>
                  <TextField
                    className={style.input}
                    label="Username"
                    disabled
                    name="username"
                    type="text"
                  />
                </div>
                <div className={style.input}>
                  <TextField
                    className={style.input}
                    label="Email"
                    disabled
                    name="email"
                    type="email"
                  />
                </div>
                <input
                  type="file"
                  name="image"
                  onChange={(event) => {
                    console.log(event.target.files[0].name);
                    setSelectedImage(event.target.files[0]);
                  }}
                />
                <div className={style.button}>
                  <ColorButton type="submit">Save</ColorButton>
                </div>
              </Form>
            </div>
          );
        }}
      </Formik>
    </>
  );
};

export default Profile;
