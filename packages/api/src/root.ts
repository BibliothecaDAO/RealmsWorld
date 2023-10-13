import { authRouter } from "./router/auth";
import { beastsRouter } from "./router/beasts";
import { bridgeRouter } from "./router/bridge";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  beasts: beastsRouter,
  bridge: bridgeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
