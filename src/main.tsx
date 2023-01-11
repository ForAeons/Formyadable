import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App";
import { Content, Login, Signup, Profile, PageNotFound } from "./pages";
import { BACKEND_BASE_URL } from "./utility/global";

// specify config default baseURL
axios.defaults.baseURL = BACKEND_BASE_URL;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Content /> },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/profile/:userID",
        element: <Profile />,
      },
      {
        path: "/posts/:category",
        element: <Content />,
      },
      {
        path: "/*",
        element: <PageNotFound />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
