import { relations } from "drizzle-orm";
import { integer, text } from "drizzle-orm/pg-core";

import { int8range } from "../int8range";
import { pgSqlTable } from "./_table";
import { erc721Collections } from "./erc721_collections";

export const erc721AttributeKeys = pgSqlTable("erc721_attribute_keys", {
  _cursor: int8range("_cursor"),
  id: integer("id"),
  key: text("key"),
  kind: text("kind"),
  collectionId: text("collection_id"),
  attributeCount: integer("attribute_count"),
});

export const erc721AttributeKeysRelations = relations(
  erc721AttributeKeys,
  ({ one }) => ({
    collection: one(erc721Collections, {
      fields: [erc721AttributeKeys.collectionId],
      references: [erc721Collections.id],
    }),
  }),
);
