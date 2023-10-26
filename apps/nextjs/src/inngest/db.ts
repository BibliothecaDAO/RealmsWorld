import { neon, neonConfig } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export default sql;
