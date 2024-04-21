"use client";

import { Suspense } from "react";
import { LoadingSkeletonGrid } from "@/app/_components/LoadingSkeletonGrid";
import { useStaking } from "@/hooks/staking/useStaking";
import { useAccount as useL2Account } from "@starknet-react/core";
import { useAccount } from "wagmi";

import { Tooltip, TooltipContent, TooltipProvider } from "@realms-world/ui";

export const Overview = () => {
  const { address: l1Address } = useAccount();
  const { address: l2Address } = useL2Account();

  const {
    data,
    galleonLordsAvailable,
    carrackLordsAvailable,
    totalClaimable,
    poolV1BalanceData,
  } = useStaking();

  return (
    <div className="w-full px-4">
      {l1Address && (
        <div className="grid grid-cols-2">
          <div className="py-2">
            Staked Realms:{" "}
            {parseInt(((data?.wallet?.bridgedRealmsHeld ?? 0n) as bigint).toString()) +
              parseInt(
                ((data?.wallet?.bridgedV2RealmsHeld ?? 0n) as bigint).toString(),
              )}
          </div>
          <div>Unstaked Realms</div>
          <div>
            Total: {totalClaimable.toString()}
            <TooltipProvider>
              <Tooltip
                side="right"
                width={200}
                content={
                  <>
                    Galleon Lords Available: {galleonLordsAvailable?.toString()}
                    V1 Pool: {poolV1BalanceData?.toString()}
                  </>
                }
              />
            </TooltipProvider>
          </div>
        </div>
      )}
    </div>
  );
};
