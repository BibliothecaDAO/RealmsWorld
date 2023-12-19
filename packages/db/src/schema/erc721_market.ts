import { relations } from "drizzle-orm";
import { boolean, integer, numeric, text } from "drizzle-orm/pg-core";

import { int8range } from "../int8range";
import { pgSqlTable } from "./_table";
import { erc721Tokens } from "./erc721_tokens";

export const erc721MarketListing = pgSqlTable("erc721_market", {
  _cursor: int8range("_cursor"),
  id: integer("id"),
  hash: text("hash"),
  token_key: text("token_key"),
  token_id: integer("token_id"),
  collection_id: integer("collection_id"),
  created_by: text("created_by"),
  price: numeric("price"),
  expiration: integer("expiration"),
  active: boolean("active"),
});

export const erc721MarketRelations = relations(
  erc721MarketListing,
  ({ one }) => ({
    token: one(erc721Tokens, {
      fields: [erc721MarketListing.token_key],
      references: [erc721Tokens.id],
    }),
  }),
);
