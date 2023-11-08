import { hash } from "https://esm.sh/starknet";

export const whitelistedContracts = [
  Deno.env.get("BEASTS_CONTRACT") as `0x${string}`,
  Deno.env.get("GOLDEN_TOKEN_CONTRACT") as `0x${string}`,
];

export const erc721ContractEvents = whitelistedContracts.map((contract) => {
  return {
    fromAddress: contract,
    keys: [hash.getSelectorFromName("Transfer") as `0x${string}`],
    includeTransaction: false, // Don't send transaction data.
    includeReceipt: false, // Don't send receipt data.
  };
});
