import { authRouter } from "./router/auth";
import { bridgeRouter } from "./router/bridge";
import { erc721TokensRouter } from "./router/erc721Tokens";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  erc721Tokens: erc721TokensRouter,
  bridge: bridgeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
