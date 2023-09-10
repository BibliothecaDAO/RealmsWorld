import { authRouter } from "./router/auth";
import { beastsRouter } from "./router/beasts";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  beasts: beastsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
