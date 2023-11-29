import type { Config } from "https://esm.sh/@apibara/indexer";
import type { Postgres } from "https://esm.sh/@apibara/indexer/sink/postgres";
//import type { Console } from "https://esm.sh/@apibara/indexer/sink/console";
import type {
  Block,
  BlockHeader,
  EventWithTransaction,
  Starknet,
} from "https://esm.sh/@apibara/indexer/starknet";
import { uint256 } from "https://esm.sh/starknet";

//import { erc721ContractEvents } from "./utils.ts";

export const config: Config<Starknet, Postgres> = {
  streamUrl: Deno.env.get("STREAM_URL"),
  //startingBlock: Number(Deno.env.get("ERC721_STARTING_BLOCK")),
  network: "starknet",
  batchSize: 1,
  authToken: "dna_FCqLW4vWwpveLSLpp16V",
  //finality: "DATA_STATUS_PENDING",
  filter: {
    header: {
      weak: true,
    },
    //events: erc721ContractEvents,
  },
  sinkType: "postgres",
  sinkOptions: {
    connectionString:
      "postgres://RedBeardEth:1mbJAUqlo5NS@ep-frosty-sea-90384545.us-east-2.aws.neon.tech/goerli?sslmode=require",
    tableName: "rw_erc721_tokens",
    //entityMode: true,
  },
};

export default function transform({ header, events }: Block) {
  return events?.flatMap((event) => transferToTask(header!, event));
}

function transferToTask(_header: BlockHeader, { event }: EventWithTransaction) {
  const from = BigInt(event.data[0]);
  const token_id = parseInt(
    uint256.uint256ToBN({ low: event.data[2], high: event.data[3] }).toString(),
  );
  if (from == 0n) {
    return {
      insert: {
        id: event.fromAddress + ":" + token_id,
        contract_address: event.fromAddress,
        token_id,
        minter: event.data[1],
        owner: event.data[1],
      },
    };
  } else {
    return {
      entity: {
        id: event.fromAddress + ":" + token_id,
      },
      update: {
        owner: event.data[1],
      },
    };
  }
}
