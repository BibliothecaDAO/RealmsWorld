import { Client } from "https://esm.sh/ts-postgres";

const client = new Client({ host: 'postgres', password: 'postgres', database: 'postgres', port: 5432, user: 'postgres' });

export default client