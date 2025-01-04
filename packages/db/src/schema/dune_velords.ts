import { numeric, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const velords_burns = pgTable("dune_velords_burns", {
  source: text("source").notNull(),
  amount: numeric("amount").notNull(),
  //block_time: timestamp("block_time").notNull(),
  //epoch: timestamp("epoch"),
  epoch_total_amount: numeric("epoch_total_amount").notNull(),
  sender_epoch_total_amount: numeric("sender_epoch_total_amount").notNull(),
});
