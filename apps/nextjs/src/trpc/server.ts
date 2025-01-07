import type { AppRouter } from "@realms-world/api";
import { cache } from "react";
import { headers } from "next/headers";
import { createCaller, createTRPCContext } from "@realms-world/api";
import { auth } from "@realms-world/auth";
import { createHydrationHelpers } from "@trpc/react-query/rsc";

import { createQueryClient } from "./query-client";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
  const headers2 = await headers();
  const heads = new Headers(headers2);
  heads.set("x-trpc-source", "rsc");

  return createTRPCContext({
    session: await auth(),
    headers: heads,
  });
});

const getQueryClient = cache(createQueryClient);
const caller = createCaller(createContext);

export const { trpc: api, HydrateClient } = createHydrationHelpers<AppRouter>(
  caller,
  getQueryClient,
);
