import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import type { SQL } from "@realms-world/db";
import { desc, eq, or } from "@realms-world/db";
import { erc721_bridge } from "@realms-world/db/schema";

import { publicProcedure } from "../trpc";

export const erc721BridgeRouter = {
  all: publicProcedure
    .input(
      z
        .object({
          l1Account: z.string().nullish(),
          l2Account: z.string().nullish(),
        })
        .partial(),
    )
    .query(({ ctx, input }) => {
      const { l1Account, l2Account } = input;
      const whereFilter: SQL[] = [];
      if (l1Account) {
        whereFilter.push(
          eq(erc721_bridge.l1Account, input.l1Account?.toLowerCase() ?? ""),
        );
      }
      if (l2Account) {
        whereFilter.push(eq(erc721_bridge.l2Account, input.l2Account ?? ""));
      }
      // return ctx.db.select().from(schema.post).orderBy(desc(schema.post.id));
      return ctx.db.query.erc721_bridge.findMany({
        where: or(...whereFilter),
        orderBy: desc(erc721_bridge.timestamp),
      });
    }),

  byHash: publicProcedure
    .input(z.object({ hash: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.erc721_bridge.findFirst({
        where: eq(erc721_bridge.hash, input.hash),
      });
    }),
} satisfies TRPCRouterRecord;
