import React, { useState } from "react";

const Image = ({ file }) => {
  const [preview, setpreview] = useState(
    typeof file === "string"
      ? `${process.env.REACT_APP_SERVER_BASE_URL}/${file}`
      : null
  );
  if (typeof file !== "string") {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setpreview(reader.result);
    };
  }

  return (
    <>
      <img
        src={preview}
        alt=""
        style={{
          width: 180,
          height: 180,
          borderRadius: "50%",
          objectFit: "cover",
          position: "absolute",
          top: -310,
        }}
      />
    </>
  );
};

export default Image;
