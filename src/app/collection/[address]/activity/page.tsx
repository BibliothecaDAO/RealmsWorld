import { getData } from "@/functions";
import { CollectionActivity } from "../../CollectionActivity";
import { ActivityCard } from "@/app/components/ActivityCard";
import { Activity } from "@/types";

export default async function Page({
  params,
  searchParams,
}: {
  params: { address: string };
  searchParams: any;
}) {
  const types = searchParams.types || "undefined";
  console.log(types);

  const { activities } = await getData(
    {
      collection: params.address,
      types: types.split(",").map((q: any) => {
        return { types: q };
      }),
    },
    "activity"
  );

  return (
    <div className="flex">
      <CollectionActivity address={params.address} />

      <div className="grid flex-grow grid-cols-1">
        {activities &&
          activities.map((activity: Activity, index: number) => {
            return <ActivityCard key={index} activity={activity} />;
          })}
      </div>
    </div>
  );
}
