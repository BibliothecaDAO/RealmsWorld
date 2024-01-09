import { authRouter } from "./router/auth";
import { bridgeRouter } from "./router/bridge";
import { erc721AttributesRouter } from "./router/erc721Attributes";
import { erc721ListingsRouter } from "./router/erc721Listings";
import { erc721TokensRouter } from "./router/erc721Tokens";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  erc721Tokens: erc721TokensRouter,
  bridge: bridgeRouter,
  erc721Listings: erc721ListingsRouter,
  erc721Attributes: erc721AttributesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
