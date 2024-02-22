import type { EventFilter } from "https://esm.sh/@apibara/indexer/starknet";
import { hash } from "https://esm.sh/starknet";

export const whitelistedContracts = [
  Deno.env.get("GOLDEN_TOKEN_CONTRACT"),
  Deno.env.get("BEASTS_CONTRACT"),
  Deno.env.get("BLOBERT_CONTRACT"),
];

function eventKey(name: string) {
  const h = BigInt(hash.getSelectorFromName(name));
  return `0x${h.toString(16).padStart(64, "0")}` as `0x${string}`;
}

export const TRANSFER_EVENT = eventKey("Transfer");
export const ORDER_EVENT = eventKey("OrderEvent");
export const WHITELIST_EVENT = eventKey("WhiteListEvent");

export const erc721ContractEvents: EventFilter[] = whitelistedContracts.map(
  (contract) => {
    return {
      fromAddress: contract as `0x${string}`,
      keys: [TRANSFER_EVENT],
      includeTransaction: true,
      includeReceipt: false,
    };
  },
);

export const marketplaceContractEvents = [
  {
    fromAddress: Deno.env.get("MARKET_CONTRACT") as `0x${string}`,
    keys: [ORDER_EVENT],
    includeTransaction: false,
    includeReceipt: true,
  },
];
export const marketplaceWhiteListEvents = [
  {
    fromAddress: Deno.env.get("MARKET_CONTRACT") as `0x${string}`,
    keys: [WHITELIST_EVENT],
    includeTransaction: false,
    includeReceipt: true,
  },
];
export enum OrderActionType {
  Create = 0,
  Edit = 1,
  Cancel = 2,
  Accept = 3,
}
