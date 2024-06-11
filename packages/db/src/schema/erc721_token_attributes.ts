import { relations } from "drizzle-orm";
import {
  index,
  integer,
  pgTable,
  primaryKey,
  text,
  uniqueIndex,
} from "drizzle-orm/pg-core";

import { erc721Tokens } from "./erc721_tokens";

export const erc721TokenAttributes = pgTable(
  "erc721_token_attributes",
  {
    token_key: text("token_key").notNull(),
    value: text("value").notNull(),
    key: text("key").notNull(),
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
