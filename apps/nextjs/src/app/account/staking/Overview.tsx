"use client";

import { Suspense } from "react";
import { LoadingSkeletonGrid } from "@/app/_components/LoadingSkeletonGrid";
import { useStaking } from "@/hooks/staking/useStaking";
import { useAccount as useL2Account } from "@starknet-react/core";
import { InfoIcon } from "lucide-react";
import { useAccount } from "wagmi";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@realms-world/ui";
import { useLordship } from "@/hooks/staking/useLordship";

export const Overview = () => {
  const { address: l1Address } = useAccount();
  const { address: l2Address } = useL2Account();

  const {
    data,
    galleonLordsAvailable,
    carrackLordsAvailable,
    totalClaimable,
    poolV1Balance,
    poolV2Balance
  } = useStaking();
  const delegateData = useLordship(l1Address)

  return (
    <div className="w-full px-4">
      {l1Address && (
        <div className="grid grid-cols-2">
          <div className="py-2">
            Staked Realms:{" "}
            {parseInt(
              ((data?.wallet?.bridgedRealmsHeld ?? 0n) as bigint).toString(),
            ) +
              parseInt(
                (
                  (data?.wallet?.bridgedV2RealmsHeld ?? 0n) as bigint
                ).toString(),
              )}
          </div>
          <div>Unstaked Realms: {data?.wallet?.realmsHeld}</div>
          <div>
            <span className="flex">
              {" "}
              Claimable Lords: {totalClaimable.toString()}
              <TooltipProvider>
                <Tooltip side="right" width={200}>
                  <TooltipTrigger>
                    <InfoIcon className="w-4 ml-3"/>
                  </TooltipTrigger>
                  <TooltipContent>
                    <>
                    <span className="text-base font-semibold">Galleon:</span>
                      <p>
                        Epoch 0-10: {galleonLordsAvailable?.toLocaleString()}
                      </p>
                      <p>Epoch 11-35:  {poolV1Balance?.toLocaleString()}</p>
                      <p>Epoch 36-109:  {poolV2Balance?.toLocaleString()}</p>
                      <span className="text-base font-semibold">Carrack:</span>
                      <p>Epoch 11-109: {carrackLordsAvailable?.toLocaleString()}</p>
                    </>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};


