import { authRouter } from "./router/auth";
import { bridgeRouter } from "./router/bridge";
import { erc721AttributesRouter } from "./router/erc721Attributes";
import { erc721BridgeRouter } from "./router/erc721Bridge";
import { erc721CollectionsRouter } from "./router/erc721Collections";
import { erc721MarketEventsRouter } from "./router/erc721MarketEvents";
import { erc721TokensRouter } from "./router/erc721Tokens";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  erc721Tokens: erc721TokensRouter,
  bridge: bridgeRouter,
  erc721Bridge: erc721BridgeRouter,
  erc721MarketEvents: erc721MarketEventsRouter,
  erc721Attributes: erc721AttributesRouter,
  erc721Collections: erc721CollectionsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
