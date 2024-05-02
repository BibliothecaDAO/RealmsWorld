"use client";

import { Suspense } from "react";
import { LoadingSkeletonGrid } from "@/app/_components/LoadingSkeletonGrid";
import { useLordship } from "@/hooks/staking/useLordship";
import { useStaking } from "@/hooks/staking/useStaking";
import { useAccount as useL2Account } from "@starknet-react/core";
import { InfoIcon } from "lucide-react";
import { useAccount } from "wagmi";

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@realms-world/ui";
import { AlertTriangleIcon } from "lucide-react";
import { useUIStore } from "@/providers/UIStoreProvider";

export const Overview = () => {
  const { address: l1Address } = useAccount();
  const { address: l2Address } = useL2Account();

  const {
    data,
    galleonLordsAvailable,
    carrackLordsAvailable,
    totalClaimable,
    poolV1Balance,
    poolV2Balance,
  } = useStaking();
  const delegateData = useLordship(l1Address);

  const totalLegacyStaked =
    +data?.wallet?.bridgedRealmsHeld ?? 0 +
    +data?.wallet?.bridgedV2RealmsHeld ?? 0;

  const {toggleStakingMigration} = useUIStore((state) => state)

  return (
    <div className="w-full px-4">
      {l1Address && (
        <div className="grid grid-cols-2 gap-x-8">
          <div>
            <h2 className="mb-2 text-3xl">Realms</h2>
            <Alert variant={"warning"}>
              <AlertTriangleIcon className="w-5 h-5" />
              <AlertTitle>Migrate to new contract</AlertTitle>{" "}
              <AlertDescription>
                You have {totalLegacyStaked} Realms staked in legacy contracts
                that are no longer earning $LORDS.{" "}
                <Button size={"xs"} variant={"outline"} onClick={toggleStakingMigration}>
                  Migrate Now
                </Button>
              </AlertDescription>
            </Alert>
            <Card className="w-full">
              <CardContent>{totalLegacyStaked}</CardContent>
              <CardFooter>Legacy Staked Realms</CardFooter>
            </Card>
            <div>Unstaked Realms: {data?.wallet?.realmsHeld}</div>
          </div>
          <div>
            <h2 className="mb-2 text-3xl">LORDS</h2>
            <span className="flex">
              {" "}
              Claimable Lords: {totalClaimable.toString()}
              <TooltipProvider>
                <Tooltip side="right" width={200}>
                  <TooltipTrigger>
                    <InfoIcon className="ml-3 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <>
                      <span className="text-base font-semibold">Galleon:</span>
                      <p>
                        Epoch 0-10: {galleonLordsAvailable?.toLocaleString()}
                      </p>
                      <p>Epoch 11-35: {poolV1Balance?.toLocaleString()}</p>
                      <p>Epoch 36-109: {poolV2Balance?.toLocaleString()}</p>
                      <span className="text-base font-semibold">Carrack:</span>
                      <p>
                        Epoch 11-109: {carrackLordsAvailable?.toLocaleString()}
                      </p>
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
