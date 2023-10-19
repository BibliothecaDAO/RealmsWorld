"use client";

import { useState } from "react";
import type { Metadata } from "next";
import { Button } from "@/app/_components/ui/button";
import { StarknetLoginButton } from "@/app/_components/wallet/StarknetLoginButton";
import type { erc721Tokens } from "@/constants";
import { NETWORK_NAME, STARKSCAN_TX_URL } from "@/constants/env";
import { ChainType, tokens } from "@/constants/tokens";
import { getTokenContractAddresses, isStarknetAddress } from "@/utils/utils";
import {
  useAccount,
  useContractWrite,
  useWaitForTransaction,
} from "@starknet-react/core";
import { ExternalLinkIcon, Loader2 } from "lucide-react";
import { number, uint256 } from "starknet";

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
  const { account } = useAccount();

  //const token = erc721Tokens[params.id as keyof typeof erc721Tokens];
  const tokenAddress = getTokenContractAddresses("goldenToken").L2;
  const isGoldenToken = params.id == tokenAddress || params.id == "goldenToken";

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

  const data = {
    events: [
      {
        from_address:
          "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
        keys: [
          "0x134692b230b9e1ffa39098904722134159652b09c5bc41d88d6698779d228ff",
        ],
        data: [
          "0x37c6b561b367a85b68668e8663041b9e2f4199c346fbda97dc0c2167f7a6016",
          "0x3af06d4c23f8516e7e75625afb04ca76a18908ed8725534848ca8d11502eb35",
          "0x1d1b88ab1e49400",
          "0x0",
        ],
      },
      {
        from_address:
          "0x3af06d4c23f8516e7e75625afb04ca76a18908ed8725534848ca8d11502eb35",
        keys: [
          "0x99cd8bde557814842a3121e8ddfd433a539b8c9f14bf31ebf108d12e6196e9",
        ],
        data: [
          "0x0",
          "0x37c6b561b367a85b68668e8663041b9e2f4199c346fbda97dc0c2167f7a6016",
          "0xb",
          "0x0",
        ],
      },
      {
        from_address:
          "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
        keys: [
          "0x99cd8bde557814842a3121e8ddfd433a539b8c9f14bf31ebf108d12e6196e9",
        ],
        data: [
          "0x37c6b561b367a85b68668e8663041b9e2f4199c346fbda97dc0c2167f7a6016",
          "0x20b96923a9e60f63a1829d440a03cf680768cadbc8fe737f71380258817d85b",
          "0xe680992c00",
          "0x0",
        ],
      },
      {
        from_address:
          "0x37c6b561b367a85b68668e8663041b9e2f4199c346fbda97dc0c2167f7a6016",
        keys: [
          "0x1dcde06aabdbca2f80aa51392b345d7549d7757aa855f7e37f5d335ac8243b1",
          "0x3ce5a3ccddd3dad7ec10f3354fa813cbf66c28df5634dfd1922584baf155680",
        ],
        data: ["0x2", "0x1", "0x1", "0x0"],
      },
      {
        from_address:
          "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
        keys: [
          "0x99cd8bde557814842a3121e8ddfd433a539b8c9f14bf31ebf108d12e6196e9",
        ],
        data: [
          "0x37c6b561b367a85b68668e8663041b9e2f4199c346fbda97dc0c2167f7a6016",
          "0x1176a1bd84444c89232ec27754698e5d2e7e1a7f1539f12027f28b23ec9f3d8",
          "0x7edd14c3e7e",
          "0x0",
        ],
      },
    ],
  };

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
          <h1>
            You have minted Golden Token #
            {(submittedData as any)?.events[1] ? (
              uint256
                .uint256ToBN({
                  low: (submittedData as any)?.events[1]?.data[2],
                  high: (submittedData as any)?.events[1]?.data[3],
                })
                .toString()
            ) : (
              <Loader2 className="mr-2 h-6 w-6 animate-spin" />
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
