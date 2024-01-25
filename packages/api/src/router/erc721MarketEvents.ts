import { sql } from "drizzle-orm";
import { z } from "zod";

import type { SQL } from "@realms-world/db";
import { and, asc, desc, eq, gte, lte, schema } from "@realms-world/db";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const erc721MarketEventsRouter = createTRPCRouter({
  all: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.number().nullish(), // <-- "cursor" needs to exist, but can be any type
        //owner: z.string().nullish(), TODO from address
        token_key: z.string().nullish(),
        orderBy: z.string().nullish(),
        direction: z.string().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 50;
      //TODO add orderBy conditions
      const {
        cursor,
        /* contractAddress, owner, orderBy, block,*/ direction,
        token_key,
      } = input;
      const whereFilter: SQL[] = [];
      const orderByFilter: SQL[] = [];
      if (direction === "asc") {
        orderByFilter.push(asc(schema.erc721MarketEvents.token_id));
      } else {
        orderByFilter.push(desc(schema.erc721MarketEvents.id));
      }

      if (token_key) {
        whereFilter.push(eq(schema.erc721MarketEvents.token_key, token_key));
      }
      /*if (owner) {
        whereFilter.push(eq(schema.erc721Tokens.owner, owner.toLowerCase()));
      }*/
      if (cursor) {
        whereFilter.push(
          direction === "asc"
            ? gte(schema.erc721MarketEvents.id, cursor)
            : lte(schema.erc721MarketEvents.id, cursor),
        );
      } /* else {
        whereFilter.push(lte(schema.erc721Tokens.token_id, cursor));
      }
      if (!block) {
        whereFilter.push(sql`upper_inf(_cursor)`);
      }*/
      const items = await ctx.db.query.erc721MarketEvents.findMany({
        limit: limit + 1,
        where: and(...whereFilter),
        orderBy: orderByFilter,
        with: {
          token: true,
        },
      });
      console.log(items);
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
