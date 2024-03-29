import React from "react";
import { useQuery, useQueryClient } from "react-query";
import useMediaQuery from "@mui/material/useMediaQuery";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { ThreeDots } from "react-loader-spinner";
import DefPerson from "images/defPerson.jpg";
import { Avatar } from "@mui/material";
import styles from "./home.module.css";

import axios from "axios";

const HomePage = () => {
  const matches = useMediaQuery("(min-width:900px)");
  const user = JSON.parse(localStorage.getItem("user"));
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery("posts", async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_SERVER_BASE_URL + "/api/posts/all",
      {
        headers: {
          "x-access-token": user?.token,
          "content-type": "application/json",
        },
      }
    );
    return data;
  });

  if (isLoading) {
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
  }

  if (isError) {
    return <div>{JSON.stringify(error.message)}</div>;
  }
  function sendLike(item, idx) {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_BASE_URL}/api/posts/toggle-like/${item.id}`,
        {},
        {
          headers: {
            "x-access-token": user?.token,
            "content-type": "application/json",
          },
        }
      )
      .then((res) => {
        if (!res.data.liked) {
          let i = data[idx].likes.indexOf(user.id);
          data[idx].likes.splice(i, 1);
        } else {
          data[idx].likes.push(user.id);
        }
        queryClient.setQueryData("posts", [...data]);
      });
  }

  return (
    <div className={styles.container}>
      <div className={styles.titleDiv}>
        <h2>Posts</h2>
      </div>
      <div className={matches ? styles.card : styles.cardTablet}>
        {data &&
          data.map((item, idx) => {
            return (
              <div className={styles.card} key={item.id}>
                <header>
                  <Avatar
                    alt="Remy Sharp"
                    src={
                      item.author.profilePhotoURL
                        ? `${process.env.REACT_APP_SERVER_BASE_URL}${item.author.profilePhotoURL}`
                        : DefPerson
                    }
                    sx={{ width: 60, height: 60 }}
                  />
                  <div className={styles.user_info}>
                    <h4>
                      {item.author.name} {item.author.surname}
                    </h4>
                    <p>{item.author.username}</p>
                  </div>
                </header>
                <main>
                  <p>{item.description}</p>
                  {item.imgUrl && (
                    <div className={styles.main_img_container}>
                      <img
                        src={`${process.env.REACT_APP_SERVER_BASE_URL}/${item.imgUrl}`}
                        className={styles.main_img}
                        alt=""
                      />
                    </div>
                  )}
                </main>
                <footer>
                  <div style={{ display: "flex" }}>
                    {
                      <ThumbUpOffAltIcon
                        onClick={() => sendLike(item, idx)}
                        style={{
                          cursor: "pointer",
                          color: item.likes.includes(user.id) ? "#fb8500" : "",
                        }}
                      />
                    }
                    <span style={{ marginTop: "2px", marginLeft: "3px" }}>
                      {item.likes.length}
                    </span>
                  </div>
                </footer>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default HomePage;
