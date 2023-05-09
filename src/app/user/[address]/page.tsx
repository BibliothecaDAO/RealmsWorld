import { hexToNumber, shortenHex } from "@/functions/utils";
import { UserTokenData } from "@/types";
import Image from "next/image";
import TabbedView from "@/app/components/TabbedView";
import UserTokenGrid from "@/app/components/UserTokenGrid";
import { customContractNames } from "@/constants/whiteListedContracts";
import { Suspense } from "react";
import { Metadata } from "next";
import { Tabs } from "@/app/components/Tabs";
import { getUser } from "@/app/lib/reservoir/getUser";
import { getUsersActivity } from "@/app/lib/reservoir/getUsersActivity";

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
  const { tokens }: { tokens: UserTokenData[] } = await getUser({
    address: params.address,
  });
  const activityData = getUsersActivity({ address: params.address });

  // // Group tokens by contract
  // const tokensByContract = tokens.reduce<Record<string, UserTokenData[]>>(
  //   (acc, token) => {
  //     const contract = customContractNames[token.token.contract]
  //       ? token.token.contract
  //       : "All";

  //     acc[contract] = acc[contract] || [];
  //     acc[contract].push(token);

  //     return acc;
  //   },
  //   {}
  // );

  // const contractOrder = Object.keys(customContractNames);

  // // Create TabInfo array for TabbedView
  // const tabs = Object.entries(tokensByContract)
  //   .map(([contract, tokens]) => ({
  //     name: customContractNames[contract] || "All",
  //     content: (
  //       <Suspense fallback={<div>Loading...</div>}>
  //         <UserTokenGrid tokens={tokens} />
  //       </Suspense>
  //     ),
  //   }))
  //   .sort((a, b) => {
  //     if (a.name === "All") return 1;
  //     if (b.name === "All") return -1;

  //     const aIndex = contractOrder.indexOf(a.name);
  //     const bIndex = contractOrder.indexOf(b.name);

  //     return aIndex - bIndex;
  //   });

  return <UserTokenGrid tokens={tokens} />;
}
