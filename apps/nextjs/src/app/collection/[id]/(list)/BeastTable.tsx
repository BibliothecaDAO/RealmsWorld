"use client";

import { useEffect, useRef } from "react";
import { tokens } from "@/constants/tokens";
import { Token, TokenMarketData } from "@/types";
import { api } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useInView } from "framer-motion";

import { BeastCard } from "./BeastCard";

//import { SweepModal } from '@reservoir0x/reservoir-kit-ui'

export const BeastsTable = ({}: {}) => {
  const isGrid = true;
  const grid =
    "grid grid-cols-1 gap-4 sm:pl-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5";
  const list = "grid grid-cols-1 w-full";
  const ref = useRef(null);

  const [beasts, { fetchNextPage, isLoading, hasNextPage }] =
    api.beasts.all.useSuspenseInfiniteQuery(
      { limit: 10 },
      {
        getNextPageParam(lastPage) {
          return lastPage.nextCursor;
        },
      },
    );
  const isInView = useInView(ref, { once: false });
  console.log(beasts);

  useEffect(() => {
    console.log("Element is in view: ", isInView);
    if (isInView) {
      fetchNextPage();
    }
  }, [isInView]);

  return (
    <>
      <div className={isGrid ? grid : list}>
        {beasts
          ? beasts?.pages?.map((page, index) => {
              return (
                <>
                  {page.items.map((token, index) => {
                    return (
                      <BeastCard
                        key={index}
                        token={token}
                        layout={isGrid ? "grid" : "list"}
                      />
                    );
                  })}
                </>
              );
            })
          : "No Assets Found"}
      </div>
      {!isLoading && hasNextPage && (
        <div className="mt-16 w-full" ref={ref}>
          Loading
        </div>
      )}
    </>
  );
};
