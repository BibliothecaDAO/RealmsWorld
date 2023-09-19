import { z } from "zod";

import { asc, eq, schema } from "@realms-world/db";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const beastsRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    // return ctx.db.select().from(schema.post).orderBy(desc(schema.post.id));
    return ctx.db.query.beasts.findMany({
      orderBy: asc(schema.beasts.token_id),
    });
  }),

  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.beasts.findFirst({
        where: eq(schema.beasts.token_id, input.id),
      });
    }),
});
