import { z } from "zod";

import { and, asc, eq, exists, gt, schema } from "@realms-world/db";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const erc721TokensRouter = createTRPCRouter({
  all: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.number().nullish(), // <-- "cursor" needs to exist, but can be any type
        contractAddress: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 50;
      const { cursor, contractAddress } = input;
      const items = await ctx.db.query.erc721Tokens.findMany({
        limit: limit + 1,
        where: and(
          cursor
            ? gt(schema.erc721Tokens.token_id, cursor)
            : gt(schema.erc721Tokens.token_id, 0),
          contractAddress
            ? eq(schema.erc721Tokens.contract_address, contractAddress)
            : exists(schema.erc721Tokens.contract_address),
        ),
        orderBy: asc(schema.erc721Tokens.token_id),
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
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.erc721Tokens.findFirst({
        where: eq(schema.erc721Tokens.id, input.id),
      });
    }),
});
