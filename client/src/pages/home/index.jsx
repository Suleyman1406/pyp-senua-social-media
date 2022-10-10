import React from "react";
import styles from "./home.module.css";
import axios from "axios";
import { useQuery } from "react-query";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
const HomePage = () => {
  const { isLoading, isError, data, error } = useQuery(
    "users-posts",
    async () => {
      const { data } = await axios("https://randomuser.me/api/?results=10");
      return data.results;
    }
  );
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>{error}</h1>;
  }
  return (
    <div className={styles.container}>
      {data &&
        data.map((item, id) => {
          return (
            <div className={styles.card} key={item.id}>
              <header>
                <img
                  className={styles.profile}
                  src="https://media-exp1.licdn.com/dms/image/C5603AQEkiWewupNGQQ/profile-displayphoto-shrink_800_800/0/1538160028383?e=2147483647&v=beta&t=236vQLxb5dWdBLM-WMGKQmG_-_CErnk9iG18DIlYavk"
                  alt=""
                />
                <h1>{item.name?.first}</h1>
              </header>
              <main>
                <p>
                  What did the Dursleys care if Harry lost his place on the
                  House Quidditch team because he hadn’t practiced all summer?
                  What was it to the Dursleys if Harry went back to school
                  without any of his homework done? The Dursleys were what
                  wizards called Muggles (not a drop of magical blood in their
                  veins).
                </p>
                <img
                  src="https://code.edu.az/wp-content/uploads/2021/09/mezunlarimiz.jpeg"
                  alt=""
                />
              </main>
              <footer>
                <div style={{ display: "flex" }}>
                  <ThumbUpOffAltIcon />
                  <span style={{ marginTop: "2px", marginLeft: "3px" }}>2</span>
                </div>
              </footer>
            </div>
          );
        })}
    </div>
  );
};

export default HomePage;
