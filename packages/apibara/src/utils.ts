import { hash } from "https://esm.sh/starknet";

export const whitelistedContracts = [
  Deno.env.get("GOLDEN_TOKEN_CONTRACT") as `0x${string}`,
  Deno.env.get("BEASTS_CONTRACT") as `0x${string}`,
];

function eventKey(name: string) {
  const h = BigInt(hash.getSelectorFromName(name));
  return `0x${h.toString(16).padStart(64, "0")}`;
}

export const ORDER_EVENT = eventKey("OrderEvent");
export const TRANSFER_EVENT = eventKey("Transfer");

export const erc721ContractEvents = whitelistedContracts.map((contract) => {
  return {
    fromAddress: contract,
    keys: [TRANSFER_EVENT],
    includeTransaction: true,
    includeReceipt: false,
  };
});

export const marketplaceContractEvents = [
  {
    fromAddress: Deno.env.get("MARKET_CONTRACT") as `0x${string}`,
    keys: [ORDER_EVENT],
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
