import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "routes";
import {PostModuleProvider} from './context/postModuleContext'
import { QueryClient, QueryClientProvider } from "react-query";
import "./index.css";
const queryClient = new QueryClient({});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <PostModuleProvider>
      <RouterProvider router={router} />
    </PostModuleProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
