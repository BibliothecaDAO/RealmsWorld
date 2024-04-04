import { sum } from "drizzle-orm";
import { z } from "zod";

import { and, asc, eq, gt, min, schema, sql } from "@realms-world/db";

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
      const limit = input.limit ?? 15;
      //TODO add orderBy conditions
      //const { orderBy, direction } = input;
      /*const orderByFilter: SQL[] = [];
      if (direction === "asc") {
        orderByFilter.push(asc(schema.erc721MarketEvents.token_id));
      } else {
        orderByFilter.push(desc(schema.erc721MarketEvents.id));
      }*/
      const fp = ctx.db
      .select({
        floorPrice: min(schema.erc721MarketEvents.price).as('floorPrice'),
        collectionId: schema.erc721MarketEvents.collection_id,
      })
      .from(schema.erc721MarketEvents)
      .where(
        and(
          eq(schema.erc721MarketEvents.status, "open"),
          eq(schema.erc721MarketEvents.active, true),
          gt(schema.erc721MarketEvents.expiration, sql`EXTRACT(EPOCH FROM now())`),
          sql`upper_inf(_cursor)`
        ),
      )
      .groupBy(schema.erc721MarketEvents.collection_id)
      .orderBy(asc(min(schema.erc721MarketEvents.price)))
      .as('fp')
      //console.log(fp)

      const items = await ctx.db
        .select({
          marketplaceId: schema.erc721Collections.marketplaceId,
          volume: sum(schema.erc721MarketEvents.price),
          floorPrice: fp.floorPrice
        })
        .from(schema.erc721Collections)
        .where(and(eq(schema.erc721MarketEvents.status, "filled")))
        .leftJoin(
          schema.erc721MarketEvents,
          eq(
            schema.erc721MarketEvents.collection_id,
            schema.erc721Collections.marketplaceId,
          ),
        )
        .leftJoin(fp, eq(fp.collectionId, schema.erc721Collections.marketplaceId))
        .limit(limit)
        .groupBy(schema.erc721Collections.marketplaceId, fp.floorPrice)

      /*await ctx.db.query.erc721Collections.findMany({
        limit: limit,
        //orderBy: orderByFilter
      });*/

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
          lowestPrice: min(schema.erc721MarketEvents.price), // Add the lowest price for each collection
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
