import { relations } from "drizzle-orm";
import {
  index,
  integer,
  primaryKey,
  text,
  uniqueIndex,
} from "drizzle-orm/pg-core";

import { pgSqlTable } from "./_table";
import { erc721Tokens } from "./erc721_tokens";

export const erc721TokenAttributes = pgSqlTable(
  "erc721_token_attributes",
  {
    token_key: text("token_key"),
    value: text("value"),
    key: text("key"),
    collectionId: text("collection_id"),
    attributeId: integer("attribute_id"),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.token_key, table.key, table.value] }),
      tokenAttributesTokenKeyKeyValueIndex: index(
        "token_attributes_token_key_key_value_index",
      ).on(table.token_key, table.key, table.value),
      tokenAttributesAttributeIdTokenKeyUniqueIndex: uniqueIndex(
        "token_attributes_attribute_id_token_key_unique_index",
      ).on(table.attributeId, table.token_key),
    };
  },
);

export const erc721TokenAttributesRelations = relations(
  erc721TokenAttributes,
  ({ one }) => ({
    token: one(erc721Tokens, {
      fields: [erc721TokenAttributes.token_key],
      references: [erc721Tokens.id],
    }),
  }),
);
