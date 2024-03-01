import { sql } from "drizzle-orm";
import { z } from "zod";

import type { SQL } from "@realms-world/db";
import { and, eq, inArray, isNull, schema } from "@realms-world/db";
import { padAddress } from "@realms-world/utils";

import { withCursorPagination } from "../cursorPagination";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const erc721TokensRouter = createTRPCRouter({
  all: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z
          .object({
            token_id: z.number().nullish(),
            price: z.string().nullish(),
          })
          .nullish(), // <-- "cursor" needs to exist, but can be any type
        contractAddress: z.string().nullish(),
        owner: z.string().nullish(),
        orderBy: z.string().nullish(),
        direction: z.string().nullish(),
        block: z.number().nullish(),
        listings: z.boolean().nullish(),
        attributeFilter: z.record(z.string(), z.string()).nullish(),
        activeListing: z.boolean().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 50;
      //TODO add orderBy conditions
      const {
        cursor,
        contractAddress,
        owner,
        orderBy,
        block,
        direction,
        attributeFilter,
      } = input;
      const whereFilter: SQL[] = [];
      const cursors = [];
      console.log(cursor)
      if (orderBy == "tokenId") {
        cursors.push([
          schema.erc721Tokens.token_id, // Column to use for cursor
          direction ?? "desc", // Sort order ('asc' or 'desc')
          cursor?.token_id, // Cursor value
        ]);
      } else {
        if (
          cursor == undefined ||
          (cursor?.token_id != 0 && cursor?.price != null)
        ) {
          cursors.push(
            [
              schema.erc721Tokens.price, // Column to use for cursor
              direction ?? "asc", // Sort order ('asc' or 'desc')
              cursor?.price, // Cursor value
            ],
            [
              schema.erc721Tokens.token_id, // Column to use for cursor
              direction ?? "asc", // Sort order ('asc' or 'desc')
              cursor?.token_id, // Cursor value
            ],
          );
        } else {
          cursors.push([
            schema.erc721Tokens.token_id, // Column to use for cursor
            direction ?? "asc", // Sort order ('asc' or 'desc')
            cursor?.token_id, // Cursor value
          ]);
          whereFilter.push(isNull(schema.erc721Tokens.price));
        }
      }

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
      if (!block) {
        whereFilter.push(sql`upper_inf(_cursor)`);
      }
      if (attributeFilter && Object.keys(attributeFilter).length !== 0) {
        const attributesObject: SQL[] = [];
        for (const [key, value] of Object.entries(attributeFilter)) {
          attributesObject.push(
            eq(schema.erc721TokenAttributes.value, value),
            eq(schema.erc721TokenAttributes.key, key),
          );
        }
        whereFilter.push(
          inArray(
            schema.erc721Tokens.id,
            ctx.db
              .select({ id: schema.erc721TokenAttributes.token_key })
              .from(schema.erc721TokenAttributes)
              .where(and(...attributesObject)),

            //.where(and(...attributesObject)),
          ),
        );
      }
      /*const items = await ctx.db
        .select({
          id: schema.erc721Tokens.id,
          key: schema.erc721Tokens.key,
          kind: schema.erc721Tokens.kind,
        })
*/
      const items = await ctx.db.query.erc721Tokens.findMany({
        ...withCursorPagination({
          limit: limit + 1,
          where: and(...whereFilter),
          //@ts-expect-error cursor can be single
          cursors: cursors,
        }),
        with: {
          attributes: true,
          listings: true,
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop();
        const nextTokenId =
          direction == "dsc" ? nextItem!.token_id + 1 : nextItem!.token_id - 1;
        nextCursor = {
          token_id: nextTokenId,
          price: nextItem!.price,
        };
      } else if (cursor?.price) {
        nextCursor = { token_id: 0, price: null };
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
            where: (listings, { sql }) => sql`upper_inf(_cursor)`,
            orderBy: (listings, { asc }) => asc(listings.price),
          },
          transfers: true,
          attributes: true,
        },
      });
    }),
});
