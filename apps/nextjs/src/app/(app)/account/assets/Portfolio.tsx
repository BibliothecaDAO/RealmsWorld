"use client";

import { useMemo, useState, useEffect, useRef, Suspense } from "react";
import { usePendingRealmsWithdrawals } from "@/hooks/bridge/data/usePendingRealmsWithdrawals";
import { useAccount } from "wagmi";
import { useAccount as useL2Account } from "@starknet-react/core";

import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import type { PortfolioCollectionApiResponse } from "@/lib/ark/getPortfolioTokens";
import { getPortfolioTokens } from "@/lib/ark/getPortfolioTokens";
import { useArkClient } from "@/lib/ark/useArkClient";
import { PortfolioItemsGrid } from "./PortfolioItemsGrid";
import { ChainId } from "@realms-world/constants";
import { getAddressesForChainId } from "@realms-world/constants/src/Collections";
import type { ViewType } from "@/app/_components/ViewToggleGroup";
import PortfolioItemsToolsBar from "./PortfolioItemsToolsBar";
import { inView, useInView } from "framer-motion";
import PortfolioItemsFiltersPanel from "./PortfolioItemsFiltersPanel";
import { StarknetAccountLogin } from "../_components/StarknetAccountLogin";

import useNftSelection from "@/hooks/useNftSelection";
import { CollectionItemsDataFallback } from "@/app/_components/LoadingSkeletonGrid";

export const Portfolio = ({
  collectionAddress,
  selectable,
}: {
  collectionAddress?: string;
  selectable?: boolean;
}) => {
  const [itemsFiltersOpen, setItemsFiltersOpen] = useState(false);
  const [viewType, setViewType] = useState<ViewType>("large-grid");

  const [activeChain, setActiveChain] = useState("l1");
  const { address } = useAccount();
  const { address: l2Address } = useL2Account();

  const { data: pendingWithdrawals } = usePendingRealmsWithdrawals({
    address,
    status: "ACCEPTED_ON_L1",
  });
  const { marketplace: arkClient } = useArkClient();

  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["walletTokens", collectionAddress, l2Address],
    refetchInterval: 10_000,
    placeholderData: keepPreviousData,
    enabled: !!l2Address,
    getNextPageParam: (lastPage: PortfolioCollectionApiResponse) =>
      lastPage.next_page,
    // initialData: isSSR
    //   ? {
    //       pages: [walletTokensInitialData],
    //       pageParams: [],
    //     }
    //   : undefined,
    initialPageParam: undefined,
    queryFn: ({ pageParam }) =>
      getPortfolioTokens({
        client: arkClient,
        page: pageParam,
        walletAddress: l2Address ? l2Address : "",
        collectionAddress: collectionAddress,
      }),
  });
  const portoflioItemsCount = infiniteData?.pages[0]?.token_count ?? 0;

  const walletTokens = useMemo(
    () => infiniteData?.pages.flatMap((page) => page.data) ?? [],
    [infiniteData],
  );

  const allCollectionAddresses = getAddressesForChainId(ChainId.SN_MAIN);

  const filteredWalletTokens = walletTokens.filter((token) => {
    return allCollectionAddresses.includes(token.collection_address);
  });

  const viewRef = useRef(null);
  const isInView = useInView(viewRef);
  useEffect(() => {
    if (isInView && !isFetchingNextPage) fetchNextPage();
  }, [isInView, fetchNextPage]);
  const {
    deselectAllNfts,
    isNftSelected,
    selectBatchNfts,
    //selectedCollectionAddress,
    toggleNftSelection,
    totalSelectedNfts,
    selectedTokenIds,
  } = useNftSelection({ userAddress: l2Address! });
  return (
    <>
      {l2Address ? (
        <div className="flex w-full">
          <PortfolioItemsFiltersPanel
            walletAddress={l2Address}
            filtersOpen={itemsFiltersOpen}
            className="sticky top-[var(--site-header-height)] hidden h-[calc(100vh-var(--site-header-height))] sm:block"
            selectable
            // walletCollectionsInitialData={walletCollectionsInitialData}
          />
          <div className="flex-1">
            <div className="sticky top-[var(--site-header-height)] z-10 mb-6 border-b border-border bg-background px-5 pb-4 pt-2 lg:mb-0 lg:border-none">
              <PortfolioItemsToolsBar
                filtersOpen={itemsFiltersOpen}
                walletAddress={l2Address}
                // walletCollectionsInitialData={walletCollectionsInitialData}
                toggleFiltersOpen={() =>
                  setItemsFiltersOpen((previous) => !previous)
                }
                setViewType={setViewType}
                viewType={viewType}
                selectable={selectable}
                selectedTokenIds={selectedTokenIds}
                totalSelectedNfts={totalSelectedNfts}
                selectBatchNfts={selectBatchNfts}
                batchTokenIds={filteredWalletTokens
                  .slice(0, 140)
                  .map((token) => token.token_id)}
                deselectAllNfts={deselectAllNfts}
              />
            </div>
            <Suspense
              fallback={<CollectionItemsDataFallback viewType={viewType} />}
            >
              <PortfolioItemsGrid
                walletTokens={filteredWalletTokens}
                viewType={viewType}
                selectable={selectable}
                isNftSelected={isNftSelected}
                toggleNftSelection={toggleNftSelection}
                isFetchingNextPage={isFetchingNextPage}
              />
            </Suspense>
          </div>
        </div>
      ) : (
        <div className="mx-auto mt-20 md:w-1/2">
          <StarknetAccountLogin />
        </div>
      )}
      <div className="z-50 h-2 w-full" ref={viewRef} />
    </>
  );
};
