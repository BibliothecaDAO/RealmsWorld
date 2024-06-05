import type { Metadata } from "next";
import { NETWORK_NAME } from "@/constants/env";
import { stakingAddresses } from "@/constants/staking";
import { getWalletRealmsHeld } from "@/lib/subgraph/getWalletRealmsHeld";
import { getRealmNFTHolders } from "@/lib/subgraph/getRealmNFTHolders";

import { PageLayout } from "../_components/PageLayout";
import { DashBoard } from "./Dashboard";

export const metadata: Metadata = {
  title: "Tokenomics",
  description:
    "The Lords token issuance, distribution and DAO accounts",
};
import { SUPPORTED_L1_CHAIN_ID } from "@/constants/env";
import { getDaoAddressesArrayByChain } from "@realms-world/constants/src/DAO";
export interface EthplorerToken {
  tokenInfo: {
    address: string;
    name: string;
    decimals: string;
    symbol: string;
    price: {
      rate: number;
      currency: string;
      volume24h: number;
      marketCapUsd: number;
    };
    holdersCount: number;
    image: string;
  };
  rawBalance: string;
}

export interface EthplorerAddressInfoResponse {
  ETH: {
    price: {
      rate: string;
      ts: number;
    };
    rawBalance: string;
  };
  address: string;
  error: {
    code: number;
    message: string;
  };
  tokens: EthplorerToken[];
}

interface TotalStakedRealmsData {
  wallets: {
    realmsHeld: string;
  }[];
}

interface TotalValueLocked {
  exchange: string;
  valueUsd: number;
}

interface ExchangeValue {
  exchange: string;
  value: number;
}

async function fetchTokenData(): Promise<EthplorerAddressInfoResponse[]> {
  function getAddressUrl(address: string) {
    return `https://api.ethplorer.io/getAddressInfo/${address}?apiKey=${process.env.NEXT_PUBLIC_ETHPLORER_APIKEY}&chainId=1`;
  }
  const daoAddresses = getDaoAddressesArrayByChain(SUPPORTED_L1_CHAIN_ID);
  if (!daoAddresses) {
    throw new Error('DAO addresses are undefined');
  }
  const fetchPromises = daoAddresses.map(async (account) => {
    const url = getAddressUrl(account.address);
    return await fetch(url);
   // Assuming you want to parse the JSON response
  });
  const responses = await Promise.all(fetchPromises);
  const data = await Promise.all(responses.map(response => response.json()));
  // Now `data` contains the results for each address
  return {...data}
}

const galleonAddress = stakingAddresses[NETWORK_NAME].v1Galleon;
const carrackAddress = stakingAddresses[NETWORK_NAME].v2Carrack;

const totalStakedRealmsData: TotalStakedRealmsData = await getWalletRealmsHeld({
  addresses: [galleonAddress, carrackAddress],
}) as TotalStakedRealmsData;

const totalStakedRealms:number = totalStakedRealmsData.wallets.reduce(
  (total: number, wallet: { realmsHeld: string }) => {
    return total + parseInt(wallet.realmsHeld, 10);
  },
  0,
) ?? 0;

async function fetchTotalValueLocked() {
  const url = "https://starknet.impulse.avnu.fi/v1/tokens/0x124aeb495b947201f5fac96fd1138e326ad86195b98df6dec9009158a533b49/exchange-tvl?resolution=1M"

  const response = await fetch(url);
  const totalValueLocked: TotalValueLocked[] = await response.json() as TotalValueLocked[];
  
  return totalValueLocked;
}

async function fetchExchangesVolume() {
  const url = "https://starknet.impulse.avnu.fi/v1/tokens/0x124aeb495b947201f5fac96fd1138e326ad86195b98df6dec9009158a533b49/exchange-volumes?resolution=1W&startDate=2023-04-23&endDate=2024-04-23"

  const response = await fetch(url);
  const exchangesVolume:ExchangeValue[] = await response.json() as ExchangeValue[];
  
  return exchangesVolume;
}

export default async function Page() {
  const tokenData = await fetchTokenData();
  const totalValueLocked = await fetchTotalValueLocked();
  const exchangesVolume = await fetchExchangesVolume();
  const realmNFTHolders = await getRealmNFTHolders();

  return (
    <PageLayout title="$Lords Tokenomics">
      <div className="pb-8 md:text-2xl">
        The $Lords token is the native token of the Realms Autonomous World. It
        is governed by BibliothecaDAO who controls the issuance of the token.
      </div>
      <DashBoard 
        tokenInfo={tokenData}
        totalValueLocked={totalValueLocked}
        exchangesVolume={exchangesVolume}
        totalStakedRealms={totalStakedRealms}
        realmNFTHolders={realmNFTHolders.length} 
      />
    </PageLayout>
  );
}
