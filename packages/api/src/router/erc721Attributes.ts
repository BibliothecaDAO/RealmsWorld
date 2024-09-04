import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import type { SQL } from "@realms-world/db";
import { and, eq, sql } from "@realms-world/db";
import {
  erc721AttributeKeys,
  erc721Attributes,
  erc721Tokens,
} from "@realms-world/db/schema";

//import { withCursorPagination } from "../cursorPagination";
import { publicProcedure } from "../trpc";

export const erc721AttributesRouter = {
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
        whereFilter.push(eq(erc721AttributeKeys.collectionId, contractAddress));
      }
      /*const {
        orderBy: orderByRes,
        limit: limitRes,
        where,
      } = withCursorPagination({
        limit: limit + 1,
        where: and(...whereFilter),
        cursors: [
          erc721Attributes.id, // Column to use for cursor
          direction ?? "asc", // Sort order ('asc' or 'desc')
          cursor, // Cursor value
        ],
      });*/

      const items = await ctx.db
        .select({
          id: erc721AttributeKeys.id,
          key: erc721AttributeKeys.key,
          kind: erc721AttributeKeys.kind,
          values: sql`array_agg(jsonb_build_object(
            'value',${erc721Attributes.value}, 'tokenCount',${erc721Attributes.tokenCount}))`.as(
            "values",
          ),
        })
        .from(erc721AttributeKeys)
        .where(and(...whereFilter))
        .leftJoin(
          erc721Attributes,
          eq(erc721AttributeKeys.id, erc721Attributes.attributeKeyId),
        )
        .groupBy(
          erc721AttributeKeys.id,
          erc721AttributeKeys.collectionId,
          erc721AttributeKeys.key,
          erc721AttributeKeys.kind,
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
        where: and(eq(erc721Tokens.id, input.id), sql`upper_inf(_cursor)`),
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
} satisfies TRPCRouterRecord;
