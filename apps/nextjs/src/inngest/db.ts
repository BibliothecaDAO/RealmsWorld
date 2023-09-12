import { neon, neonConfig } from "@neondatabase/serverless";

const sql = neon(
  process.env.DATABASE_URL! ??
    "postgres://RedBeardEth:1mbJAUqlo5NS@ep-frosty-sea-90384545.us-east-2.aws.neon.tech/neondb" +
      "?ssl=require",
);

export default sql;
