import { z } from "zod";

import { asc, eq, gt, schema } from "@realms-world/db";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const beastsRouter = createTRPCRouter({
  all: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.number().nullish(), // <-- "cursor" needs to exist, but can be any type
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 50;
      const { cursor } = input;

      const items = await ctx.db.query.beasts.findMany({
        limit: limit + 1,
        where: cursor
          ? gt(schema.beasts.token_id, cursor)
          : gt(schema.beasts.token_id, 0),
        orderBy: asc(schema.beasts.token_id),
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem!.token_id;
      }
      return {
        items,
        nextCursor,
      };
    }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.beasts.findFirst({
        where: eq(schema.beasts.token_id, input.id),
      });
    }),
});
