import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App"; // Import your updated App component
import "./index.css"; // Import global styles


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Use App directly as the home page
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
