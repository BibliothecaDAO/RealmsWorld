"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useUIContext } from "@/app/providers/UIProvider";
import { api } from "@/trpc/react";
import { useInView } from "framer-motion";

import { TokenCardSkeleton } from "../../TokenCardSkeleton";
import { L2ERC721Card } from "./L2ERC721Card";

//import { SweepModal } from '@reservoir0x/reservoir-kit-ui'

export const L2ERC721Table = ({
  contractAddress,
  ownerAddress,
}: {
  contractAddress: string;
  ownerAddress?: string;
}) => {
  const { isGrid } = useUIContext();
  const grid =
    "grid grid-cols-1 gap-6  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6";
  const list = "grid grid-cols-1 w-full";

  const ref = useRef(null);

  const searchParams = useSearchParams();

  const sortDirection = searchParams.get("sortDirection");
  const sortBy = searchParams.get("sortBy");

  const filters = {
    limit: 24,
    contractAddress,
    direction: sortDirection,
    orderBy: sortBy,
  };

  if (ownerAddress) {
    filters.owner = ownerAddress;
  }

  const [erc721Tokens, { fetchNextPage, isLoading, hasNextPage, isFetching }] =
    api.erc721Tokens.all.useSuspenseInfiniteQuery(filters, {
      getNextPageParam(lastPage) {
        return lastPage.nextCursor;
      },
    });

  const isInView = useInView(ref, { once: false });

  useEffect(() => {
    if (isInView) fetchNextPage();
  }, [fetchNextPage, isInView]);

  return (
    <>
      <div className={isGrid ? grid : list}>
        {erc721Tokens.pages[0]?.items.length
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

        {isFetching &&
          hasNextPage &&
          Array.from({ length: 3 }).map((_, index) => (
            <TokenCardSkeleton key={index} />
          ))}
      </div>
      <div ref={ref} />
    </>
  );
};
