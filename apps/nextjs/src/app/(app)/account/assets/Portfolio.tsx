"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { usePendingRealmsWithdrawals } from "@/hooks/bridge/data/usePendingRealmsWithdrawals";
import { useUIStore } from "@/providers/UIStoreProvider";
import { TriangleAlert } from "lucide-react";
import { useAccount } from "wagmi";
import { useAccount as useL2Account } from "@starknet-react/core";

import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { getPortfolioTokens, PortfolioCollectionApiResponse } from "@/lib/ark/getPortfolioTokens";
import { useArkClient } from "@/lib/ark/useArkClient";
import Media from "@/app/_components/Media";
import { PortfolioItemsGrid } from "./PortfolioItemsGrid";
import { ChainId, CollectionAddresses } from "@realms-world/constants";
import { getAddressesForChainId } from "@realms-world/constants/src/Collections";
import { ViewType } from "@/app/_components/ViewToggleGroup";
import PortfolioItemsToolsBar from "./PortfolioItemsFilter";
import { useInView } from "framer-motion";

export const Portfolio = () => {
    const [itemsFiltersOpen, setItemsFiltersOpen] = useState(false);
    const [viewType, setViewType] = useState<ViewType>("large-grid");

    const [activeChain, setActiveChain] = useState("l1");
    const { address } = useAccount();
    const { address: l2Address } = useL2Account();

    const { data: pendingWithdrawals } = usePendingRealmsWithdrawals({
        address,
        status: "ACCEPTED_ON_L1",
    });
    const { toggleAccount } = useUIStore((state) => state);
    const { marketplace: arkClient } = useArkClient();

    const {
        data: infiniteData,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["walletTokens"/*, collectionFilter*/, l2Address],
        refetchInterval: 10_000,
        placeholderData: keepPreviousData,
        getNextPageParam: (lastPage: PortfolioCollectionApiResponse) => lastPage.next_page,
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
                //collectionAddress: collectionFilter,
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

    const ref = useRef(null);
    const isInView = useInView(ref, { once: false });
    useEffect(() => {
        if (isInView) fetchNextPage();
    }, [fetchNextPage, isInView]);

    return (
        <div>
            <PortfolioItemsToolsBar
                filtersOpen={itemsFiltersOpen}
                walletAddress={l2Address}
                // walletCollectionsInitialData={walletCollectionsInitialData}
                toggleFiltersOpen={() =>
                    setItemsFiltersOpen((previous) => !previous)
                }
                setViewType={setViewType}
                viewType={viewType}
            />
            <PortfolioItemsGrid walletTokens={filteredWalletTokens} viewType={viewType} />
            <div className="w-full" ref={ref} />
        </div>
    );
};
