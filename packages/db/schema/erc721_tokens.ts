import { integer, json, text } from "drizzle-orm/pg-core";

import { pgSqlTable } from "./_table";

export const erc721Tokens = pgSqlTable("erc721_tokens", {
  _cursor: integer("_cursor"),
  id: text("id").primaryKey(),
  token_id: integer("token_id"),
  contract_address: text("contract_address"),
  owner: text("owner"),
  image: text("image"),
  name: text("name"),
  metadata: json("metadata").$type<{
    tier: number;
    level: number;
    type: string;
  }>(),
});
