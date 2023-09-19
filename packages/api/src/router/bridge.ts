import { z } from "zod";

import { asc, eq, or, schema } from "@realms-world/db";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const bridgeRouter = createTRPCRouter({
  all: publicProcedure
    .input(z.object({ l1Account: z.string(), l2Account: z.string() }).partial())
    .query(({ ctx, input }) => {
      // return ctx.db.select().from(schema.post).orderBy(desc(schema.post.id));
      return ctx.db.query.bridge.findMany({
        where: or(
          eq(schema.bridge.l1Account, input.l1Account?.toLowerCase() ?? ""),
          eq(schema.bridge.l2Account, input.l2Account ?? ""),
        ),
        orderBy: asc(schema.bridge.timestamp),
      });
    }),

  byHash: publicProcedure
    .input(z.object({ hash: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.bridge.findFirst({
        where: eq(schema.bridge.hash, input.hash),
      });
    }),
});
