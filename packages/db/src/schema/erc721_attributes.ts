import { relations } from "drizzle-orm";
import { integer, primaryKey, serial, text, unique } from "drizzle-orm/pg-core";

import { int8range } from "../int8range";
import { pgSqlTable } from "./_table";
import { erc721Tokens } from "./erc721_tokens";

export const erc721Attributes = pgSqlTable(
  "erc721_attributes",
  {
    id: serial("id"),
    value: text("value"),
    key: text("key"),
    kind: text("kind"),
    collectionId: text("collection_id"),
    attributeKeyId: integer("attribute_key_id"),
    token_count: integer("token_count"),
    /*on_sale_count: number;
  floor_sell_value: number;
  top_buy_value: number;
  sell_updated_at: string;
  buy_updated_at: string;**/
  },
  (t) => ({
    pk: primaryKey({ columns: [t.collectionId, t.key, t.value] }),
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
