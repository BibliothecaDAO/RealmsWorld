/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { Activity } from "@/types";
import type { Metadata } from "next";
import { ActivityCard } from "@/app/collection/[id]/(list)/activity/ActivityCard";
import { getUsersActivity } from "@/lib/reservoir/getUsersActivity";

export async function generateMetadata({
  params,
}: {
  params: { address: string };
}): Promise<Metadata> {
  return {
    title: `Atlas - Collections Profile: ${params.address}`,
    description: `Collection Details page for ${params.address} - Created for Adventurers by Bibliotheca DAO`,
  };
}

export default async function Page({
  params,
}: {
  params: { address: string };
}) {
  const { activities }: { activities: Activity[] } = await getUsersActivity({
    address: params.address,
  });

  return (
    <div className=" my-4 grid h-full grid-cols-1 overflow-y-auto rounded border">
      {activities?.map((activity: Activity, index: number) => {
        return <ActivityCard key={index} activity={activity} />;
      })}
    </div>
  );
}
