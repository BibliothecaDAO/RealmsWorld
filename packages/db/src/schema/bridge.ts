import { bigint, numeric, text, timestamp } from "drizzle-orm/pg-core";

import { pgSqlTable } from "./_table";

export const bridge = pgSqlTable("bridge", {
  _cursor: bigint("_cursor", { mode: "number" }),
  hash: text("hash").primaryKey(),
  type: text("type"),
  l1Account: text("l1Account"),
  l2Account: text("l2Account"),
  amount: numeric("amount"),
  timestamp: timestamp("timestamp"),
});
