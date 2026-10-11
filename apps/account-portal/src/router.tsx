import { DefaultCatchBoundary } from "@/components/layout/default-catch-boundary";
import { NotFound } from "@/components/layout/not-found";
import { QueryClient } from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";

import { routeTree } from "./routeTree.gen";

export function getRouter() {
  const queryClient = new QueryClient();

  const router = createTanStackRouter({
    routeTree,
    context: {
      queryClient,
      session: {
        address: "0x123",
        chain: "mainnet",
        provider: "starknet",
      },
    },
    defaultPreload: "intent",
    // Cross-fade main content on navigation (styles.css scopes it to #main-content).
    defaultViewTransition: true,
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: () => <NotFound />,
    //scrollRestoration: true,
  });
  setupRouterSsrQueryIntegration({ router, queryClient });

  return router;
}

// Backward-compatible alias for older local imports.
export const createRouter = getRouter;

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
