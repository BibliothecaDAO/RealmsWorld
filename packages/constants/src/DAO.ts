import { ChainId } from "./Chains";

export enum DaoAccounts {
  DEVELOPMENT = "Development",
  FRONTINUS = "Frontinus House",
  EMISSIONS = "Emissions",
  LOCKED = "DAO Locked",
}

// Flattened structure for easier access and maintenance
export const DaoAddresses = new Map<string, Map<ChainId, string>>([
  [DaoAccounts.DEVELOPMENT, new Map([
    [ChainId.MAINNET, "0xA8e6EFaf015D424c626Cf3C23546Fcb3BD2C9f1a"],
    [ChainId.SEPOLIA, ""],
  ])],
  [DaoAccounts.FRONTINUS, new Map([
    [ChainId.MAINNET, "0x439d859B391c38160227AEB5636Df52da789CFC1"],
    [ChainId.SEPOLIA, ""],
  ])],
  [DaoAccounts.EMISSIONS, new Map([
    [ChainId.MAINNET, "0xBbae2e00bcc495913546Dfaf0997Fb18BF0F20fe"],
    [ChainId.SEPOLIA, ""],
  ])],
  [DaoAccounts.LOCKED, new Map([
    [ChainId.MAINNET, "0xf92A1536Fec97360F674C15e557Ff60a2DBFbcDc"],
    [ChainId.SEPOLIA, ""],
  ])],
]);

export function getDaoAddressesArrayByChain(chainId: ChainId): { account: string; address: string }[] {
  const addressesArray: { account: string; address: string }[] = [];
  DaoAddresses.forEach((chains, account) => {
    const address = chains.get(chainId);
    if (address) {
      addressesArray.push({ account, address });
    }
  });
  return addressesArray;
}

export function getDaoAccountByAddress(address: string): DaoAccounts | undefined {
  for (const [account, chains] of DaoAddresses) {
    for (const addr of chains.values()) {
      if (addr.toLowerCase() === address.toLowerCase()) {
        return account as DaoAccounts;
      }
    }
  }
}
