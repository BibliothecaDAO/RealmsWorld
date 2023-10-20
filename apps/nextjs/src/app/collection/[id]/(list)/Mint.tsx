"use client";

import { useState } from "react";
import { Button } from "@/app/_components/ui/button";
import { StarknetLoginButton } from "@/app/_components/wallet/StarknetLoginButton";
import { NETWORK_NAME, STARKSCAN_TX_URL } from "@/constants/env";
import { ChainType, tokens } from "@/constants/tokens";
import { getTokenContractAddresses } from "@/utils/utils";
import {
  useAccount,
  useContractWrite,
  useWaitForTransaction,
} from "@starknet-react/core";
import { ExternalLinkIcon, Loader2 } from "lucide-react";
import { uint256 } from "starknet";

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

export default function Mint({ contractId }: { contractId: string }) {
  const { account } = useAccount();

  //const token = erc721Tokens[params.id as keyof typeof erc721Tokens];
  const tokenAddress = getTokenContractAddresses("goldenToken").L2;
  const isGoldenToken =
    contractId == tokenAddress || contractId == "goldenToken";

  /*const tokenAddresses = getTokenContractAddresses(
    params.id as keyof typeof erc721Tokens,
  );*/
  const [hash, setHash] = useState(undefined);

  const {
    data: mintData,
    write,
    isLoading: isTxSubmitting,
  } = useContractWrite({
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

  const {
    data: submittedData,
    isLoading: isTxLoading,
    error,
  } = useWaitForTransaction({ hash: mintData?.transaction_hash, watch: true });

  const isLoading = isTxSubmitting || (mintData && isTxLoading);
  return (
    <div className="mx-auto mt-36 md:w-[750px]">
      <div className="w-full rounded-xl border p-6">
        <h1>Golden Token Mint</h1>
        <p className="mb-4">
          Purchase a golden token for your eternal access (1 death/day) to Loot
          Survivor
        </p>
        {account ? (
          <Button disabled={isLoading} size={"lg"} onClick={() => write()}>
            {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            Mint{isLoading && "ing"}
          </Button>
        ) : (
          <StarknetLoginButton />
        )}
      </div>
      {submittedData && (
        <div className="mt-12 w-full rounded-xl border p-6">
          <h1 className="flex">
            You have minted Golden Token #
            {(submittedData as any)?.events[1] ? (
              uint256
                .uint256ToBN({
                  low: (submittedData as any)?.events[1]?.data[2],
                  high: (submittedData as any)?.events[1]?.data[3],
                })
                .toString()
            ) : (
              <Loader2 className="ml-2 h-8 w-8 animate-spin" />
            )}
          </h1>
          <Button
            className=" justify-between normal-case"
            size={"xs"}
            variant={"outline"}
            rel="noopener noreferrer"
            href={STARKSCAN_TX_URL(mintData?.transaction_hash)}
          >
            <span>View Tx Explorer</span>
            <ExternalLinkIcon className="ml-2 h-3 w-3" />
          </Button>
        </div>
      )}
    </div>
  );
}
