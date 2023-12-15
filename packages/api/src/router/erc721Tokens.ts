import { sql } from "drizzle-orm";
import { z } from "zod";

import type { SQL } from "@realms-world/db";
import { and, asc, desc, eq, gte, lte, schema } from "@realms-world/db";
import { padAddress } from "@realms-world/utils";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const erc721TokensRouter = createTRPCRouter({
  all: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.number().nullish(), // <-- "cursor" needs to exist, but can be any type
        contractAddress: z.string().nullish(),
        owner: z.string().nullish(),
        orderBy: z.string().nullish(),
        direction: z.string().nullish(),
        block: z.number().nullish(),
        listings: z.boolean().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 50;
      //TODO add orderBy conditions
      const { cursor, contractAddress, owner, orderBy, block, direction } =
        input;
      const whereFilter: SQL[] = [];

      const orderByVariable =
        orderBy == "floorAskPrice"
          ? schema.erc721Tokens.price
          : schema.erc721Tokens.token_id;
      const orderByFilter: SQL =
        direction === "asc" ? asc(orderByVariable) : desc(orderByVariable);

      /*if (direction === "asc") {
        orderByFilter = asc(orderByVariable);
      } else {
        orderByFilter = desc(orderByVariable);
      }*/

      if (contractAddress) {
        whereFilter.push(
          eq(
            schema.erc721Tokens.contract_address,
            contractAddress.toLowerCase(),
          ),
        );
      }

      if (owner) {
        whereFilter.push(
          eq(schema.erc721Tokens.owner, padAddress(owner.toLowerCase())),
        );
      }
      if (cursor) {
        whereFilter.push(
          direction === "asc"
            ? gte(schema.erc721Tokens.token_id, cursor)
            : lte(schema.erc721Tokens.token_id, cursor),
        );
      } /* else {
        whereFilter.push(lte(schema.erc721Tokens.token_id, cursor));
      }*/
      if (!block) {
        whereFilter.push(sql`upper_inf(_cursor)`);
      }

      const items = await ctx.db.query.erc721Tokens.findMany({
        limit: limit + 1,
        where: and(...whereFilter),
        orderBy: orderByFilter,
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
        where: and(
          eq(schema.erc721Tokens.id, input.id),
          sql`upper_inf(_cursor)`,
        ),
        with: {
          listings: {
            where: (listings, { sql }) =>
              and(sql`upper_inf(_cursor)`, eq(listings.active, true)),
            orderBy: (listings, { asc }) => asc(listings.price),
          },
          transfers: true,
        },
      });
    }),
});
