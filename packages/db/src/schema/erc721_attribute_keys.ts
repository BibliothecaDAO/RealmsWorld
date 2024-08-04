import { relations } from "drizzle-orm";
import {
  integer,
  jsonb,
  pgTable,
  primaryKey,
  serial,
  text,
  uniqueIndex,
} from "drizzle-orm/pg-core";

import { erc721Collections } from "./erc721_collections";

export const erc721AttributeKeys = pgTable(
  "erc721_attribute_keys",
  {
    id: serial("id").notNull(),
    key: text("key").notNull(),
    kind: text("kind").notNull(),
    collectionId: text("collection_id").notNull(),
    attributeCount: integer("attribute_count").notNull().default(0),
    info: jsonb("info"),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.collectionId, table.key] }),
      attributeKeysCollectionIdKeyIndex: uniqueIndex(
        "attribute_keys_collection_id_key_index",
      ).on(table.collectionId, table.key),
    };
  },
);

export const erc721AttributeKeysRelations = relations(
  erc721AttributeKeys,
  ({ one }) => ({
    collection: one(erc721Collections, {
      fields: [erc721AttributeKeys.collectionId],
      references: [erc721Collections.id],
    }),
  }),
);
