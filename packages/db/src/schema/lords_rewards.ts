import { bigint, numeric, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const lords_rewards = pgTable("lords_rewards", {
  _cursor: bigint("_cursor", { mode: "number" }),
  hash: text("hash").primaryKey(),
  amount: numeric("amount", { precision: 78, scale: 0 }),
  recipient: text("recipient"),
  timestamp: timestamp("timestamp"),
});
