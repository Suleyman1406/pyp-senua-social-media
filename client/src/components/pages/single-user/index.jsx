import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import { ThreeDots } from "react-loader-spinner";
import DefPerson from "images/defPerson.jpg";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useQuery } from "react-query";
import toast from "react-hot-toast";
import axios from "axios";

export default function SingleUser() {
  const user = JSON.parse(localStorage.getItem("user"));

  const { isLoading, data, refetch } = useQuery("user-friends", async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_SERVER_BASE_URL + "/api/user/friends/all",
      {
        headers: {
          "x-access-token": user?.token,
          "content-type": "application/json",
        },
      }
    );
    return data;
  });

  if (isLoading)
    return (
      <ThreeDots
        height="70"
        width="70"
        radius="9"
        color="rgb(187,37,37)"
        ariaLabel="three-dots-loading"
        wrapperStyle={{
          justifyContent: "center",
          height: "90%",
          alignItems: "center",
        }}
        wrapperClassName=""
        visible={true}
      />
    );

  function unfriend(item) {
    if (!window.confirm(`Are you sure delete ${item.name} from friends`))
      return;
    const user = JSON.parse(localStorage.getItem("user"));
    axios
      .delete(
        `${process.env.REACT_APP_SERVER_BASE_URL}/api/user/friends/${item.id}`,
        {
          headers: {
            "x-access-token": user?.token,
            "content-type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
          refetch();
        }
      });
  }

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 500,
        bgcolor: "background.paper",
      }}
    >
      {data?.map((item, idx) => {
        console.log(item);
        return (
          <React.Fragment key={idx}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt="Remy Sharp"
                  src={
                    item?.profilePhotoURL
                      ? `${process.env.REACT_APP_SERVER_BASE_URL}/${item?.profilePhotoURL}`
                      : DefPerson
                  }
                />
              </ListItemAvatar>
              <ListItemText
                primary={item.name ?? "This user has no name"}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {item.email}
                    </Typography>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <Button
                        size="small"
                        style={{
                          marginTop: "-30px",
                          fontSize: "13px",
                          backgroundColor: "#000",
                        }}
                        variant="contained"
                        onClick={() => unfriend(item)}
                      >
                        Unfriend
                      </Button>
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        );
      })}
      {(!data || data.length === 0) && (
        <p
          style={{
            marginTop: "30px",
            textAlign: "center",
            fontSize: "1.5rem",
            fontWeight: "600",
            color: "gray",
          }}
        >
          You don't have any friend :(
        </p>
      )}
    </List>
  );
}
