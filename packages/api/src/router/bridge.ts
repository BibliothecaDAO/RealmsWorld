import { z } from "zod";

import type { SQL } from "@realms-world/db";
import { desc, eq, or } from "@realms-world/db";
import { bridge } from "@realms-world/db/schema";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const bridgeRouter = createTRPCRouter({
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
          eq(bridge.l1Account, input.l1Account?.toLowerCase() ?? ""),
        );
      }
      if (l2Account) {
        whereFilter.push(eq(bridge.l2Account, input.l2Account ?? ""));
      }
      // return ctx.db.select().from(schema.post).orderBy(desc(schema.post.id));
      return ctx.db.query.bridge.findMany({
        where: or(...whereFilter),
        orderBy: desc(bridge.timestamp),
      });
    }),

  byHash: publicProcedure
    .input(z.object({ hash: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.bridge.findFirst({
        where: eq(bridge.hash, input.hash),
      });
    }),
});
