"use client";

import { useEffect, useRef } from "react";
import { api } from "@/trpc/react";
import { useInView } from "framer-motion";

import type { RouterInputs } from "@realms-world/api";
import type { Collections } from "@realms-world/constants";
import { MarketplaceCollectionIds } from "@realms-world/constants";

import { L2ActivityCard } from "./L2ActivityCard";

export const L2ActivityTable = ({
  searchParams,
  collectionId,
}: {
  searchParams: { types?: string[] | string };
  collectionId: string;
}) => {
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
  const [erc721MarketEvents, { fetchNextPage, hasNextPage, isFetching }] =
    api.erc721MarketEvents.all.useSuspenseInfiniteQuery(filters, {
      getNextPageParam(lastPage) {
        return lastPage.nextCursor;
      },
      refetchInterval: 0,
    });

  const isInView = useInView(ref, { once: false });

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    if (isInView) fetchNextPage();
  }, [fetchNextPage, isInView]);

  return (
    <div className="w-full">
      <div id="activity-container" className="grid flex-grow grid-cols-1">
        {erc721MarketEvents
          ? erc721MarketEvents.pages?.map((page) =>
              page.items.map((activity, index: number) => {
                return <L2ActivityCard key={index} activity={activity} />;
              }),
            )
          : "Encountered a temporary error. Please refresh the page and retry."}
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
