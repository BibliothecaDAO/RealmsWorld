import { sql, sum } from "drizzle-orm";
import { z } from "zod";

import type { SQL } from "@realms-world/db";
import {
  and,
  asc,
  desc,
  eq,
  isNotNull,
  isNull,
  lte,
  schema,
} from "@realms-world/db";
import { padAddress } from "@realms-world/utils";

import { withCursorPagination } from "../cursorPagination";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const erc721CollectionsRouter = createTRPCRouter({
  all: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        direction: z.string().nullish(),
        orderBy: z.string().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 5000;
      //TODO add orderBy conditions
      const { orderBy, direction } = input;
      /*const orderByFilter: SQL[] = [];
      if (direction === "asc") {
        orderByFilter.push(asc(schema.erc721MarketEvents.token_id));
      } else {
        orderByFilter.push(desc(schema.erc721MarketEvents.id));
      }*/

      const items = await ctx.db.query.erc721Collections.findMany({
        limit: limit,
        //orderBy: orderByFilter
      });

      return {
        items,
      };
    }),

  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db
        .select({
          marketplaceId: schema.erc721Collections.marketplaceId,
          volume: sum(schema.erc721MarketEvents.price),
        })
        .from(schema.erc721Collections)
        .where(
          and(
            eq(schema.erc721Collections.id, input.id),
            eq(schema.erc721MarketEvents.status, "filled"),
          ),
        )
        .leftJoin(
          schema.erc721MarketEvents,
          eq(
            schema.erc721MarketEvents.collection_id,
            schema.erc721Collections.marketplaceId,
          ),
        )
        .groupBy(schema.erc721Collections.marketplaceId);
    }),
});
