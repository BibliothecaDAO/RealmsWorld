import { bigint, numeric, text, timestamp } from "drizzle-orm/pg-core";

import { pgSqlTable } from "./_table";

export const bridge = pgSqlTable("erc721_market", {
  _cursor: bigint("_cursor", { mode: "number" }),
  hash: text("hash").primaryKey(),
  token_id: numeric("token_id"),
  collection_id: numeric("amount"),
  price: numeric("price"),
  expiration: numeric("amount"),
  active: numeric("amount"),
  amount: numeric("amount"),
  timestamp: timestamp("timestamp"),
});
