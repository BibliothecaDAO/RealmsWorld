"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { NftActions } from "@/app/(app)/account/assets/NftActions";
import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import useNftSelection from "@/hooks/useNftSelection";
import { cleanQuery } from "@/lib/reservoir/getToken";
import { useUIStore } from "@/providers/UIStoreProvider";
import { useInView } from "framer-motion";

import type { RouterInputs } from "@realms-world/api";
import { getCollectionFromAddress } from "@realms-world/constants";
import { getCollectionTokens } from "@/lib/ark/getCollectionTokens";

import { TokenCardSkeleton } from "../../TokenCardSkeleton";
import { L2ERC721Card } from "./L2ERC721Card";
import { useArkClient } from "@/lib/ark/useArkClient";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { parseAsBoolean, parseAsJson, useQueryState } from "nuqs";
import { Filters } from "@/types/ark";
import CollectionFilters from "./CollectionFilters";

const L2ERC721Table = ({
  contractAddress,
  ownerAddress,
  infiniteScroll = true,
  loadMoreAssetName = "",
  limit = 24,
  selectable = false,
}: {
  contractAddress: string;
  ownerAddress?: string;
  infiniteScroll?: boolean;
  loadMoreAssetName?: string;
  limit?: number;
  selectable?: boolean;
}) => {
  const { isGrid } = useUIStore((state) => state);
  const grid =
    "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 p-3";
  const list = "grid grid-cols-1 w-full";

  const ref = useRef(null);

  const searchParams = useSearchParams();

  const [filtersPanelOpen, setFiltersPanelOpen] = useState(true);
  const [filtersDialogOpen, setFiltersDialogOpen] = useState(false);

  const sortDirection = searchParams.get("sortDirection");
  const sortBy = searchParams.get("sortBy");
  const [buyNow, setBuyNow] = useQueryState(
    "buy_now",
    parseAsBoolean.withDefault(false),
  );
  const [filters, setFilters] = useQueryState<Filters>(
    "filters",
    parseAsJson<Filters>().withDefault({
      traits: {},
    }),
  );

  const toggleFiltersPanel = () => setFiltersPanelOpen((open) => !open);

  const handlerFiltersChange = async (newFilters: Filters) => {
    await setFilters(newFilters);
  };

  const resetFiltersTraits = async () => {
    await setFilters({
      ...filters,
      traits: {},
    });
  };

  const removeFiltersTraits = async (key: string, value: string) => {
    const newTraits = { ...filters.traits };
    const values = newTraits[key] ?? [];
    const newValues = values.filter((v) => v !== value);

    if (newValues.length === 0) {
      delete newTraits[key];
    } else {
      newTraits[key] = newValues;
    }

    await setFilters({
      ...filters,
      traits: newTraits,
    });
  };

  const filtersCount = Object.values(filters.traits).reduce(
    (acc, traitValues) => acc + traitValues.length,
    0,
  );
  if (ownerAddress) {
    filters.owner = ownerAddress;
  }

  const { marketplace: arkClient } = useArkClient();
  const {
    data: erc721Tokens,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useSuspenseInfiniteQuery({
    queryKey: ["erc721Tokens", contractAddress, ownerAddress, filters, buyNow],
    queryFn: async ({ pageParam }) => {
      return await getCollectionTokens({
        client: arkClient,
        collectionAddress: contractAddress,
        page: pageParam ?? 1,
        buyNowOnly: buyNow,
        filters,
      });
    },
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage.next_page,
  });

  const isInView = useInView(ref, { once: false });
  useEffect(() => {
    if (isInView && infiniteScroll) fetchNextPage();
  }, [fetchNextPage, infiniteScroll, isInView]);

  const {
    deselectAllNfts,
    isNftSelected,
    selectBatchNfts,
    //selectedCollectionAddress,
    toggleNftSelection,
    totalSelectedNfts,
    selectedTokenIds,
  } = useNftSelection({ userAddress: ownerAddress as `0x${string}` });

  if (erc721Tokens.pages[0]?.data.length === 0) {
    return <>No Assets Found</>;
  }

  return (
    <div className="flex">
      <Suspense>
        <CollectionFilters
          collectionAddress={contractAddress}
          filters={filters}
          onFiltersChange={handlerFiltersChange}
          isOpen={filtersPanelOpen}
          buyNow={buyNow}
          setBuyNow={setBuyNow}
        />
      </Suspense>
      {selectable && (
        <NftActions
          selectedTokenIds={selectedTokenIds}
          totalSelectedNfts={totalSelectedNfts}
          selectBatchNfts={selectBatchNfts}
          tokens={erc721Tokens.pages[0]?.data}
          deselectAllNfts={deselectAllNfts}
          sourceChain={SUPPORTED_L2_CHAIN_ID}
        />
      )}
      <div className={isGrid ? grid : list}>
        {erc721Tokens.pages.map((page) =>
          page.data.map((token, index) => {
            const isSelected = isNftSelected(
              token.token_id.toString(),
              token.collection_address ?? "0x",
            );
            if (selectable) {
              return (
                <button
                  key={index}
                  onClick={() =>
                    toggleNftSelection(
                      token.token_id.toString(),
                      token.collection_address ?? "0x",
                    )
                  }
                >
                  <L2ERC721Card
                    isSelected={isSelected}
                    token={token}
                    layout={isGrid ? "grid" : "list"}
                  />
                </button>
              );
            }

            return (
              <L2ERC721Card
                key={index}
                token={token}
                layout={isGrid ? "grid" : "list"}
              />
            );
          }),
        )}
        {!infiniteScroll &&
          erc721Tokens.pages[0]?.data.length !== undefined &&
          erc721Tokens.pages[0]?.data.length > 9 && (
            <Link href={`/user/${ownerAddress}/${loadMoreAssetName}`}>
              <div
                className={`group flex min-h-[454px] transform cursor-pointer items-center justify-center border-2 bg-dark-green duration-300 hover:border-bright-yellow`}
              >
                <h2>View more</h2>
              </div>
            </Link>
          )}

        {infiniteScroll &&
          isFetching &&
          hasNextPage &&
          Array.from({ length: 3 }).map((_, index) => (
            <TokenCardSkeleton key={index} />
          ))}
      </div>
      {infiniteScroll && <div className="col-span-12 mt-6" ref={ref} />}
    </div>
  );
};
export default L2ERC721Table;
