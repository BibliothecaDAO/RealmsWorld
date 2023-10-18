"use client";

import type { Metadata } from "next";
import { Button } from "@/app/_components/ui/button";
import type { erc721Tokens } from "@/constants";
import { NETWORK_NAME } from "@/constants/env";
import { ChainType, tokens } from "@/constants/tokens";
import { getTokenContractAddresses, isStarknetAddress } from "@/utils/utils";
import { useContractWrite } from "@starknet-react/core";
import { Loader2 } from "lucide-react";
import { parseEther } from "viem";

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
const MINT_COST = 131088770000000000;

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

  /*const tokenAddresses = getTokenContractAddresses(
    params.id as keyof typeof erc721Tokens,
  );*/
  console.log(tokens.L2.ETH.tokenAddress?.[ChainType.L2[NETWORK_NAME]]);
  const { write, isLoading } = useContractWrite({
    calls: [
      {
        contractAddress: tokens.L2.ETH.tokenAddress?.[
          ChainType.L2[NETWORK_NAME]
        ] as `0x${string}`,
        entrypoint: "approve",
        calldata: [tokenAddress as `0x${string}`, MINT_COST, 0],
      },
      {
        contractAddress: tokenAddress as `0x${string}`,
        entrypoint: "mint",
        calldata: [],
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
        {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
        Mint{isLoading && "ing"}
      </Button>
    </div>
  );
}
