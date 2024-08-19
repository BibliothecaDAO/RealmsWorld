import { relations } from "drizzle-orm";
import {
  bigint,
  integer,
  numeric,
  pgTable,
  text,
} from "drizzle-orm/pg-core";

import { int8range } from "../int8range";
import { erc721MarketEvents } from "./erc721_market_events";
import { erc721TokenAttributes } from "./erc721_token_attributes";

export const erc721Tokens = pgTable("erc721_tokens", {
  _cursor: int8range("_cursor"),
  id: text("id").notNull(),
  token_id: integer("token_id").notNull(),
  contract_address: text("contract_address"),
  minter: text("minter"),
  owner: text("owner"),
  image: text("image"),
  name: text("name"),
  price: numeric("price"),
  expiration: integer("expiration"),
  lastPrice: numeric("last_price"),
});
export const erc721TokensRelations = relations(erc721Tokens, ({ many }) => ({
  transfers: many(erc721Transfers),
  listings: many(erc721MarketEvents),
  attributes: many(erc721TokenAttributes),
}));

export const erc721Transfers = pgTable("erc721_transfers", {
  _cursor: bigint("_cursor", { mode: "number" }),
  id: text("id").primaryKey(),
  token_key: text("token_key"),
  token_id: integer("token_id"),
  contract_address: text("contract_address"),
  fromAddress: text("fromAddress"),
  toAddress: text("toAddress"),
});

export const erc721TransfersRelations = relations(
  erc721Transfers,
  ({ one }) => ({
    token: one(erc721Tokens, {
      fields: [erc721Transfers.token_key],
      references: [erc721Tokens.id],
    }),
  }),
);
