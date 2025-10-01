import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import App from "./App";
import Home from "./routes/Home.tsx";
import About from "./routes/About.tsx";

// 1. define the routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> }, // default route = /
      { path: "about", element: <About /> }, // /about route
    ],
  },
]);

// 2. render the router
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
