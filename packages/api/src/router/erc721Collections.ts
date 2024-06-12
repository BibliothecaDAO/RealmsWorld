import { sum } from "drizzle-orm";
import { z } from "zod";

import { and, asc, eq, gt, min, sql } from "@realms-world/db";
import { erc721Collections, erc721MarketEvents } from "@realms-world/db/schema";

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
        orderByFilter.push(asc(erc721MarketEvents.token_id));
      } else {
        orderByFilter.push(desc(erc721MarketEvents.id));
      }*/
      const fp = ctx.db
        .select({
          floorPrice: min(erc721MarketEvents.price).as("floorPrice"),
          collectionId: erc721MarketEvents.collection_id,
        })
        .from(erc721MarketEvents)
        .where(
          and(
            eq(erc721MarketEvents.status, "open"),
            eq(erc721MarketEvents.active, true),
            gt(erc721MarketEvents.expiration, sql`EXTRACT(EPOCH FROM now())`),
            sql`upper_inf(_cursor)`,
          ),
        )
        .groupBy(erc721MarketEvents.collection_id)
        .orderBy(asc(min(erc721MarketEvents.price)))
        .as("fp");
      //console.log(fp)

      const items = await ctx.db
        .select({
          marketplaceId: erc721Collections.marketplaceId,
          volume: sum(erc721MarketEvents.price),
          floorPrice: fp.floorPrice,
        })
        .from(erc721Collections)
        .where(and(eq(erc721MarketEvents.status, "filled")))
        .leftJoin(
          erc721MarketEvents,
          eq(erc721MarketEvents.collection_id, erc721Collections.marketplaceId),
        )
        .leftJoin(fp, eq(fp.collectionId, erc721Collections.marketplaceId))
        .limit(limit)
        .groupBy(erc721Collections.marketplaceId, fp.floorPrice);

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
          marketplaceId: erc721Collections.marketplaceId,
          volume: sum(erc721MarketEvents.price),
        })
        .from(erc721Collections)
        .where(
          and(
            eq(erc721Collections.id, input.id),
            eq(erc721MarketEvents.status, "filled"),
          ),
        )
        .leftJoin(
          erc721MarketEvents,
          eq(erc721MarketEvents.collection_id, erc721Collections.marketplaceId),
        )
        .groupBy(erc721Collections.marketplaceId);
    }),
});
