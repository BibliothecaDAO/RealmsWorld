import GeneralError from "@/pages/error/general-error";
import NotFoundError from "@/pages/error/not-found-error";
import { createBrowserRouter } from "react-router-dom";

//import MaintenanceError from './pages/errors/maintenance-error'

const router = createBrowserRouter([
  // Main routes
  {
    path: "/",
    lazy: async () => {
      const AppShell = await import("@/components/app-shell");
      return { Component: AppShell.default };
    },
    errorElement: <GeneralError />,
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import("@/pages/overview")).default,
        }),
      },
      {
        path: "proposals",
        lazy: async () => ({
          Component: (await import("@/pages/proposals")).default,
        }),
        children: [],
      },
      {
        path: "proposals/:id",
        lazy: async () => ({
          Component: (await import("@/pages/proposals/[id]")).default,
        }),
      },
      {
        path: "rounds",
        lazy: async () => ({
          Component: (await import("@/pages/rounds")).default,
        }),
      },
      {
        path: "delegates",
        lazy: async () => ({
          Component: (await import("@/pages/delegates")).default,
        }),
      },
    ],
  },

  // Error routes
  { path: "/500", Component: GeneralError },
  { path: "/404", Component: NotFoundError },
  //{ path: '/503', Component: MaintenanceError },

  // Fallback 404 route
  { path: "*", Component: NotFoundError },
]);

export default router;
