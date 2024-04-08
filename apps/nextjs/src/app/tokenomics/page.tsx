import type { Metadata } from "next";

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

async function fetchData(): Promise<EthplorerAddressInfoResponse[]> {
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

export default async function Page() {
  const data = await fetchData()
  return (
    <PageLayout title="Lords Tokenomics">
      <div className="pb-8 md:text-2xl">
        The Lords token is the native token of the Realms Autonomous World. It
        is governed by BibliothecaDAO who controls the issuance of the token.
      </div>
      <DashBoard tokenInfo={data}/>
    </PageLayout>
  );
}
