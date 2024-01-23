import { sql } from "drizzle-orm";
import type { InferResolvers } from "garph";
import type { YogaInitialContext } from "graphql-yoga";

import type { SQL } from "@realms-world/db";
import { and, asc, db, eq, gt, schema } from "@realms-world/db";

import type { queryType } from "./schema";

type Resolvers = InferResolvers<
  { Query: typeof queryType },
  { context: YogaInitialContext }
>;

export const resolvers: Resolvers = {
  Query: {
    getERC721Tokens: async (
      _,
      { limit, cursor, contract_address, owner, block },
      ctx,
    ) => {
      const where: SQL[] = [];
      if (contract_address) {
        where.push(
          eq(
            schema.erc721Tokens.contract_address,
            contract_address.toLowerCase(),
          ),
        );
      }
      if (owner) {
        where.push(eq(schema.erc721Tokens.owner, owner));
      }
      if (!block) {
        where.push(sql`upper_inf(_cursor)`);
      }
      return await db.query.erc721Tokens.findMany({
        limit: limit + 1,
        where: and(gt(schema.erc721Tokens.token_id, cursor), ...where),
        orderBy: asc(schema.erc721Tokens.token_id),
        with: {
          listings: true,
          transfers: {
            orderBy: (transfers, { desc }) => [desc(transfers._cursor)],
          },
        },
      });
    },
  },
};
