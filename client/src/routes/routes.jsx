import {
    createBrowserRouter
  } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Cover from "../pages/Cover";

export const router = createBrowserRouter([
    {
      path: "/login",
      element: <div><Login/></div>,
  },
  {
    path: "/",
    element: <div><Register/></div>,
  },
  {
    path: "/home",
    element: <div><Home/></div>,
  },
  {
    path: "/cover",
    element: <div><Cover/></div>,
  }
  ]);