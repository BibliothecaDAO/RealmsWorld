//import { Client } from "@planetscale/database";
//import { drizzle } from "drizzle-orm/planetscale-serverless";
import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

import * as auth from "./schema/auth";
import * as beasts from "./schema/beasts";
import * as bridge from "./schema/bridge";

export const schema = { ...auth, ...beasts, ...bridge };

export { pgSqlTable as tableCreator } from "./schema/_table";

export * from "drizzle-orm";

if (!process.env.VERCEL_ENV) {
  neonConfig.wsProxy = (host) => `127.0.0.1/v1`;
  neonConfig.useSecureWebSocket = false;
  neonConfig.pipelineTLS = false;
  neonConfig.pipelineConnect = false;
}

neonConfig.fetchConnectionCache = true;

const sql = neon(
  process.env.DATABASE_URL! ??
    "postgres://RedBeardEth:1mbJAUqlo5NS@ep-frosty-sea-90384545.us-east-2.aws.neon.tech/neondb" +
      "?ssl=require",
);
//const queryClient = postgres('postgres://postgres:postgres@localhost:5432');

export const db = drizzle(sql, { schema });
