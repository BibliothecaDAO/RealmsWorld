import { sql } from "drizzle-orm";
import {
  integer,
  json,
  numeric,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { pgSqlTable } from "./_table";

//import { mySqlTable } from "./_table";

export const beasts = pgSqlTable("beasts", {
  _cursor: numeric("_cursor"),
  token_id: integer("token_id").primaryKey(),
  owner: text("owner"),
  image: text("image"),
  name: text("name"),
  metadata: json("metadata"),
});
