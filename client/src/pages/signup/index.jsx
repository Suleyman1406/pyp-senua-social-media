import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import SignupSVG from "../../images/signup.svg";



const SignupPage = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      passwordconfirm: "",
      profilephoto: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Email is required"),
      username: Yup.string()
        .min(3, "Must be at least 3 characters")
        .required("Required"),
      firstname: Yup.string()
        .min(2, "Must be at least 2 characters")
        .required("Required"),
      lastname: Yup.string()
        .min(3, "Must be at least 3 characters")
        .required("Required"),
      profilephoto: Yup.mixed().test(
        "is-correct-file",
        "Choose image",
        checkIfFilesAreCorrectType
      ).test(
        "is-correct-size",
        "Image is not correct size",
        checkIfFilesAreCorrectSize
      ),
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        )
        .required("Required"),
      passwordconfirm: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <Grid container spacing={5} sx={{ pt: 5, pl: 2, pb: 5 }}>
      <Grid item xs={6} display="flex" alignItems="center">
        <img src={SignupSVG} alt="Login" style={{ width: "100%" }} />
      </Grid>
      <Grid item xs={4}>
        <Box component="form" onSubmit={formik.handleSubmit} display="block">
          <h2 style={{ fontSize: "40px" }}>Sign Up</h2>
          <FormControl
            fullWidth
            style={{ height: "50px" }}
            sx={{ mt: 1 }}
            variant="standard"
            onSubmit={formik.handleSubmit}
          >
            <InputLabel htmlFor="standard-adornment-amount">Email</InputLabel>
            <Input
              id="standard-adornment-amount"
              type="email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <p style={{ color: "red", fontSize: "13px" }}>
                {formik.errors.email}
              </p>
            ) : null}
          </FormControl>
          <FormControl
            fullWidth
            style={{ height: "50px" }}
            sx={{ mt: 4 }}
            variant="standard"
            onSubmit={formik.handleSubmit}
          >
            <InputLabel htmlFor="standard-adornment-amount">
              Firstname
            </InputLabel>
            <Input
              id="standard-adornment-amount"
              {...formik.getFieldProps("firstname")}
            />
            {formik.touched.firstname && formik.errors.firstname ? (
              <p style={{ color: "red", fontSize: "13px" }}>
                {formik.errors.firstname}
              </p>
            ) : null}
          </FormControl>
          <FormControl
            fullWidth
            style={{ height: "50px" }}
            sx={{ mt: 4 }}
            variant="standard"
            onSubmit={formik.handleSubmit}
          >
            <InputLabel htmlFor="standard-adornment-amount">
              Lastname
            </InputLabel>
            <Input
              id="standard-adornment-amount"
              {...formik.getFieldProps("lastname")}
            />
            {formik.touched.lastname && formik.errors.lastname ? (
              <p style={{ color: "red", fontSize: "13px" }}>
                {formik.errors.lastname}
              </p>
            ) : null}
          </FormControl>
          <FormControl
            fullWidth
            style={{ height: "50px" }}
            sx={{ mt: 4 }}
            variant="standard"
            onSubmit={formik.handleSubmit}
          >
            <InputLabel htmlFor="standard-adornment-amount">
              Username
            </InputLabel>
            <Input
              id="standard-adornment-amount"
              {...formik.getFieldProps("username")}
            />
            {formik.touched.username && formik.errors.username ? (
              <p style={{ color: "red", fontSize: "13px" }}>
                {formik.errors.username}
              </p>
            ) : null}
          </FormControl>

          <FormControl
            fullWidth
            style={{ height: "50px" }}
            sx={{ mt: 4 }}
            variant="standard"
            onSubmit={formik.handleSubmit}
          >
            <InputLabel htmlFor="standard-adornment-amount">
              Profile photo
            </InputLabel>
            <Input
              id="standard-adornment-amount"
              type="file"
              onChange={(event) => {
                formik.setFieldValue(
                  "profilephoto",
                  event.currentTarget.files[0]
                );
              }}
            />
            {formik.touched.profilephoto && formik.errors.profilephoto ? (
              <p style={{ color: "red", fontSize: "13px" }}>
                {formik.errors.profilephoto}
              </p>
            ) : null}
          </FormControl>

          <FormControl
            fullWidth
            style={{ height: "50px" }}
            sx={{ mt: 4 }}
            variant="standard"
          >
            <InputLabel htmlFor="standard-adornment-amount">
              Password
            </InputLabel>
            <Input
              id="standard-adornment-amount"
              type="password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ? (
              <p style={{ color: "red", fontSize: "10px" }}>
                {formik.errors.password}
              </p>
            ) : null}
          </FormControl>
          <FormControl
            fullWidth
            style={{ height: "50px" }}
            sx={{ mt: 4 }}
            variant="standard"
          >
            <InputLabel htmlFor="standard-adornment-amount">
              Password Confirm
            </InputLabel>
            <Input
              id="standard-adornment-amount"
              type="password"
              {...formik.getFieldProps("passwordconfirm")}
            />
            {formik.touched.passwordconfirm && formik.errors.passwordconfirm ? (
              <p style={{ color: "red", fontSize: "13px" }}>
                {formik.errors.passwordconfirm}
              </p>
            ) : null}
          </FormControl>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mt: 5 }}
          >
            <Link to="/login">
              <KeyboardBackspaceIcon />
            </Link>
            <Button variant="contained" type="submit">
              Signup
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignupPage;

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
function checkIfFilesAreCorrectType(file) {
  if (file) {
    if (!SUPPORTED_FORMATS.includes(file.type)) {
      return false;
    }
  }
  return true;
}

function checkIfFilesAreCorrectSize(file) {
  if (file) {
    const size = file.size / 1024 / 1024;
    if (size > 10) {
      return false;
    }
  }
  return true;
}
