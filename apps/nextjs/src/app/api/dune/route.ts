import { DuneClient } from "@duneanalytics/client-sdk";
import { db } from "@realms-world/db/client";
import { schema } from "@realms-world/db/schema";
import { env } from "env";

const { DUNE_API_KEY } = env;
const client = new DuneClient(DUNE_API_KEY ?? "");
export const config = {
  cron: "0 */6 * * *",
};

export async function GET(request: Request) {
  const queryID = 4101280;

  try {
    const executionResult = await client.getLatestResult({ queryId: queryID });
    if (executionResult.result?.rows) {
      // Filter and transform the rows to match schema
      const filteredRows = executionResult.result.rows.map(
        (row: Record<string, unknown>) => ({
          source: row.Name as string,
          amount: row.amount as string,
          transaction_hash: row.transaction_hash as string,
          //block_time: new Date(row.block_time),
          epoch: new Date(row.epoch),
          epoch_total_amount: row.epoch_total_amount as string,
          sender_epoch_total_amount: row.sender_epoch_total_amount as string,
        }),
      ) satisfies (typeof schema.velords_burns.$inferInsert)[];
      console.log(filteredRows.slice(-6));

      try {
        const tokenAttributeResult = await db
          .insert(schema.velords_burns)
          .values(filteredRows)
          .returning({
            source: schema.velords_burns.source,
            amount: schema.velords_burns.amount,
            //epoch: schema.velords_burns.epoch,
          });

        console.log(tokenAttributeResult);

        return new Response(JSON.stringify(tokenAttributeResult));
      } catch (e) {
        console.log(e);
        return new Response(JSON.stringify(e));
      }
    }
  } catch (error) {
    console.error(error);
    return new Response("Error fetching data from Dune", { status: 500 });
  }
}
