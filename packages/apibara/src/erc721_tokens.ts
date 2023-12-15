import type { Config } from "https://esm.sh/@apibara/indexer";
import type { Console } from "https://esm.sh/@apibara/indexer/sink/console";
import type { Postgres } from "https://esm.sh/@apibara/indexer/sink/postgres";
import type {
  Block,
  BlockHeader,
  EventWithTransaction,
  Starknet,
} from "https://esm.sh/@apibara/indexer/starknet";
import { uint256 } from "https://esm.sh/starknet";
import { formatUnits } from "https://esm.sh/viem";

import {
  erc721ContractEvents,
  marketplaceContractEvents,
  ORDER_EVENT,
  OrderActionType,
  TRANSFER_EVENT,
  whitelistedContracts,
} from "./utils.ts";

export const config: Config<Starknet, Postgres> = {
  streamUrl: Deno.env.get("STREAM_URL"),
  startingBlock: Number(Deno.env.get("ERC721_STARTING_BLOCK")),
  network: "starknet",
  finality: "DATA_STATUS_PENDING",
  filter: {
    header: {
      weak: true,
    },
    events: [...erc721ContractEvents, ...marketplaceContractEvents],
  },
  sinkType: "postgres",
  sinkOptions: {
    connectionString: Deno.env.get("POSTGRES_CONNECTION_STRING"),
    tableName: "rw_erc721_tokens",
    entityMode: true,
  },
};

export default function transform({ header, events }: Block) {
  return events?.flatMap((event) => transferToTask(header!, event));
}

function transferToTask(_header: BlockHeader, { event }: EventWithTransaction) {
  switch (event.keys[0]) {
    case TRANSFER_EVENT: {
      const from = BigInt(event.data[0]);
      const token_id = parseInt(
        uint256
          .uint256ToBN({ low: event.data[2], high: event.data[3] })
          .toString(),
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
    //Refactor to market indexer once apibara multi-table indexers availble
    case ORDER_EVENT: {
      const tokenId = Number(BigInt(event.data[1]));
      const collectionId = Number(BigInt(event.data[2]));
      const price = formatUnits(BigInt(event.data[3]).toString(), 18);
      const type = Number(BigInt(event.data[7]));

      switch (type) {
        case OrderActionType.Create:
          return {
            entity: {
              id:
                whitelistedContracts[collectionId - 1].toLowerCase() +
                ":" +
                tokenId,
            },
            update: {
              price: price,
            },
          };
        case OrderActionType.Edit:
          return {
            entity: {
              id:
                whitelistedContracts[collectionId - 1].toLowerCase() +
                ":" +
                tokenId,
            },
            update: {
              price: price,
            },
          };
        case OrderActionType.Accept:
          return {
            entity: {
              id:
                whitelistedContracts[collectionId - 1].toLowerCase() +
                ":" +
                tokenId,
            },
            update: {
              price: undefined,
            },
          };
        case OrderActionType.Cancel:
          return {
            entity: {
              id:
                whitelistedContracts[collectionId - 1].toLowerCase() +
                ":" +
                tokenId,
            },
            update: {
              price: undefined,
            },
          };
        default: {
          console.warn("Unknown event", event.keys[0]);
          return [];
        }
      }
    }
    default: {
      console.warn("Unknown event", event.keys[0]);
      return [];
    }
  }
}
