//import { Client } from "@planetscale/database";
//import { drizzle } from "drizzle-orm/planetscale-serverless";
import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as auth from "./schema/auth";
import * as bridge from "./schema/bridge";
import * as erc721AttributeKeys from "./schema/erc721_attribute_keys";
import * as erc721Attributes from "./schema/erc721_attributes";
import * as erc721MarketListing from "./schema/erc721_market";
import * as erc721TokenAttributes from "./schema/erc721_token_attributes";
import * as erc721Tokens from "./schema/erc721_tokens";

export const schema = {
  ...auth,
  ...erc721Tokens,
  ...bridge,
  ...erc721Attributes,
  ...erc721MarketListing,
  ...erc721AttributeKeys,
  ...erc721TokenAttributes,
};

export { pgSqlTable as tableCreator } from "./schema/_table";

export * from "drizzle-orm";
export { Int8Range } from "./int8range";

if (!process.env.VERCEL_ENV) {
  neonConfig.wsProxy = (/*host*/) => `127.0.0.1/v1`;
  neonConfig.useSecureWebSocket = false;
  neonConfig.pipelineTLS = false;
  neonConfig.pipelineConnect = false;
}

neonConfig.fetchConnectionCache = true;

export const neonSql = neon(process.env.DATABASE_URL!);
//const queryClient = postgres('postgres://postgres:postgres@localhost:5432');

export const db = drizzle(neonSql, { schema });
