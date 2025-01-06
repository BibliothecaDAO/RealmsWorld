import {
  numeric,
  pgTable,
  primaryKey,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const velords_burns = pgTable(
  "dune_velords_burns",
  {
    source: text("source").notNull(),
    amount: numeric("amount").notNull(),
    transaction_hash: text("transaction_hash").notNull(),
    //block_time: timestamp("block_time").notNull(),
    epoch: timestamp("epoch", {
      mode: "date",
      precision: 3,
    }).notNull(),
    epoch_total_amount: numeric("epoch_total_amount").notNull(),
    sender_epoch_total_amount: numeric("sender_epoch_total_amount").notNull(),
  },
  (t) => [primaryKey({ columns: [t.amount, t.transaction_hash] })],
);
