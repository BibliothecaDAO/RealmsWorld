"use client";

import RealmsABI from "@/abi/L2/Realms.json";
import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import { useL2LordsRewards } from "@/hooks/staking/useL2LordsRewards";
//import { useLordship } from "@/hooks/staking/useLordship";
import { useStaking } from "@/hooks/staking/useStaking";
import LordsIcon from "@/icons/lords.svg";
import { useUIStore } from "@/providers/UIStoreProvider";
import {
  useAccount as useL2Account,
  useReadContract,
} from "@starknet-react/core";
import { Loader } from "lucide-react";
import { formatEther } from "viem";
import { useAccount } from "wagmi";

import { Collections, getCollectionAddresses } from "@realms-world/constants";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@realms-world/ui";

import { ClaimsTable } from "./ClaimsTable";
import { FloatAnimation } from "./FloatAnimation";
import { LegacyClaim } from "./LegacyClaim";
import { VeLords } from "./VeLords";

export const Overview = () => {
  const { address: l1Address } = useAccount();
  const { address: l2Address } = useL2Account();

  const { balance, claimRewards, isSubmitting, isFetching } =
    useL2LordsRewards();

  const { data } = useStaking();
  //const delegateData = useLordship(l1Address);
  const { toggleStakingMigration } = useUIStore((state) => state);

  const totalL1Realms =
    +data?.wallet?.realmsHeld +
    +data?.wallet?.bridgedRealmsHeld +
    +data?.wallet?.bridgedV2RealmsHeld;

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
      {l1Address && (
        <>
          <div className="flex gap-8">
            {/* <div className="mt-8 h-[400px] w-1/3"> */}
            {/*<h2 className="mb-2 text-3xl">Realms</h2>
              <RealmStakingTabs data={data} />*/}
            {/* <FloatAnimation /> */}
            {/* </div> */}
            <div className="w-full">
              <div className="mt-4 grid grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardDescription>Rewards</CardDescription>
                    <CardTitle className="flex items-center text-3xl">
                      49
                      <LordsIcon className="ml-2 h-7 w-7 fill-current" />
                    </CardTitle>
                  </CardHeader>
                  <CardFooter>per Realm each week</CardFooter>
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
                      {totalL1Realms ? totalL1Realms : "0"}
                    </CardTitle>
                  </CardHeader>
                  <CardFooter>
                    on L1{" "}
                    <Button
                      size={"xs"}
                      className="ml-2"
                      onClick={toggleStakingMigration}
                    >
                      Bridge Now
                    </Button>
                  </CardFooter>
                </Card>
                <Card className="col-span-full">
                  <CardHeader>
                    <CardTitle>Claims</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-4 gap-4">
                    <Card>
                      <CardHeader>
                        <CardDescription>Claimable Lords</CardDescription>
                        <CardTitle className="flex items-center text-4xl">
                          {balance &&
                            Number(formatEther(balance as bigint)).toFixed(0)}

                          <LordsIcon className="ml-3 h-7 w-7 fill-current" />
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Button
                          onClick={() => claimRewards()}
                          className="w-full"
                          disabled={isSubmitting}
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
                        <CardDescription>Claimed</CardDescription>
                        <CardTitle className="flex items-center text-4xl">
                          X <LordsIcon className="ml-3 h-7 w-7 fill-current" />
                        </CardTitle>
                      </CardHeader>
                    </Card>
                    <div className="col-span-full">
                      <ClaimsTable
                        data={[
                          {
                            start_date: new Date(
                              Date.now(),
                            ).toLocaleDateString(),
                            realms: 2,
                            lords_rewards: 180n,
                            claim: null,
                          },
                          {
                            start_date: new Date(
                              "2/3/2024",
                            ).toLocaleDateString(),
                            realms: 1,
                            lords_rewards: 60n,
                            claim: new Date(Date.now()).toLocaleDateString(),
                          },
                        ]}
                      />
                    </div>
                  </CardContent>
                </Card>
                <LegacyClaim />
              </div>
            </div>
          </div>
          <div className="mt-24 w-full">
            <div className="w-full">
              <span className="mb-2 flex w-fit items-center pb-4 font-sans text-3xl">
                <LordsIcon className="mx-auto mr-2 h-7 w-7 fill-bright-yellow" />
                veLords
              </span>
              <VeLords />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
