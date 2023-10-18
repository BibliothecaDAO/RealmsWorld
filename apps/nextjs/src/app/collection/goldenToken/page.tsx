"use client";

import type { Metadata } from "next";
import { Button } from "@/app/_components/ui/button";
import type { erc721Tokens } from "@/constants";
import { getTokenContractAddresses, isStarknetAddress } from "@/utils/utils";
import { useContractWrite } from "@starknet-react/core";
import { Loader2 } from "lucide-react";

//export const runtime = "edge";

/*export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const tokenAddresses = getTokenContractAddresses(
    params.id as keyof typeof erc721Tokens,
  );
  const collectionData = await getCollections([
    { contract: tokenAddresses.L1 ?? params.id },
  ]);
  const collection: Collection = collectionData.collections?.[0];

  return {
    title: `Collection: ${collection?.name}`,
    description: `Collection Details and Marketplace for ${collection?.name} - Created for adventurers by Bibliotheca DAO`,
  };
}*/

export default function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: {
    page?: string;
  };
}) {
  //const token = erc721Tokens[params.id as keyof typeof erc721Tokens];
  const tokenAddress = getTokenContractAddresses("goldenToken").L2;
  const isGoldenToken = params.id == tokenAddress || params.id == "goldenToken";

  const tokenAddresses = getTokenContractAddresses(
    params.id as keyof typeof erc721Tokens,
  );

  const { write, isLoading } = useContractWrite({
    calls: [
      {
        contractAddress: tokenAddress as `0x${string}`,
        entrypoint: "mint",
      },
    ],
  });

  return (
    <div className="mx-auto mt-36 rounded-xl border p-6 md:w-[750px]">
      <h1>Golden Token Mint</h1>
      <p className="mb-4">
        Purchase a golden token for your eternal access (1 death/day) to Loot
        Survivor
      </p>
      <Button disabled={isLoading} size={"lg"} onClick={() => write()}>
        {isLoading && <Loader2 className="h-5 w-5 animate-spin" />}
        Mint
      </Button>
    </div>
  );
}
