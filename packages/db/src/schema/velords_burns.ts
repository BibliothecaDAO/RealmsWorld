import { bigint, numeric, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const velords_burns = pgTable("velords_burns", {
  _cursor: bigint("_cursor", { mode: "number" }),
  hash: text("hash").primaryKey(),
  amount: numeric("amount", { precision: 78, scale: 8 }).notNull(),
  sender: text("sender").notNull(),
  timestamp: timestamp("timestamp").notNull(),
});
