import { CollectionActivity } from "../../../CollectionActivity";
import { ActivityCard } from "@/app/components/ActivityCard";
import { Activity } from "@/types";
import { getActivity } from "@/app/lib/reservoir/getActivity";

export default async function Page({
  params,
  searchParams,
}: {
  params: { address: string };
  searchParams: any;
}) {
  const types =
    typeof searchParams.types === "string"
      ? [{ types: searchParams.types }]
      : searchParams.types?.map((q: any) => {
        return { types: q };
      });

  const { activities } = await getActivity({
    collection: params.address,
    query: { types: types },
  });

  return (
    <div className="flex">
      <CollectionActivity />
      <div id="activity-container" className="grid flex-grow grid-cols-1">
        {activities ?
          activities.map((activity: Activity, index: number) => {
            return <ActivityCard key={index} activity={activity} />;
          }) : "Encountered a temporary error. Please refresh the page and retry."}
      </div>
    </div>
  );
}