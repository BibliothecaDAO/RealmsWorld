"use client";

import type { TokenMarketData } from "@/types";
import { L1TokenCard } from "@/app/collection/[id]/(list)/L1TokenCard";
import { findTokenName } from "@/utils/utils";

import { useUIContext } from "../../../providers/UIProvider";

export const L1TokenTable = ({
  address,
  tokens,
}: {
  address: string;
  tokens: TokenMarketData[];
}) => {
  const { isGrid } = useUIContext();

  const grid =
    "grid grid-cols-1 gap-4 sm:pl-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5";
  const list = "grid grid-cols-1 mx-4 border border-t-0";
  const collectionName = findTokenName(address);

  return (
    <div className={isGrid ? grid : list}>
      {tokens
        ? tokens.map((token, index) => {
            return (
              <L1TokenCard
                key={index}
                collectionName={collectionName}
                token={token}
                layout={isGrid ? "grid" : "list"}
              />
            );
          })
        : "No Assets Found"}
    </div>
  );
};
