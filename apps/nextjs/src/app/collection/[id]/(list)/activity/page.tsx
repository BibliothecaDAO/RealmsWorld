import type { Activity } from "@/types";
import { SUPPORTED_L1_CHAIN_ID, SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import { getActivity } from "@/lib/reservoir/getActivity";

import { getCollectionAddresses } from "@realms-world/constants";

import { ActivityCard } from "./ActivityCard";
import { CollectionActivity } from "./CollectionActivity";
import { L2ActivityTable } from "./L2ActivityTable";

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
        <L2ActivityTable
          //tokenAddress={tokenAddresses[SUPPORTED_L2_CHAIN_ID]!}
          searchParams={searchParams}
          collectionId={params.id}
        />
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
