import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";

const AdminAuthGuard = ({ children }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const currentUser = queryClient.getQueryData("user");
  const [hasAuth, setAuth] = useState(false);
  useEffect(() => {
    setAuth(false);
    if (!currentUser) {
      const user = localStorage.getItem("user");
      if (
        user &&
        Date.now() - JSON.parse(user ?? null).createdOn < 60 * 60 * 24 * 1000
      ) {
        queryClient.setQueryData("user", JSON.parse(user));

        if (JSON.parse(user ?? null)?.roles[0] === "ROLE_ADMIN") {
          setAuth(true);
        } else {
          navigate("/");
        }
      } else {
        localStorage.removeItem("user");
        queryClient.setQueryData("user", null);
        navigate("/login");
      }
    } else {
      setAuth(true);
    }
  }, [navigate, currentUser, queryClient]);
  if (!hasAuth) {
    return (
      <ThreeDots
        height="100"
        width="100"
        radius="9"
        color="rgb(187,37,37)"
        ariaLabel="three-dots-loading"
        wrapperStyle={{
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
        wrapperClassName=""
        visible={true}
      />
    );
  }
  return <>{children}</>;
};

export default AdminAuthGuard;
