import { relations } from "drizzle-orm";
import { bigint, numeric, text, timestamp } from "drizzle-orm/pg-core";

import { pgSqlTable } from "./_table";
import { erc721Tokens } from "./erc721_tokens";

export const erc721MarketListing = pgSqlTable("erc721_market", {
  _cursor: bigint("_cursor", { mode: "number" }),
  hash: text("hash").primaryKey(),
  token_key: text("token_key"),
  token_id: numeric("token_id"),
  collection_id: numeric("collection_id"),
  price: numeric("price"),
  expiration: text("expiration"),
  active: numeric("active"),
});

export const erc721TransfersRelations = relations(
  erc721MarketListing,
  ({ one }) => ({
    token: one(erc721Tokens, {
      fields: [erc721MarketListing.token_key],
      references: [erc721Tokens.id],
    }),
  }),
);

export const erc721TokensRelations = relations(erc721Tokens, ({ many }) => ({
  transfers: many(erc721MarketListing),
}));
