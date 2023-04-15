import { getData } from "@/functions";
import { hexToNumber, shortenHex } from "@/functions/utils";
import { UserTokenData } from "@/types";
import Image from "next/image";
import TabbedView from "@/app/components/TabbedView";
import UserTokenGrid from "@/app/components/UserTokenGrid";
import { customContractNames } from "@/constants/whiteListedContracts";
import { Suspense } from "react";
import { Metadata } from "next";

export async function generateMetadata(
  { params }: { params: { address: string } }
): Promise<Metadata> {
  return {
    title: `Atlas - Collections Profile: ${params.address}`,
    description: `Collection Details page for ${params.address} - Created for Adventurers by Bibliotheca DAO`
  };
}

export default async function Page({ params }: { params: { address: string } }) {
  const id = hexToNumber(params.address, 1, 10);
  const data = await getData({ address: params.address }, "user");
  const tokens: UserTokenData[] = data.tokens;

  // Group tokens by contract
  const tokensByContract = tokens.reduce<Record<string, UserTokenData[]>>(
    (acc, token) => {
      const contract = customContractNames[token.token.contract]
        ? token.token.contract
        : "All";

      acc[contract] = acc[contract] || [];
      acc[contract].push(token);

      return acc;
    },
    {}
  );

  const contractOrder = Object.keys(customContractNames);

  // Create TabInfo array for TabbedView
  const tabs = Object.entries(tokensByContract)
    .map(([contract, tokens]) => ({
      name: customContractNames[contract] || "All",
      component: (
        <Suspense fallback={<div>Loading...</div>}>
          <UserTokenGrid tokens={tokens} />
        </Suspense>
      ),
    }))
    .sort((a, b) => {
      if (a.name === "All") return 1;
      if (b.name === "All") return -1;

      const aIndex = contractOrder.indexOf(a.name);
      const bIndex = contractOrder.indexOf(b.name);

      return aIndex - bIndex;
    });

  return (
    <div className="flex h-full p-8 -mt-64">
      <div className="flex-none w-1/3 p-4 rounded-t-2xl bg-gradient-to-b from-theme-gray-light">
        <Image
          src={`/users/${id}.png`}
          alt="An example image"
          width={2000}
          height={2000}
          className="mx-auto rounded"
        />
      </div>
      <div className="flex-grow p-8">
        <h1>{shortenHex(params.address)}</h1>
        <hr />
        <TabbedView tabs={tabs} initialActiveTab={tabs[0]?.name} />
      </div>
    </div>
  );
}