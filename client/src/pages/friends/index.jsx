import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import SingleUser from "components/pages/single-user";
import AddModal from "components/pages/add-modal";
import RequestsModal from "components/pages/requests-modal";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

const FriendsPage = () => {
  const [addModal, setAddModal] = useState(false);
  const [reqModal, setReqModal] = useState(false);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        maxWidth="sm"
        style={{
          height: "90vh",
          backgroundColor: "#eff3f4",
          marginTop: "20px",
        }}
      >
        <Stack
          style={{ marginTop: "40px", marginLeft: "20px" }}
          spacing={2}
          direction="row"
        >
          <Button
            style={{ width: "250px", marginTop: "22px" }}
            size="large"
            variant="outlined"
            onClick={() => setAddModal(!addModal)}
          >
            Add Friends
          </Button>
          <Button
            style={{ width: "250px", marginTop: "22px" }}
            size="large"
            variant="contained"
            onClick={() => setReqModal(!reqModal)}
          >
            Requests
          </Button>
        </Stack>
        <Container
          maxWidth="sm"
          style={{
            height: "70vh",
            backgroundColor: "#fff",
            marginTop: "20px",
            overflowY: "scroll",
          }}
        >
          <SingleUser />
        </Container>
      </Container>
      {addModal && <AddModal setAddModal={setAddModal} />}
      {reqModal && <RequestsModal setReqModal={setReqModal} />}
    </React.Fragment>
  );
};

export default FriendsPage;
