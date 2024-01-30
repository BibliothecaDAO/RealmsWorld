import { sql } from "drizzle-orm";
import { z } from "zod";

import type { SQL } from "@realms-world/db";
import { and, eq, schema } from "@realms-world/db";

//import { withCursorPagination } from "../cursorPagination";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const erc721AttributesRouter = createTRPCRouter({
  all: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        contractAddress: z.string().nullish(),
        cursor: z.string().nullish(),
        direction: z.string().nullish(),
        orderBy: z.string().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      //const limit = input.limit ?? 5000;
      //TODO add orderBy conditions
      const { contractAddress /*, orderBy, direction */ } = input;
      const whereFilter: SQL[] = [];

      if (contractAddress) {
        whereFilter.push(
          eq(schema.erc721AttributeKeys.collectionId, contractAddress),
        );
      }
      /*const {
        orderBy: orderByRes,
        limit: limitRes,
        where,
      } = withCursorPagination({
        limit: limit + 1,
        where: and(...whereFilter),
        cursors: [
          schema.erc721Attributes.id, // Column to use for cursor
          direction ?? "asc", // Sort order ('asc' or 'desc')
          cursor, // Cursor value
        ],
      });*/

      const items = await ctx.db
        .select({
          id: schema.erc721AttributeKeys.id,
          key: schema.erc721AttributeKeys.key,
          kind: schema.erc721AttributeKeys.kind,
          values: sql`array_agg(jsonb_build_object(
            'value',${schema.erc721Attributes.value}, 'tokenCount',${schema.erc721Attributes.tokenCount}))`.as(
            "values",
          ),
        })
        .from(schema.erc721AttributeKeys)
        .where(and(...whereFilter))
        .leftJoin(
          schema.erc721Attributes,
          eq(
            schema.erc721AttributeKeys.id,
            schema.erc721Attributes.attributeKeyId,
          ),
        )
        .groupBy(
          schema.erc721AttributeKeys.id,
          schema.erc721AttributeKeys.collectionId,
          schema.erc721AttributeKeys.key,
          schema.erc721AttributeKeys.kind,
        );

      /*const items = await ctx.db.query.erc721Attributes.findMany({
        ...withCursorPagination({
          limit: limit + 1,
          where: and(...whereFilter),
          cursors: cursors,
        }),
      });*/

      /*let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem!.value;
      }*/
      return {
        items,
        //nextCursor,
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
