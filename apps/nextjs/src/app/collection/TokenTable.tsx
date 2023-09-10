"use client";

import { TokenCard } from "@/app/collection/TokenCard";
import type { TokenMarketData } from "@/types";
import { Token } from "@/types";

//import { SweepModal } from '@reservoir0x/reservoir-kit-ui'

export const TokenTable = ({
  address,
  tokens,
}: {
  address: string;
  tokens: TokenMarketData[];
}) => {
  const isGrid = true;
  const grid =
    "grid grid-cols-1 gap-4 sm:pl-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5";
  const list = "grid grid-cols-1";

  return (
    <div className={isGrid ? grid : list}>
      {tokens
        ? tokens.map((token, index) => {
            return (
              <TokenCard
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
