import { Suspense } from "react";
import { Metadata } from "next";
import { ActivityCard } from "@/app/collection/[id]/(list)/activity/ActivityCard";
import { getUsersActivity } from "@/lib/reservoir/getUsersActivity";
import { Activity, UserTokenData } from "@/types";

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
    <div className="my-4 grid h-full grid-cols-1 overflow-y-auto rounded border border-white/20">
      {activities &&
        activities.map((activity: Activity, index: number) => {
          return <ActivityCard key={index} activity={activity} />;
        })}
    </div>
  );
}
