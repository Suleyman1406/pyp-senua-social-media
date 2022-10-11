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

import GoogleIcon from "@mui/icons-material/Google";
import LoginSVG from "../../images/login.svg";

const styles = {
  link: {
    textDecoration: "none",
  },
  signInLink: {
    display: "flex",
    justifyContent: "center",
    width: "200px",
    alignItems: "center",
    textDecoration: "none",
    padding: "10px",
    border: "1px solid black",
    borderRadius: "10px",
  },
  errorLink: { color: "red", fontSize: "12px", margin: "0" },
  inputHeight: {
    height: "45px"
  }
};

const LoginPage = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Email is required"),
      password: Yup.string().required("Required"),
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
        justifyContent='space-between'
      >
        <Grid item xs={6}>
          <img src={LoginSVG} alt="Login" style={{ width: "100%" }} />
        </Grid>
        <Grid item xs={5}>
          <Box component="form" onSubmit={formik.handleSubmit} display="block">
            <h2 style={{ fontSize: "40px", margin: "0" }}>Login</h2>
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
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <p style={styles.errorLink}>{formik.errors.email}</p>
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
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mt: 5 }}
            >
              <Link style={styles.link}>Forgot Password?</Link>
              <Button variant="contained" type="submit">
                Login
              </Button>
            </Box>
          </Box>
          <p style={{ textAlign: "center", fontSize: "20px" }}>or</p>
          <Box display="flex" justifyContent="center">
            <Link style={styles.signInLink}>
              <GoogleIcon sx={{ fontSize: 20, mr: 1 }} />
              <span style={{ fontSize: "15px" }}>Sign In with Google</span>
            </Link>
          </Box>
          <p style={{ textAlign: "center", marginTop: "50px" }}>
            You don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
