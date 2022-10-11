import Root from "components/layout/root";
import ChatPage from "pages/chat";
import FriendsPage from "pages/friends";
import HomePage from "pages/home";
import LoginPage from "pages/login";
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
]);
