import { integer, json, text } from "drizzle-orm/pg-core";

import { pgSqlTable } from "./_table";

export const beasts = pgSqlTable("beasts", {
  _cursor: integer("_cursor"),
  token_id: integer("token_id").primaryKey(),
  owner: text("owner"),
  image: text("image"),
  name: text("name"),
  metadata: json("metadata").$type<{
    tier: number;
    level: number;
    type: string;
  }>(),
});
