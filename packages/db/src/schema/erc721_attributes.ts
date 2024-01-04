import { relations } from "drizzle-orm";
import { integer, text } from "drizzle-orm/pg-core";

import { int8range } from "../int8range";
import { pgSqlTable } from "./_table";
import { erc721Collections } from "./erc721_collections";

export const erc721Attributes = pgSqlTable("erc721_attribute_keys", {
  _cursor: int8range("_cursor"),
  id: integer("id"),
  value: text("key"),
  key: text("key"),
  kind: text("kind"),
  collectionId: text("collection_id"),
  attributeKeyId: integer("attribute_key_id"),
});

export const erc721AttributesRelations = relations(
  erc721Attributes,
  ({ one }) => ({
    collection: one(erc721Collections, {
      fields: [erc721Attributes.collectionId],
      references: [erc721Collections.id],
    }),
  }),
);
