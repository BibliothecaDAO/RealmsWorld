import { relations } from "drizzle-orm";
import { bigint, integer, json, numeric, text } from "drizzle-orm/pg-core";

import { int8range } from "../int8range";
import { pgSqlTable } from "./_table";
import { erc721MarketListing } from "./erc721_market";
import { erc721TokenAttributes } from "./erc721_token_attributes";

export const erc721Tokens = pgSqlTable("erc721_tokens", {
  _cursor: int8range("_cursor"),
  id: text("id").notNull(),
  token_id: integer("token_id").notNull(),
  contract_address: text("contract_address"),
  /*tokenId: integer("token_id").notNull(),
  contractAddress: text("contract_address"),*/
  minter: text("minter"),
  owner: text("owner"),
  image: text("image"),
  name: text("name"),
  price: numeric("price"),
  expiration: integer("expiration"),
  //lastPrice: numeric('last_price'),
  /*metadata: json("metadata").$type<{
    attributes:
      | {
          trait_type: string;
          value: string;
        }[]
      | {
          trait_type: string;
          value: number;
        }[];
  }>(),*/
});
export const erc721TokensRelations = relations(erc721Tokens, ({ many }) => ({
  transfers: many(erc721Transfers),
  listings: many(erc721MarketListing),
  attributes: many(erc721TokenAttributes),
}));

export const erc721Transfers = pgSqlTable("erc721_transfers", {
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
