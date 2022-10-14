import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

const AuthGuard = ({ children }) => {
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
        setAuth(true);
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
    return <div>Loading...</div>;
  }
  return <>{children}</>;
};

export default AuthGuard;
