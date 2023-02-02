import axios from "axios";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
export function checkIfFilesAreCorrectType(file) {
  if (file) {
    if (!SUPPORTED_FORMATS.includes(file.type)) {
      return false;
    }
  }
  return true;
}

export function checkIfFilesAreCorrectSize(file) {
  if (file) {
    const size = file.size / 1024 / 1024;
    if (size > 10) {
      return false;
    }
  }
  return true;
}

export const createPost = async (data) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const { data: response } = await axios.post(
    "http://localhost:8080"+ "/api/posts/create",
    data,
    {
      headers: {
        "x-access-token": currentUser?.token,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    }
  );
  return response;
};
