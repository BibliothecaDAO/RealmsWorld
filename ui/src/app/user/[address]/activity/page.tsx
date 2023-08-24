import { hexToNumber, shortenHex } from "@/functions/utils";
import { Activity, UserTokenData } from "@/types";
import Image from "next/image";
import TabbedView from "@/app/components/TabbedView";
import UserTokenGrid from "@/app/components/UserTokenGrid";
import { customContractNames } from "@/constants/whiteListedContracts";
import { Suspense } from "react";
import { Metadata } from "next";
import { getUser } from "@/app/lib/reservoir/getUser";
import { getUsersActivity } from "@/app/lib/reservoir/getUsersActivity";
import { ActivityCard } from "@/app/components/ActivityCard";

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
    <div className="grid grid-cols-1 my-4 overflow-y-auto border rounded border-white/20 h-full">
      {activities &&
        activities.map((activity: Activity, index: number) => {
          return <ActivityCard key={index} activity={activity} />;
        })}
    </div>
  );
}
