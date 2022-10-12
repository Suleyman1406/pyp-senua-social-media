import React, { useContext } from "react";
import { postModuleContext } from "../../../context/postModuleContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useQueryClient, useMutation } from "react-query";
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";

import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Button from "@mui/material/Button";

const styles = {
  module: {
    position: "fixed",
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "white",
    padding: "10px 0px",
    boxShadow: "0 4px 8px 0 rgb(0 0 0 / 10%)",
    width: "400px",
    borderRadius: "10px",
    zIndex: "10",
  },
  line: {
    height: "1px",
    backgroundColor: "rgb(0 0 0 / 10%)",
  },
  iconWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "6px 7px 6px 20px",
  },
  text: {
    border: "none",
    resize: "none",
    padding: "20px",
    width: "100%",
    height: "100px",
  },
  wrapper: {
    padding: "10px",
    display: "flex",
    justifyContent: "space-between",
  },
};

const currentUser = JSON.parse(localStorage.getItem("user"));

const createPost = async (data) => {
  console.log(data)
  const { data: response } = await axios.post(
    "http://localhost:8080/api/posts/create", data, {
      headers: {
        "x-access-token": currentUser?.token,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    },
  );
  return response;
};

function Index() {
  const { setShow } = useContext(postModuleContext);

  const queryClient = useQueryClient();
 

  const { mutate, isLoading } = useMutation(createPost, {
    onSuccess: async (data) => {
      queryClient.invalidateQueries("posts");
      toast.success(data.message);
      setTimeout(()=> {
        setShow(false)
      }, 1500)
    },
    onError: (data) => {
      toast.error(data.response.data.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries("posts");
    },
  });

  const formik = useFormik({
    initialValues: {
      description: "",
      img: "",
    },
    validationSchema: Yup.object({
      description: Yup.string(),
      img: Yup.mixed().test(
        "is-correct-file",
        "Choose image",
        checkIfFilesAreCorrectType
      ).test(
        "is-correct-size",
        "Image is not correct size",
        checkIfFilesAreCorrectSize
      ),
    }),
    onSubmit: (values) => {
      if(values.description === '' && values.img === ''){
        toast.error("Post cannot be empty!")
      }else{
        const data = {
          description: values.description,
          imgUrl: values.img.name,
        }
        mutate(data)
      }
    },
  });

  return (
    <div style={styles.module}>
      <div style={styles.iconWrapper}>
        <h4 style={{ margin: "0" }}>New Post</h4>
        <CloseIcon
          onClick={() => setShow(false)}
          style={{ cursor: "pointer" }}
        />
      </div>
      <hr style={styles.line} />
      <form style={styles.form} onSubmit={formik.handleSubmit}>
        <textarea
          placeholder="What is on your mind?..."
          style={styles.text}
          {...formik.getFieldProps("description")}
        />
        <div style={styles.wrapper}>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={(event) => {
                formik.setFieldValue(
                  "img",
                  event.currentTarget.files[0]
                )}}
            />
            <PhotoCamera />
          </IconButton>
          <Button variant="contained" type="submit">
            Share
          </Button>
        </div>
      </form>
      <Toaster/>
    </div>
  );
}

export default Index;

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
