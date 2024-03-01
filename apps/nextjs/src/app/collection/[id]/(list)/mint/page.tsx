/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { StarknetLoginButton } from "@/app/_components/wallet/StarknetLoginButton";
import {
  NETWORK_NAME,
  STARKSCAN_TX_URL,
  SUPPORTED_L2_CHAIN_ID,
} from "@/constants/env";
import { ChainType, tokens } from "@/constants/tokens";
import {
  useAccount,
  useContractWrite,
  useWaitForTransaction,
} from "@starknet-react/core";
import { ExternalLinkIcon, Loader2 } from "lucide-react";
import { uint256 } from "starknet";
import { formatEther } from "viem";

import { Collections, getCollectionAddresses } from "@realms-world/constants";
import { Button, Input } from "@realms-world/ui";

// MAINNET TODO: UPDATE PRICE

const MINT_COST =
  process.env.NEXT_PUBLIC_IS_TESTNET == "true" ? 99000 : 90000000000000000;

export default function Mint() {
  const { account } = useAccount();

  const tokenAddress = getCollectionAddresses(Collections.GOLDEN_TOKEN)[
    SUPPORTED_L2_CHAIN_ID
  ];
  const [mintQty, setMintQty] = useState(1);

  const calls = useMemo(() => {
    const tx = {
      contractAddress: tokenAddress as `0x${string}`,
      entrypoint: "mint",
      calldata: [],
    };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return Array(mintQty).fill(tx);
  }, [mintQty, tokenAddress]);

  const {
    data: mintData,
    write,
    isPending: isTxSubmitting,
  } = useContractWrite({
    calls: [
      {
        contractAddress: tokens.L2.ETH.tokenAddress?.[
          ChainType.L2[NETWORK_NAME]
        ] as `0x${string}`,
        entrypoint: "approve",
        calldata: [tokenAddress as `0x${string}`, MINT_COST * mintQty, 0],
      },

      ...calls,
    ],
  });
  const {
    data: submittedData,
    isLoading: isTxLoading,
    error,
  } = useWaitForTransaction({ hash: mintData?.transaction_hash });

  const isLoading = isTxSubmitting || (mintData && isTxLoading);
  return (
    <div className="mx-auto mt-12 sm:mt-36 md:w-[750px]">
      <div className="w-full rounded-xl border bg-dark-green sm:flex">
        <Image
          src="/collections/goldenToken.svg"
          alt="Golden Token"
          width={300}
          height={300}
          className="w-full rounded-l sm:w-2/5"
        />
        <div className="p-6">
          <h1>Golden Token</h1>
          <p className="mb-8">One free game, every day, forever</p>

          {account ? (
            <div className="flex items-center">
              <Input
                className="mr-4 !h-[44px] w-14"
                type="number"
                value={mintQty}
                min={1}
                onChange={(e) => setMintQty(parseInt(e.target.value))}
              />
              <Button
                className="mr-4"
                disabled={isLoading}
                size={"lg"}
                onClick={() => write()}
              >
                {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                Mint{isLoading && "ing"}
              </Button>
              {formatEther(BigInt(MINT_COST * mintQty))} Eth
            </div>
          ) : (
            <StarknetLoginButton />
          )}
        </div>
      </div>
      {submittedData && (
        <div className="mt-12 w-full rounded-xl border p-6">
          <h1 className="flex">
            You have minted Golden Token #
            {/* @ts-expect-error starknet-react types return */}
            {submittedData?.events[1].data ? (
              <>
                {uint256
                  .uint256ToBN({
                    low: (submittedData as any)?.events[1]?.data[2],
                    high: (submittedData as any)?.events[1]?.data[3],
                  })
                  .toString()}
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
              </>
            ) : (
              <Loader2 className="ml-2 h-8 w-8 animate-spin" />
            )}
          </h1>
          <Button
            href={`/collection/goldenToken/${
              (submittedData as any)?.events[1]?.data[2]
            }`}
          >
            View Token
          </Button>
        </div>
      )}
      {error && <div>Something Went Wrong</div>}
    </div>
  );
}
