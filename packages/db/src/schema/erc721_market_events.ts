import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  numeric,
  pgEnum,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { int8range } from "../int8range";
import { pgSqlTable } from "./_table";
import { erc721Tokens } from "./erc721_tokens";

export const statusEnum = pgEnum("status", ["open", "cancelled", "filled"]);

export const erc721MarketEvents = pgSqlTable("erc721_market_events", {
  _cursor: int8range("_cursor"),
  id: integer("id").notNull(),
  hash: text("hash"),
  finalize_hash: text("finalize_hash"),
  token_key: text("token_key"),
  token_id: integer("token_id"),
  collection_id: integer("collection_id"),
  created_by: text("created_by"),
  purchaser: text("purchaser"),
  price: numeric("price"),
  expiration: integer("expiration"),
  active: boolean("active"),
  updated_at: timestamp("updated_at"),
  status: statusEnum("status"),
});

export const erc721MarketRelations = relations(
  erc721MarketEvents,
  ({ one }) => ({
    token: one(erc721Tokens, {
      fields: [erc721MarketEvents.token_key],
      references: [erc721Tokens.id],
    }),
  }),
);
