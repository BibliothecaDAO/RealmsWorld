"use client";

import { RealmsABI } from "@/abi/L2/Realms";
import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import { useL2LordsRewards } from "@/hooks/staking/useL2LordsRewards";
import { useStaking } from "@/hooks/staking/useStaking";
import LordsIcon from "@/icons/lords.svg";
import { useUIStore } from "@/providers/UIStoreProvider";
import { api } from "@/trpc/react";
import {
  useAccount as useL2Account,
  useReadContract,
} from "@starknet-react/core";
import { Loader } from "lucide-react";
import { formatEther } from "viem";
import { useAccount } from "wagmi";

import { Collections, getCollectionAddresses } from "@realms-world/constants";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@realms-world/ui/components/ui/card";
import { formatNumber, padAddress } from "@realms-world/utils";

import { Button } from "@realms-world/ui/components/ui/button";
import { ClaimsTable } from "../ClaimsTable";
import { RealmDelegationWarning } from "../../_components/RealmDelegationWarning";
import { StarknetAccountLogin } from "../../_components/StarknetAccountLogin";

export const Overview = () => {
  const { address: l1Address } = useAccount();
  const { address: l2Address } = useL2Account();

  const { balance, claimRewards, isSubmitting } = useL2LordsRewards();

  const { data, loading } = useStaking();
  const { toggleStakingMigration } = useUIStore((state) => state);
  const { data: lordsRewardsClaims } = api.lordsRewards.all.useQuery(
    {
      address: padAddress(l2Address),
    },
    {
      enabled: !!l2Address,
    },
  );

  const totalClaimed =
    lordsRewardsClaims?.reduce((acc, claim) => acc + Number(claim.amount), 0) ??
    0;
  const totalL1Realms =
    BigInt(data?.wallet?.realmsHeld ?? 0) +
    BigInt(data?.wallet?.bridgedRealmsHeld ?? 0) +
    BigInt(data?.wallet?.bridgedV2RealmsHeld ?? 0);

  const { data: realmsBalance } = useReadContract({
    address: getCollectionAddresses(Collections.REALMS)?.[
      SUPPORTED_L2_CHAIN_ID
    ] as `0x${string}`,
    abi: RealmsABI,
    functionName: "balance_of",
    enabled: !!l2Address,
    args: l2Address ? [l2Address] : undefined,
    refetchInterval: 10000,
  });

  return (
    <div className="w-full">
      {realmsBalance ? <RealmDelegationWarning /> : null}
      {l2Address ? (
        <>
          <div className="flex gap-8">
            <div className="w-full">
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardDescription>Claimable Lords</CardDescription>
                    <CardTitle className="flex items-center text-4xl">
                      {balance && formatNumber(Number(formatEther(balance)))}
                      <LordsIcon className="ml-3 h-7 w-7 fill-current" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button
                      onClick={() => claimRewards()}
                      className="w-full"
                      disabled={isSubmitting || !balance || balance <= 0n}
                    >
                      {isSubmitting ? (
                        <Loader className="animate-spin" />
                      ) : (
                        "Claim"
                      )}
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardDescription>Your Realms</CardDescription>
                    <CardTitle className="text-3xl">
                      {realmsBalance?.toString()}
                    </CardTitle>
                  </CardHeader>
                  <CardFooter>on Starknet</CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardDescription>Inactive Realms</CardDescription>
                    <CardTitle className="text-3xl">
                      {loading ? (
                        <Loader className="animate-spin" />
                      ) : totalL1Realms ? (
                        totalL1Realms
                      ) : (
                        "0"
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardFooter>
                    on L1{" "}
                    <Button
                      size={"xs"}
                      className="ml-2"
                      onClick={toggleStakingMigration}
                      disabled={!(totalL1Realms >= BigInt(1))}
                    >
                      Bridge Now
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="col-span-full">
                  <CardHeader>
                    <CardTitle>Past Claims</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <Card>
                      <CardHeader>
                        <CardDescription>Total Claimed</CardDescription>
                        <CardTitle className="flex items-center text-4xl">
                          {totalClaimed.toLocaleString()}
                          <LordsIcon className="ml-3 h-7 w-7 fill-current" />
                        </CardTitle>
                      </CardHeader>
                    </Card>
                    <div className="col-span-full">
                      <ClaimsTable
                        data={[
                          ...(balance
                            ? [
                                {
                                  amount: Number(formatEther(balance)).toFixed(
                                    2,
                                  ),
                                  timestamp: null,
                                },
                              ]
                            : []),
                          ...(lordsRewardsClaims ?? []),
                        ]}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          <div className="mt-24 w-full"></div>
        </>
      ) : (
        <StarknetAccountLogin />
      )}
    </div>
  );
};
