"use client";

import { tokens } from "@/constants/tokens";
import { Token, TokenMarketData } from "@/types";
import { api } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

import { BeastCard } from "./BeastCard";

//import { SweepModal } from '@reservoir0x/reservoir-kit-ui'

export const BeastsTable = ({}: {}) => {
  const isGrid = true;
  const grid =
    "grid grid-cols-1 gap-4 sm:pl-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5";
  const list = "grid grid-cols-1";

  const [beasts] = api.beasts.all.useSuspenseQuery();

  return (
    <div className={isGrid ? grid : list}>
      {beasts
        ? beasts?.map((token, index) => {
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
