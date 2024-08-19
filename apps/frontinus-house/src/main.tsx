import React from "react";
import router from "@/router";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "./App.css";

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
