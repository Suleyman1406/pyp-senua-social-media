import Root from "components/layout/root";
import ChatPage from "pages/chat";
import ForgotPassword from "pages/forgot-password";
import FriendsPage from "pages/friends";
import HomePage from "pages/home";
import LoginPage from "pages/login";
import Profile from "pages/profile";
import SignUpPage from "pages/signup";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "friends",
        element: <FriendsPage />,
      },
      {
        path: "chat",
        element: <ChatPage />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
]);
