import type { NeonQueryFunction } from "@neondatabase/serverless";
import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import config from "../drizzle.config";
import { env } from "../env";
import * as schema from "./schema";

if (!env.VERCEL_ENV) {
  neonConfig.wsProxy = (/*host*/) => `127.0.0.1/v1`;
  neonConfig.useSecureWebSocket = false;
  neonConfig.pipelineTLS = false;
  neonConfig.pipelineConnect = false;
}

export const neonSql = neon(
  config.dbCredentials.url,
) satisfies NeonQueryFunction<boolean, boolean>;
//const queryClient = postgres('postgres://postgres:postgres@localhost:5432');

export const db = drizzle(neonSql, { schema });
