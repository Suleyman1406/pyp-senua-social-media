import React, { useState } from "react";
import styles from "./home.module.css";
import axios from "axios";
import { useQuery } from "react-query";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { Avatar } from "@mui/material";

const HomePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [checklike, setCheckLike] = useState(false)
  const [count, setCount] = useState(0)
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
  function sendLike(id) {
    console.log(user.id);
    axios.post(`http://localhost:8080/api/posts/toggle-like/${id}`, { id }, {
      headers: {
        "x-access-token": user?.token,
        "content-type": "application/json",
      },
    })
      .then(data => {

        setCheckLike(data.data.liked)

        if (checklike == true) {
          setCount(1)
        }
        else {
          setCount(-1)
        }
      })

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
                    src="https://media-exp1.licdn.com/dms/image/C5603AQEkiWewupNGQQ/profile-displayphoto-shrink_800_800/0/1538160028383?e=2147483647&v=beta&t=236vQLxb5dWdBLM-WMGKQmG_-_CErnk9iG18DIlYavk"
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
                        src="https://code.edu.az/wp-content/uploads/2021/09/mezunlarimiz.jpeg"
                        className={styles.main_img}
                        alt=""
                      />
                    </div>
                  )}
                </main>
                <footer>
                  <div style={{ display: "flex" }}>
                    {
                      <ThumbUpOffAltIcon style={{ color: item.likes.includes(user.id) && checklike ? 'blue' : '' }} onClick={() => sendLike(item.id)} />
                    }
                    <span style={{ marginTop: "2px", marginLeft: "3px" }}>
                      {count}
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