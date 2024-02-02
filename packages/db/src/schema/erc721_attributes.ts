import { index, integer, primaryKey, serial, text } from "drizzle-orm/pg-core";

import { pgSqlTable } from "./_table";

export const erc721Attributes = pgSqlTable(
  "erc721_attributes",
  {
    id: serial("id"),
    value: text("value").notNull(),
    key: text("key").notNull(),
    kind: text("kind"),
    collectionId: text("collection_id").notNull(),
    attributeKeyId: integer("attribute_key_id"),
    tokenCount: integer("token_count").default(0),
    /*on_sale_count: number;
  floor_sell_value: number;
  top_buy_value: number;
  sell_updated_at: string;
  buy_updated_at: string;**/
  },
  (t) => ({
    pk: primaryKey({ columns: [t.collectionId, t.key, t.value] }),
    attributesAttributeKeyIdValueIndex: index(
      "attributes_attribute_key_id_value_index",
    ).on(t.attributeKeyId, t.value),
  }),
);
/*
export const erc721AttributesRelations = relations(
  erc721Attributes,
  ({ one }) => ({
    token: one(erc721Tokens, {
      fields: [erc721Attributes.collectionId + ":" + erc721Attributes.id],
      references: [erc721Tokens.id],
    }),
  }),
);
*/
