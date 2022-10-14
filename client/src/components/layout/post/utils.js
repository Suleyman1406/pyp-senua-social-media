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

const currentUser = JSON.parse(localStorage.getItem("user"));

export const createPost = async (data) => {
  console.log(data);
  const { data: response } = await axios.post(
    process.env.REACT_APP_SERVER_BASE_URL + "/api/posts/create",
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
