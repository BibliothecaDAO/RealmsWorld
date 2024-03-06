import { z } from "zod";

import type { SQL } from "@realms-world/db";
import { and, eq, inArray, schema, sql } from "@realms-world/db";

import { withCursorPagination } from "../cursorPagination";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const erc721MarketEventsRouter = createTRPCRouter({
  all: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.union([z.number().nullish(), z.date().nullish()]), // <-- "cursor" needs to exist, but can be any type
        //owner: z.string().nullish(), TODO from address
        collectionId: z.number().nullish(),
        token_key: z.string().nullish(),
        orderBy: z.string().nullish(),
        status: z.array(z.enum(["open", "filled", "cancelled"])).nullish(),
        direction: z.string().nullish(),
        upper_inf: z.boolean().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 50;
      //TODO add orderBy conditions
      const {
        cursor,
        /* contractAddress, owner, , block,*/ direction,
        upper_inf,
        orderBy,
        token_key,
        collectionId,
        status,
      } = input;
      const whereFilter: SQL[] = [];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let cursors: any[] = [
        [
          schema.erc721MarketEvents.id, // Column to use for cursor
          direction ?? "desc", // Sort order ('asc' or 'desc')
          cursor, // Cursor value
        ],
      ];
      if (orderBy == "timestamp") {
        cursors = [
          [
            schema.erc721MarketEvents.updated_at, // Column to use for cursor
            direction ?? "desc", // Sort order ('asc' or 'desc')
            cursor, // Cursor value
          ],
        ];
      }
      /*if (direction === "asc") {
        orderByFilter.push(asc(schema.erc721MarketEvents.token_id));
      } else {
        if (orderBy == "timestamp") {
          orderByFilter.push(desc(schema.erc721MarketEvents.updated_at));
        } else {
          orderByFilter.push(desc(schema.erc721MarketEvents.id));
        }
      }*/

      if (token_key) {
        whereFilter.push(eq(schema.erc721MarketEvents.token_key, token_key));
      }
      if (collectionId) {
        whereFilter.push(
          eq(schema.erc721MarketEvents.collection_id, collectionId),
        );
      }
      if (status?.length && status[0] != undefined) {
        whereFilter.push(inArray(schema.erc721MarketEvents.status, status));
      }
      /*if (owner) {
        whereFilter.push(eq(schema.erc721Tokens.owner, owner.toLowerCase()));
      }*/
      /* else {
        whereFilter.push(lte(schema.erc721Tokens.token_id, cursor));
      }*/
      if (upper_inf) {
        whereFilter.push(sql`upper_inf(_cursor)`);
      }
      const items = await ctx.db.query.erc721MarketEvents.findMany({
        ...withCursorPagination({
          limit: limit + 1,
          where: and(...whereFilter),
          //@ts-expect-error incorrect cursors
          cursors: cursors,
        }),
        with: {
          token: {
            //@ts-expect-error should allow where on relationship
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
            where: (token, { sql }) => sql`upper_inf(_cursor)`,
          },
        },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor =
          orderBy == "timestamp" ? nextItem!.updated_at : nextItem!.id;
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
