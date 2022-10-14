import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { ThreeDots } from "react-loader-spinner";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Invitation() {
  const [count, setCount] = useState(false);
  const queryClient = useQueryClient();

  const user = JSON.parse(localStorage.getItem("user"));
  const { isLoading, data, refetch } = useQuery("user-requests", async () => {
    const { data } = await axios.get(
      process.env.REACT_APP_SERVER_BASE_URL + "/api/requests/all",
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
        wrapperStyle={{ justifyContent: "center", margin: 20 }}
        wrapperClassName=""
        visible={true}
      />
    );

  function AcceptReq(item) {
    const user = JSON.parse(localStorage.getItem("user"));
    axios
      .post(
        `${process.env.REACT_APP_SERVER_BASE_URL}/api/requests/confirm/${item.id}`,
        {},
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
          queryClient.invalidateQueries(["user-friends"]);
        }
      });
  }

  function IgnoreReq(item) {
    const user = JSON.parse(localStorage.getItem("user"));
    axios
      .post(
        `${process.env.REACT_APP_SERVER_BASE_URL}/api/requests/ignore/${item.id}`,
        {},
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
          queryClient.invalidateQueries(["user-friends"]);
        }
      });
    setCount(!count);
  }

  return (
    <List sx={{ width: "100%", maxWidth: 500, bgcolor: "background.paper" }}>
      {data?.map((item) => {
        return (
          <>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary={item.username}
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
                      sx={{}}
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
                          textTransform: "capitalize",
                        }}
                        variant="contained"
                        onClick={() => AcceptReq(item)}
                      >
                        Accept
                      </Button>
                    </Typography>
                    <Typography
                      sx={{}}
                      component="span"
                      variant="body2"
                      color="text.primary"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <Button
                        size="small"
                        style={{
                          marginTop: "-31px",
                          fontSize: "13px",
                          marginRight: "-8rem",
                          textTransform: "capitalize",
                        }}
                        variant="outlined"
                        onClick={() => IgnoreReq(item)}
                      >
                        Ignore
                      </Button>
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </>
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
          You don't have any request
        </p>
      )}
    </List>
  );
}
