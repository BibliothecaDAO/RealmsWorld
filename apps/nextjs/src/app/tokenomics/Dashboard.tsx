"use client";

import { SUPPORTED_L1_CHAIN_ID } from "@/constants/env";
import { formatUnits } from "viem";

import { DaoAddresses } from "@realms-world/constants";
import { Button } from "@realms-world/ui";

import type { EthplorerAddressInfoResponse, EthplorerToken } from "./page";
import { BaseDashboardCard } from "./BaseDashboardCard";
import { Treasury } from "./Treasury";

export const DashBoard = ({
  tokenInfo,
}: {
  tokenInfo: EthplorerAddressInfoResponse[];
}) => {
  /* const url = `https://api.ethplorer.io/getTokenInfo/0x686f2404e77ab0d9070a46cdfb0b7fecdd2318b0?apiKey=${process.env.NEXT_PUBLIC_ETHPLORER_APIKEY}`;
  const lordsResult = await fetch(url)
  const lords = lords.json()
  console.log(lords)*/
  //const totalAccounts = data.reduce((acc, item) => acc + item.value, 0);
  const lords = Object.values(tokenInfo)
    ?.flatMap((item) => item.tokens ?? [])
    .find((token) => token.tokenInfo.symbol === "LORDS");

  const sums = tokenInfo
    ? Object.values(tokenInfo).reduce(
        (acc, account) => {
          let sum = 0;
          account.tokens.forEach((token) => {
            const value =
              parseFloat(
                formatUnits(
                  BigInt(token.rawBalance),
                  parseInt(token.tokenInfo.decimals),
                ),
              ) * token.tokenInfo.price.rate;
            sum += value;
          });
          sum +=
            parseFloat(formatUnits(BigInt(account.ETH.rawBalance), 18)) *
            parseFloat(account.ETH.price.rate);

          acc[account.address.toLowerCase()] = sum; // Convert to lowercase once here
          return acc;
        },
        {} as Record<string, number>,
      )
    : {};

  const accountsWithBalance = Array.from(DaoAddresses).reduce(
    (
      acc: Record<
        string,
        {
          name: string;
          address: string;
          value: number;
          //eslint-disable-next-line @typescript-eslint/no-explicit-any
          ETH: any; 
          tokens: EthplorerToken[];
        }
      >,
      [accountName, addressesByChainMap],
    ) => {
      const address = addressesByChainMap
        .get(SUPPORTED_L1_CHAIN_ID)
        ?.toLowerCase(); // Adjusted for Map access
      if (address && Object.prototype.hasOwnProperty.call(sums, address)) {
        // Check if the address exists in sums using a safer approach
        const totalUSDValue = sums[address];
        // Find the original tokenInfo for the current address
        const originalAccountInfo = Object.values(tokenInfo).find(
          (info) => info.address.toLowerCase() === address,
        );
        if (originalAccountInfo) {
          acc[accountName] = {
            name: accountName,
            address,
            value: totalUSDValue ?? 0,
            ETH: originalAccountInfo.ETH,
            tokens: originalAccountInfo?.tokens,
          };
        }
      }
      return acc;
    },
    {},
  );

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <BaseDashboardCard
        title="USD Price"
        dataTitle={`$${lords?.tokenInfo.price?.rate.toLocaleString()}`}
      >
        <Button
          href="https://www.coingecko.com/en/coins/lords"
          size={"xs"}
          variant={"outline"}
        >
          Coin Gecko
        </Button>
      </BaseDashboardCard>
      <BaseDashboardCard
        title="Holders ETH + Starknet"
        dataTitle={(
          lords?.tokenInfo.holdersCount ?? 0 + 85571
        ).toLocaleString()}
      />
      <BaseDashboardCard
        title="Volume 24hrs"
        dataTitle={`$${lords?.tokenInfo.price.volume24h.toLocaleString()}`}
      />
      <BaseDashboardCard title="Max Supply" dataTitle={`500,000,000`} />
      <BaseDashboardCard
        title="Market Cap"
        dataTitle={`$${lords?.tokenInfo.price.marketCapUsd.toLocaleString()}`}
      />
      {/*<BaseDashboardCard
        title="Total DAO Treasury"
        dataTitle={`$${(accountsWithBalance?.reduce((acc, item) => acc + item.value, 0) * (lords?.tokenInfo?.price?.rate ?? 0)).toLocaleString()}`}
  />*/}
      <BaseDashboardCard
        className="sm:col-span-3 sm:row-span-3"
        title="DAO Controlled Accounts"
        subtitle="Treasury"
      >
        <Treasury accounts={accountsWithBalance} />
      </BaseDashboardCard>
    </div>
  );
};
