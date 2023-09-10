import { sql } from "drizzle-orm";
import { pgTable, serial, timestamp, text } from "drizzle-orm/pg-core";
import { pgSqlTable } from "./_table";

//import { mySqlTable } from "./_table";

export const beasts = pgSqlTable("beasts", {
  token_id: text("token_id").primaryKey(),
  owner: text("owner"),
  image: text("image"),
});
