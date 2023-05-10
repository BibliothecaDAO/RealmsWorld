import { hexToNumber, shortenHex } from "@/functions/utils";
import Image from "next/image";
import UserTokenGrid from "@/app/components/UserTokenGrid";
import { Suspense } from "react";
import { Metadata } from "next";
import { Tabs } from "@/app/components/Tabs";
import UserTokenGridSkeleton from "@/app/components/UserTokenGridSkeleton";

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
  //const data = await getData({ address: params.address }, "user");

  //console.log(data);
  //const tokens: UserTokenData[] = data.tokens;

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

  const tabs = [
    {
      name: "Mainnet",
      content: <Suspense fallback=<UserTokenGridSkeleton />>
        {/** @ts-expect-error Server Component */}
        <UserTokenGrid address={params.address} continuation="" />
      </Suspense>
    },
    {
      name: "Starknet",
      content: <div>Coming soon</div>,
    },
    {
      name: "Activity",
      content: <div>Coming soon</div>
    }
  ];

  return (
    <div className="flex h-full p-8 -mt-64">
      <div className="flex-none w-1/3 p-4 rounded-t-2xl bg-gradient-to-b from-theme-gray-light">
        <h5>{shortenHex(params.address)}</h5>
        <Image
          src={`/users/${id}.png`}
          alt="An example image"
          width={2000}
          height={2000}
          className="mx-auto rounded"
        />
      </div>
      <div className="flex-grow p-8">

        <Tabs align="left" tabs={tabs} />
      </div>
    </div>
  );
}