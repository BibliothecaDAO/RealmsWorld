import { api } from "@/trpc/react";
import { DuneClient, QueryParameter } from "@duneanalytics/client-sdk";
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
    /*const executionResult = await client.getLatestResult({ queryId: queryID });
    console.log(executionResult.result?.rows);
    if (executionResult.result?.rows) {
      // Filter and transform the rows to match schema
      const filteredRows = executionResult.result.rows.map(
        (row: Record<string, unknown>) => ({
          source: row.Name as string,
          amount: Number(row.amount),
          block_time: new Date(row.block_time),
          epoch: row.epoch ? new Date(row.epoch) : null,
          epoch_total_amount: Number(row.epoch_total_amount),
          sender_epoch_total_amount: row.sender_epoch_total_amount
            ? Number(row.sender_epoch_total_amount)
            : 0,
        }),
      ) satisfies (typeof schema.duneVelords.$inferInsert)[];
      console.log(filteredRows[0]);*/

    try {
      const tokenAttributeResult = await db
        .insert(schema.velords_burns)
        .values([{ source: "test" }])
        .returning({
          source: schema.velords_burns.source,
          //amount: schema.duneVelords.amount,
          //epoch: schema.duneVelords.epoch,
        });

      console.log(tokenAttributeResult);

      return new Response(JSON.stringify(tokenAttributeResult));
    } catch (e) {
      console.log(e);
      return new Response(JSON.stringify(e));
    }
  } catch (error) {
    console.error(error);
    return new Response("Error fetching data from Dune", { status: 500 });
  }
}
