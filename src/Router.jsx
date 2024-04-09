import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Games from "./pages/Games";
import Leaderboard from "./pages/Leaderboard";
import { useState } from 'react'
// import ErrorPage from "./ErrorPage";

const Router = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Games />,
      // errorElement: <ErrorPage />,
    },
    {
      path: "/level",
      element: <App />,
      // errorElement: <ErrorPage />,
    },
    {
      path: "/leaderboard",
      element: <Leaderboard />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;