import React, { useContext, useRef } from "react";
import { postModuleContext } from "../../../context/postModuleContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useQueryClient, useMutation } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import {createPost, checkIfFilesAreCorrectSize, checkIfFilesAreCorrectType} from './utils'
import {styles} from './postStyle.js'

import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Button from "@mui/material/Button";

function Index() {
  const { setShow } = useContext(postModuleContext);
  const imgRef = useRef();

  const queryClient = useQueryClient();

  const handleImage = (event) => {
    imgRef.current = event.currentTarget.files[0].name
    formik.setFieldValue("img", event.currentTarget.files[0]);
  };

  const { mutate, isLoading } = useMutation(createPost, {
    onSuccess: async (data) => {
      queryClient.invalidateQueries("posts");
      toast.success(data.message);
      setTimeout(() => {
        setShow(false);
      }, 1500);
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
      img: Yup.mixed()
        .test("is-correct-file", "Choose image", checkIfFilesAreCorrectType)
        .test(
          "is-correct-size",
          "Image is not correct size",
          checkIfFilesAreCorrectSize
        ),
    }),
    onSubmit: (values) => {
      if (values.description === "" && values.img === "") {
        toast.error("Post cannot be empty!");
      } else {
        let formData = new FormData();
        formData.append("description", values.description);
        formData.append("uploaded_file", values.img);
        mutate(formData);
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
              onChange={(event) => handleImage(event)}
            />
            <PhotoCamera />
            <span style={styles.imageUrl}>{imgRef?.current}</span>
          </IconButton>
          <Button variant="contained" type="submit">
            Share
          </Button>
        </div>
      </form>
      <Toaster />
    </div>
  );
}

export default Index;


