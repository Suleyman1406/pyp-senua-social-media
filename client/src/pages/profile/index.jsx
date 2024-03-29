import { Button, Divider, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import style from "./profile.module.css";
import { styled } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { Form, Formik } from "formik";
import Image from "./image";
import * as yup from "yup";
import Error from "./errormessage";
import { BsPencilFill } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";

const validationSchema = yup.object({
  name: yup.string().required("Name is Required!"),
  surname: yup.string().required("Surname is Required!"),
  file: yup.mixed(),
});

const Profile = () => {
  const fileRef = useRef(null);
  const storageUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_SERVER_BASE_URL}/api/user/${storageUser.username}`,
        {
          headers: {
            "x-access-token": storageUser?.token,
            "content-type": "application/json",
          },
        }
      )
      .then((res) => {
        setUser(res.data);
        setIsLoading(false);
      });
  }, [storageUser?.token, storageUser.username]);

  if (isLoading)
    return (
      <ThreeDots
        height="100"
        width="100"
        radius="9"
        color="rgb(187,37,37)"
        ariaLabel="three-dots-loading"
        wrapperStyle={{
          justifyContent: "center",
          height: "80vh",
          alignItems: "center",
        }}
        wrapperClassName=""
        visible={true}
      />
    );
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: "#00798C",
    marginLeft: 10,
    borderRadius: 10,
    "&:hover": {
      backgroundColor: blue[900],
    },
  }));

  const InputButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: "#00798C",
    borderRadius: "50%",
    minWidth: 0,
    "&:hover": {
      backgroundColor: blue[900],
    },
  }));
  return (
    <>
      <div>
        <div className={style.background}></div>

        <div className={style.text}>
          <h3>{user?.name + " " + user?.surname}</h3>
        </div>
        <div className={style.friend}>
          <div>
            <h4 style={{ color: "blue" }}>{user?.friendsCount}</h4>
            <h4>Friends</h4>
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
        validationSchema={validationSchema}
        initialValues={{
          name: user?.name ?? null,
          surname: user?.surname ?? "",
          file: user?.profilePhotoURL ?? null,
        }}
        onSubmit={(values) => {
          let formData = new FormData();
          formData.append("name", values.name);
          formData.append("surname", values.surname);
          formData.append("uploaded_file", values.file);
          axios
            .post(
              `${process.env.REACT_APP_SERVER_BASE_URL}/api/user`,
              formData,
              {
                headers: {
                  "x-access-token": storageUser?.token,
                  "Access-Control-Allow-Origin": "*",
                  "Content-Type": "multipart/form-data",
                  Accept: "application/json",
                },
              }
            )
            .then((res) => {
              toast.success(res.data.message);
              localStorage.setItem(
                "user",
                JSON.stringify({ ...storageUser, ...res.data.doc })
              );
            });
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => {
          return (
            <div className={style.inputBox}>
              <Form onSubmit={handleSubmit}>
                <div className={style.imgWrapper}>
                  {values.file ? (
                    <Image file={values.file} />
                  ) : (
                    <img
                      className={style.image}
                      alt="avatar"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&usqp=CAU"
                    />
                  )}
                  <div className={style.file}>
                    <InputButton
                      onClick={() => {
                        fileRef.current.click();
                      }}
                    >
                      <BsPencilFill />
                    </InputButton>
                  </div>
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
                    value={values?.name}
                  />
                  <Error name="name" />
                </div>
                <div className={style.input}>
                  <TextField
                    id="surname"
                    className={style.input}
                    label="Surname"
                    name="surname"
                    type="text"
                    onChange={(e) => handleChange(e)}
                    onBlur={handleBlur}
                    value={values.surname}
                  />
                  <Error name="surname" />
                </div>
                <div className={style.input}>
                  <TextField
                    className={style.input}
                    label="Username"
                    disabled
                    name="username"
                    type="text"
                    value={user?.username}
                  />
                </div>
                <div className={style.input}>
                  <TextField
                    className={style.input}
                    label="Email"
                    disabled
                    name="email"
                    type="email"
                    value={user?.email}
                  />
                </div>
                <input
                  accept="image/*"
                  ref={fileRef}
                  type="file"
                  hidden
                  name="file"
                  onChange={(event) => {
                    setFieldValue("file", event.target.files[0]);
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
