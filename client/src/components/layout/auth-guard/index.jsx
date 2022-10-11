import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

const AuthGuard = ({ children }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const currentUser = queryClient.getQueryData("user");
  useEffect(() => {
    if (!currentUser) {
      const user = localStorage.getItem("user");
      if (
        user &&
        Date.now() - JSON.parse(user).createdOn < 60 * 60 * 24 * 1000
      ) {
        queryClient.setQueryData("user", JSON.parse(user));
      } else {
        localStorage.removeItem("user");
        queryClient.setQueryData("user", null);
        navigate("/login");
      }
    }
  }, [navigate, currentUser, queryClient]);
  return <>{children}</>;
};

export default AuthGuard;
