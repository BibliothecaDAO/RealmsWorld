"use client";

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

import type { RouterInputs } from "@realms-world/api";
import type { Collections } from "@realms-world/constants";
import { getCollectionAddresses, MarketplaceCollectionIds } from "@realms-world/constants";

import { L2ActivityCard } from "./L2ActivityCard";
import { getCollectionActivity } from "@/lib/ark/getCollectionActivity";
import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import { useArkClient } from "@/lib/ark/useArkClient";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

export const L2ActivityTable = ({
  searchParams,
  collectionId,
}: {
  searchParams: { types?: string[] | string };
  collectionId: string;
}) => {

  const tokenAddresses = getCollectionAddresses(collectionId);
  const collectionAddress = tokenAddresses[SUPPORTED_L2_CHAIN_ID] as `0x${string}`;

  const ref = useRef(null);

  const statusArray =
    typeof searchParams.types === "string"
      ? [searchParams.types]
      : searchParams.types;
  //@ts-expect-error works
  const status: ("filled" | "open")[] = statusArray?.map((status) => {
    switch (status) {
      case "sale":
        return "filled";
      case "listing":
        return "open";
    }
  });
  const filters: RouterInputs["erc721MarketEvents"]["all"] = {
    collectionId: MarketplaceCollectionIds[collectionId as Collections],
    orderBy: "timestamp",
    limit: 16,
  };
  if (statusArray) filters.status = status;

  const { marketplace: arkClient } = useArkClient();
  const { data: erc721MarketEvents, fetchNextPage, hasNextPage, isFetching } = useSuspenseInfiniteQuery({
    queryKey: ['erc721Tokens', collectionAddress, filters],
    queryFn: async ({ pageParam }) => {
      return await getCollectionActivity({ client: arkClient, collectionAddress: collectionAddress, page: pageParam ?? 1, ...filters });
    },
    getNextPageParam: (lastPage) => lastPage.next_page,
  });

  const isInView = useInView(ref, { once: false });

  useEffect(() => {

    if (isInView) fetchNextPage();
  }, [fetchNextPage, isInView]);

  return (
    <div className="w-full">
      <div id="activity-container" className="grid flex-grow grid-cols-1">
        {erc721MarketEvents.pages[0].data.map((activity, index) => {
          return <L2ActivityCard key={index} activity={activity} collectionId={collectionId} />;
        })}
        {isFetching &&
          hasNextPage &&
          Array.from({ length: 3 }).map((_, index) => (
            <div
              className="w-full border bg-medium-dark-green/50"
              key={index}
            />
          ))}
      </div>
      <div className="col-span-12 mt-6" ref={ref} />
    </div>
  );
};
