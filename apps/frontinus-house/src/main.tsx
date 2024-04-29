import React from "react";
import router from "@/router";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "./App.css";
import "@realms-world/styles/globals.css";

import { SpaceProvider } from "./components/space-provider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SpaceProvider>
      <RouterProvider router={router} />
    </SpaceProvider>
  </React.StrictMode>,
);
