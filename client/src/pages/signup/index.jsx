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
import Container from "@mui/material/Container";

import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import SignupSVG from "../../images/signup.svg";

const styles = {
  errorLink: { color: "red", fontSize: "12px", margin: "0" },
  inputHeight: {
    height: "45px",
  },
};

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
    <Container maxWidth="lg">
      <Grid
        container
        style={{ height: "100vh" }}
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item xs={6} display="flex" alignItems="center">
          <img src={SignupSVG} alt="Login" style={{ width: "100%" }} />
        </Grid>
        <Grid item xs={5}>
          <Box component="form" onSubmit={formik.handleSubmit} display="block">
            <h2 style={{ fontSize: "40px", margin: "0" }}>Sign Up</h2>
            <FormControl
              fullWidth
              style={styles.inputHeight}
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
                <p style={styles.errorLink}>{formik.errors.email}</p>
              ) : null}
            </FormControl>
            <FormControl
              fullWidth
              style={styles.inputHeight}
              sx={{ mt: 1 }}
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
                <p style={styles.errorLink}>{formik.errors.firstname}</p>
              ) : null}
            </FormControl>
            <FormControl
              fullWidth
              style={styles.inputHeight}
              sx={{ mt: 2 }}
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
                <p style={styles.errorLink}>{formik.errors.lastname}</p>
              ) : null}
            </FormControl>
            <FormControl
              fullWidth
              style={styles.inputHeight}
              sx={{ mt: 2 }}
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
                <p style={styles.errorLink}>{formik.errors.username}</p>
              ) : null}
            </FormControl>
            <FormControl
              fullWidth
              style={styles.inputHeight}
              sx={{ mt: 2 }}
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
                <p style={styles.errorLink}>{formik.errors.password}</p>
              ) : null}
            </FormControl>
            <FormControl
              fullWidth
              style={styles.inputHeight}
              sx={{ mt: 2 }}
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
              {formik.touched.passwordconfirm &&
              formik.errors.passwordconfirm ? (
                <p style={styles.errorLink}>{formik.errors.passwordconfirm}</p>
              ) : null}
            </FormControl>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mt: 4 }}
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
    </Container>
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
