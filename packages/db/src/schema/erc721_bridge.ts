import { bigint, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const erc721_bridge = pgTable("erc721_bridge", {
  _cursor: bigint("_cursor", { mode: "number" }),
  hash: text("hash").primaryKey(),
  type: text("type"),
  l1Account: text("l1Account"),
  l2Account: text("l2Account"),
  tokenIds: text("tokenIds").array(),
  req_hash: text("req_hash"),
  timestamp: timestamp("timestamp"),
});
