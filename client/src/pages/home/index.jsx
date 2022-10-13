import React, { useState } from "react";
import styles from "./home.module.css";
import axios from "axios";
import { useQuery } from "react-query";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { Avatar } from "@mui/material";
import DefPerson from "../../images/defPerson.jpg";


const HomePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const { isLoading, isError, data, error } = useQuery("posts", async () => {
    const { data } = await axios.get("http://localhost:8080/api/posts/all", {
      headers: {
        "x-access-token": user?.token,
        "content-type": "application/json",
      },
    });
    return data;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{JSON.stringify(error)}</div>;
  }
  function sendLike() {
    console.log('likedd');
    axios.post('http://localhost:8080/api/posts/toggle-like/634558d0b33024a29a2335ff',{} ,{
      headers: {
        "x-access-token": user?.token,
        "content-type": "application/json",
      },
    })
      .then(data => console.log('data', data.data.liked))
  }

  return (
    <div className={styles.container}>
      <h2>Posts</h2>
      <div className={styles.cards}>
        {data &&
          data.map((item, id) => {
            return (
              <div className={styles.card} key={item.id}>
                <header>
                  <Avatar
                    alt="Remy Sharp"
                    src={item.author.profilePhotoURL ?? DefPerson}
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
                        src={`http://localhost:8080/${item.imgUrl}`}
                        className={styles.main_img}
                        alt=""
                      />
                    </div>
                  )}
                </main>
                <footer>
                  <div style={{ display: "flex" }}>
                    {
                      <ThumbUpOffAltIcon style={{ color: item.likes.includes(user.id) ? 'blue' : '' }} onClick={sendLike} />
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