"use client";

import { getBuiltGraphSDK } from "@/.graphclient";
import { tokens } from "@/constants/tokens";
import { BeastCard } from "./BeastCard";
import { Token, TokenMarketData } from "@/types";
import { useQuery } from "@tanstack/react-query";
//import { SweepModal } from '@reservoir0x/reservoir-kit-ui'

export const BeastsTable = ({

}: {

}) => {


  const sdk = getBuiltGraphSDK({
    apibaraHandle: process.env.NEXT_PUBLIC_APIBARA_HANDLE,
  });

  const { data, isLoading: realmsDataIsLoading } = useQuery({
    queryKey: ["Beasts"],
    queryFn: () => sdk.Beasts(),
    refetchInterval: 10000,
  });

  const tokens = data?.beasts

  const isGrid = true;
  const grid =
    "grid grid-cols-1 gap-4 sm:pl-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5";
  const list = "grid grid-cols-1";

  return (
    <div className={isGrid ? grid : list}>
      {tokens
        ? tokens.map((token, index) => {
            return (
              <BeastCard
                key={index}
                token={token}
                layout={isGrid ? "grid" : "list"}
              />
            );
          })
        : "No Assets Found"}
    </div>
  );
};
