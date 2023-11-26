import { relations } from "drizzle-orm";
import { bigint, integer, json, text } from "drizzle-orm/pg-core";

import { pgSqlTable } from "./_table";

export const erc721Tokens = pgSqlTable("erc721_tokens", {
  _cursor: bigint("_cursor", { mode: "number" }),
  id: text("id").primaryKey(),
  token_id: integer("token_id"),
  contract_address: text("contract_address"),
  minter: text("minter"),
  owner: text("owner"),
  image: text("image"),
  name: text("name"),
  metadata: json("metadata").$type<{
    attributes:
      | {
          trait_type: string;
          value: string;
        }[]
      | {
          trait_type: string;
          value: number;
        }[];
  }>(),
});
export const erc721TokensRelations = relations(erc721Tokens, ({ many }) => ({
  transfers: many(erc721Transfers),
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
