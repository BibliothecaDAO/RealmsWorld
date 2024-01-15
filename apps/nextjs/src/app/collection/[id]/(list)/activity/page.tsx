import type { erc721Tokens } from "@/constants";
import type { Activity } from "@/types";
import { getActivity } from "@/lib/reservoir/getActivity";
import { getTokenContractAddresses } from "@/utils/utils";

import { ActivityCard } from "./ActivityCard";
import { CollectionActivity } from "./CollectionActivity";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: any;
}) {
  const types =
    typeof searchParams.types === "string"
      ? [{ types: searchParams.types }]
      : searchParams.types?.map((q: any) => {
          return { types: q };
        });

  const tokenAddresses = getTokenContractAddresses(
    params.id as keyof typeof erc721Tokens,
  );
  const { activities } = await getActivity({
    collection: tokenAddresses.L1 ?? params.id,
    query: { types: types },
  });

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
