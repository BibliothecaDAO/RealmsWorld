import * as dotenv from "dotenv";
import type { Config } from "drizzle-kit";

dotenv.config({
  path: "../../.env",
});

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

export default {
  schema: "./src/schema",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL + "?ssl=true",
    ssl: true,
  },
  tablesFilter: ["rw_*"],
} satisfies Config;
