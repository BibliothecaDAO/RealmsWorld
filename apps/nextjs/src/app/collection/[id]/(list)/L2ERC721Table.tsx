"use client";

import { useEffect, useRef } from "react";
import { api } from "@/utils/api";
import { useInView } from "framer-motion";

import { TokenCardSkeleton } from "../../TokenCardSkeleton";
import { L2ERC721Card } from "./L2ERC721Card";

//import { SweepModal } from '@reservoir0x/reservoir-kit-ui'

export const L2ERC721Table = ({
  contractAddress,
}: {
  contractAddress: string;
}) => {
  const isGrid = true;
  const grid =
    "grid grid-cols-1 gap-4 sm:pl-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5";
  const list = "grid grid-cols-1 w-full";
  const ref = useRef(null);

  const [erc721Tokens, { fetchNextPage, isLoading, hasNextPage }] =
    api.erc721Tokens.all.useSuspenseInfiniteQuery(
      { limit: 10, contractAddress },
      {
        getNextPageParam(lastPage) {
          return lastPage.nextCursor;
        },
      },
    );
  const isInView = useInView(ref, { once: false });

  useEffect(() => {
    console.log("Element is in view: ", isInView);
    if (isInView) {
      fetchNextPage();
    }
  }, [fetchNextPage, isInView]);

  return (
    <>
      <div className={isGrid ? grid : list}>
        {erc721Tokens
          ? erc721Tokens?.pages?.map((page, index) =>
              page.items.map((token, index) => {
                return (
                  <L2ERC721Card
                    key={index}
                    token={token}
                    layout={isGrid ? "grid" : "list"}
                  />
                );
              }),
            )
          : "No Assets Found"}
      </div>
      {!isLoading && hasNextPage && (
        <div
          ref={ref}
          className="mt-6 grid grid-cols-1 gap-4 sm:pl-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <TokenCardSkeleton key={index} />
          ))}
        </div>
      )}
    </>
  );
};
