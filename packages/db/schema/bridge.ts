import { sql } from "drizzle-orm";
import {
  bigint,
  integer,
  json,
  numeric,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { pgSqlTable } from "./_table";

//import { mySqlTable } from "./_table";

export const bridge = pgSqlTable("bridge", {
  _cursor: numeric("_cursor"),
  hash: text("hash").primaryKey(),
  type: text("type"),
  l1Account: text("l1Account"),
  l2Account: text("l2Account"),
  amount: numeric("amount"),
  timestamp: timestamp("timestamp"),
});
