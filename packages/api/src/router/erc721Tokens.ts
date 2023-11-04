import { z } from "zod";

import type { SQL } from "@realms-world/db";
import { and, asc, eq, gt, gte, schema } from "@realms-world/db";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const erc721TokensRouter = createTRPCRouter({
  all: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.number().nullish(), // <-- "cursor" needs to exist, but can be any type
        contractAddress: z.string().nullish(),
        owner: z.string().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 50;
      const { cursor, contractAddress, owner } = input;
      const where: SQL[] = [];
      if (contractAddress) {
        where.push(
          eq(
            schema.erc721Tokens.contract_address,
            contractAddress.toLowerCase(),
          ),
        );
      }
      if (owner) {
        where.push(eq(schema.erc721Tokens.owner, owner.toLowerCase()));
      }
      const items = await ctx.db.query.erc721Tokens.findMany({
        limit: limit + 1,
        where: and(
          cursor
            ? gte(schema.erc721Tokens.token_id, cursor)
            : gte(schema.erc721Tokens.token_id, 0),
          ...where,
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
