import type { Activity } from "@/types";
import { SUPPORTED_L1_CHAIN_ID, SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import { getActivity } from "@/lib/reservoir/getActivity";
import { api } from "@/trpc/server";

import type { RouterInputs } from "@realms-world/api";
import type { Collections } from "@realms-world/constants";
import {
  getCollectionAddresses,
  MarketplaceCollectionIds,
} from "@realms-world/constants";

import { ActivityCard } from "./ActivityCard";
import { CollectionActivity } from "./CollectionActivity";
import { L2ActivityCard } from "./L2ActivityCard";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { types?: string[] | string };
}) {
  const tokenAddresses = getCollectionAddresses(params.id);
  if (!tokenAddresses) {
    return <div>Collection Not Found</div>;
  }

  const types =
    typeof searchParams.types === "string"
      ? [{ types: searchParams.types }]
      : searchParams.types?.map((q: string) => {
          return { types: q };
        });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { activities }: { activities: Activity[] } = await getActivity({
    collection: tokenAddresses[SUPPORTED_L1_CHAIN_ID] ?? params.id,
    query: { types: types },
  });

  if (tokenAddresses[SUPPORTED_L2_CHAIN_ID]) {
    return (
      <div className="flex">
        <CollectionActivity
          searchAttributes={["sale", "transfer", "listing"]}
        />
        <div id="activity-container" className="grid flex-grow grid-cols-1">
          <L2Activites
            tokenAddress={tokenAddresses[SUPPORTED_L2_CHAIN_ID]!}
            searchParams={searchParams}
            collectionId={params.id}
          />
        </div>
      </div>
    );
  } else if (tokenAddresses[SUPPORTED_L1_CHAIN_ID]) {
    return (
      <div className="flex">
        <CollectionActivity />
        <div id="activity-container" className="grid flex-grow grid-cols-1">
          {activities
            ? activities.map((activity: Activity, index: number) => {
                return <ActivityCard key={index} activity={activity} />;
              })
            : "Encountered a temporary error. Please refresh the page and retry."}
        </div>
      </div>
    );
  }
}

const L2Activites = async ({
  tokenAddress,
  searchParams,
  collectionId,
}: {
  tokenAddress: string;
  searchParams: { types?: string[] | string };
  collectionId: string;
}) => {
  const statusArray =
    typeof searchParams.types === "string"
      ? [searchParams.types]
      : searchParams.types;

  const status = statusArray?.map((status) => {
    switch (status) {
      case "sale":
        return "filled";
      case "listing":
        return "open";
      default:
        return status;
    }
  });
  const filters: RouterInputs["erc721MarketEvents"]["all"] = {
    collectionId: MarketplaceCollectionIds[collectionId as Collections],
  };
  if (statusArray) filters.status = status;

  const erc721MarketEvents = await api.erc721MarketEvents.all(filters);

  return (
    <>
      {erc721MarketEvents
        ? erc721MarketEvents.items.map((activity, index: number) => {
            return <L2ActivityCard key={index} activity={activity} />;
          })
        : "Encountered a temporary error. Please refresh the page and retry."}
    </>
  );
};
