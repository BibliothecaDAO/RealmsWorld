import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import type { SQL } from "@realms-world/db";
import { and, eq, inArray, isNotNull, isNull, sql } from "@realms-world/db";
import { erc721TokenAttributes, erc721Tokens } from "@realms-world/db/schema";
import { padAddress } from "@realms-world/utils";

import { withCursorPagination } from "../cursorPagination";
import { publicProcedure } from "../trpc";

export const erc721TokensRouter = {
  all: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(200).nullish(),
        cursor: z
          .object({
            token_id: z.number().nullish(),
            price: z.string().nullish(),
          })
          .nullish(), // <-- "cursor" needs to exist, but can be any type
        contractAddress: z.string().nullish(),
        owner: z.string().nullish(),
        orderBy: z.string().nullish(),
        sortDirection: z.string().nullish(),
        buyNowOnly: z.boolean().nullish(),
        block: z.number().nullish(),
        listings: z.boolean().nullish(),
        attributeFilter: z.record(z.string(), z.string()).nullish(),
        activeListing: z.boolean().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 50;
      const {
        cursor,
        contractAddress,
        owner,
        orderBy,
        block,
        sortDirection = "asc",
        attributeFilter,
        buyNowOnly,
      } = input;
      const whereFilter: SQL[] = [];
      const cursors = [];

      // Order By tokenId
      if (orderBy == "tokenId") {
        cursors.push([
          erc721Tokens.token_id, // Column to use for cursor
          sortDirection ?? "asc", // Sort order ('asc' or 'desc')
          cursor?.token_id, // Cursor value
        ]);
      }
      // Order By price
      else {
        if (
          cursor == undefined ||
          (cursor.token_id != 0 && cursor.price != null)
        ) {
          cursors.push(
            [
              sql`case when EXTRACT(EPOCH FROM now()) < ${erc721Tokens.expiration} then ${erc721Tokens.price} else ${sortDirection === "dsc" ? "0" : null} end`,
              sortDirection ?? "asc", // Sort order ('asc' or 'desc')
              cursor?.price, // Cursor value
            ],
            [
              erc721Tokens.token_id, // Column to use for cursor
              sortDirection ?? "asc", // Sort order ('asc' or 'desc')
              cursor?.token_id, // Cursor value
            ],
          );
        } else {
          cursors.push([
            erc721Tokens.token_id, // Column to use for cursor
            sortDirection ?? "asc", // Sort order ('asc' or 'desc')
            cursor.token_id, // Cursor value
          ]);
          whereFilter.push(isNull(erc721Tokens.price));
        }
      }

      if (contractAddress) {
        whereFilter.push(
          eq(
            erc721Tokens.contract_address,
            padAddress(contractAddress.toLowerCase()),
          ),
        );
      }
      if (owner) {
        whereFilter.push(
          eq(erc721Tokens.owner, padAddress(owner.toLowerCase())),
        );
      }
      if (!block) {
        whereFilter.push(sql`upper_inf(_cursor)`);
      }
      if (attributeFilter && Object.keys(attributeFilter).length !== 0) {
        const attributesObject: SQL[] = [];
        for (const [key, value] of Object.entries(attributeFilter)) {
          attributesObject.push(
            inArray(
              erc721Tokens.id,
              ctx.db
                .select({ id: erc721TokenAttributes.token_key })
                .from(erc721TokenAttributes)
                .where(
                  and(
                    eq(erc721TokenAttributes.value, value),
                    eq(erc721TokenAttributes.key, key),
                  ),
                ),
            ),
          );
        }
        whereFilter.push(...attributesObject);
      }
      if (buyNowOnly) {
        whereFilter.push(isNotNull(erc721Tokens.price));
      }
      /*const items = await ctx.db
        .select({
          id: erc721Tokens.id,
          key: erc721Tokens.key,
          kind: erc721Tokens.kind,
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
          sortDirection == "dsc"
            ? (nextItem?.token_id ?? 0) + 1
            : (nextItem?.token_id ?? 1000000000) - 1;
        nextCursor = {
          token_id: nextTokenId,
          price: nextItem?.price,
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
        where: and(eq(erc721Tokens.id, input.id), sql`upper_inf(_cursor)`),
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
} satisfies TRPCRouterRecord;
