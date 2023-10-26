import type { InferResolvers } from "garph";
import type { YogaInitialContext } from "graphql-yoga";

import { and, asc, db, eq, exists, gt, schema } from "@realms-world/db";

import type { queryType } from "./schema";

type Resolvers = InferResolvers<
  { Query: typeof queryType },
  { context: YogaInitialContext }
>;

export const resolvers: Resolvers = {
  Query: {
    getERC721Tokens: (_, { limit, cursor, contract_address }, ctx) => {
      return db.query.erc721Tokens.findMany({
        limit: limit + 1,
        where: and(
          cursor
            ? gt(schema.erc721Tokens.token_id, cursor)
            : gt(schema.erc721Tokens.token_id, 0),
          contract_address
            ? eq(schema.erc721Tokens.contract_address, contract_address)
            : exists(schema.erc721Tokens.contract_address),
        ),
        orderBy: asc(schema.erc721Tokens.token_id),
      });
    },
  },
  /*Mutation: {
    addTodo: (_, { title }, ctx) => {
      return db
        .insert(todos)
        .values({
          title,
          createdAt: dayjs().unix(),
        })
        .returning()
        .get();
    },
    removeTodo: (_, { id }, ctx) => {
      return db.delete(todos).where(eq(todos.id, id)).returning().get();
    },
  },*/
};
