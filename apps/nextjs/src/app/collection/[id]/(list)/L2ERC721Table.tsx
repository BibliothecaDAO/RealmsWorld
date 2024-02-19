"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useUIContext } from "@/app/providers/UIProvider";
import { cleanQuery } from "@/lib/reservoir/getToken";
import { api } from "@/trpc/react";
import { useInView } from "framer-motion";

import type { RouterInputs } from "@realms-world/api";

import { TokenCardSkeleton } from "../../TokenCardSkeleton";
import { L2ERC721Card } from "./L2ERC721Card";

//import { SweepModal } from '@reservoir0x/reservoir-kit-ui'
const L2ERC721Table = ({
  contractAddress,
  ownerAddress,
}: {
  contractAddress: string;
  ownerAddress?: string;
}) => {
  const { isGrid } = useUIContext();
  const grid =
    "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5";
  const list = "grid grid-cols-1 w-full";

  const ref = useRef(null);

  const searchParams = useSearchParams();

  const sortDirection = searchParams.get("sortDirection");
  const sortBy = searchParams.get("sortBy");

  const attributesObject: Record<string, string> = {};
  for (const [key, value] of searchParams.entries()) {
    attributesObject[key] = value;
  }
  const attributeFilter = cleanQuery(attributesObject);

  const filters: RouterInputs["erc721Tokens"]["all"] = {
    limit: 24,
    contractAddress,
    attributeFilter: attributeFilter,
    direction: sortDirection,
    orderBy: sortBy,
  };

  if (ownerAddress) {
    filters.owner = ownerAddress;
  }

  const [erc721Tokens, { fetchNextPage, hasNextPage, isFetching }] =
    api.erc721Tokens.all.useSuspenseInfiniteQuery(filters, {
      getNextPageParam(lastPage) {
        return lastPage.nextCursor;
      },
      refetchInterval: 15000,
    });

  const isInView = useInView(ref, { once: false });

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    if (isInView) fetchNextPage();
  }, [fetchNextPage, isInView]);

  return (
    <>
      <div className={isGrid ? grid : list}>
        {erc721Tokens.pages[0]?.items.length
          ? erc721Tokens?.pages?.map((page) =>
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
      <div className="col-span-12 mt-6" ref={ref} />
    </>
  );
};
export default L2ERC721Table;
