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
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.beasts.findFirst({
        where: eq(schema.beasts.token_id, input.id),
      });
    }),

  /*create: protectedProcedure
    .input(
      z.object({
        token_id: z.string().min(1),
        content: z.string().min(1),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.insert(schema.beasts).values(input);
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db.delete(schema.beasts).where(eq(schema.beasts.token_id, input));
  }),*/
});
