"use client";

import RealmsABI from "@/abi/L2/Realms.json";
import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import { useL2LordsRewards } from "@/hooks/staking/useL2LordsRewards";
//import { useLordship } from "@/hooks/staking/useLordship";
import { useStaking } from "@/hooks/staking/useStaking";
import LordsIcon from "@/icons/lords.svg";
import { useUIStore } from "@/providers/UIStoreProvider";
import {
  useContractRead,
  useAccount as useL2Account,
} from "@starknet-react/core";
import { formatEther } from "viem";
import { useAccount } from "wagmi";

import { Collections, getCollectionAddresses } from "@realms-world/constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
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
import { VeLords } from "./VeLords";

export const Overview = () => {
  const { address: l1Address } = useAccount();
  const { address: l2Address } = useL2Account();

  const { balance, writeAsync: claimRewards } = useL2LordsRewards();

  const {
    data,
    galleonLordsAvailable,
    carrackLordsAvailable,
    totalClaimable,
    poolV1Balance,
    poolV2Balance,
  } = useStaking();
  //const delegateData = useLordship(l1Address);
  const { toggleStakingMigration } = useUIStore((state: any) => state);

  const totalL1Realms =
    +data?.wallet?.realmsHeld +
    +data?.wallet?.bridgedRealmsHeld +
    +data?.wallet?.bridgedV2RealmsHeld;

  const { data: realmsBalance } = useContractRead({
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
    <div className="w-full px-4">
      {l1Address && (
        <>
          <div className="flex gap-8">
            <div className="mt-8 h-[400px] w-1/3">
              {/*<h2 className="mb-2 text-3xl">Realms</h2>
              <RealmStakingTabs data={data} />*/}
              <FloatAnimation />
            </div>
            <div className="w-full">
              <span className="mb-2 flex w-fit items-center pb-4 font-sans text-3xl">
                <LordsIcon className="mx-auto mr-2 h-7 w-7 fill-bright-yellow" />
                Realms LORDS Rewards
              </span>

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
                    <CardTitle className="text-3xl">{totalL1Realms}</CardTitle>
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
                    <Accordion className="col-span-full" type="multiple">
                      <AccordionItem value={"lords"} className="mb-2">
                        <AccordionTrigger className="flex w-full border bg-muted-foreground/40 p-4 text-xl">
                          <div className="flex justify-start">
                            Legacy (L1) Claimable Lords:{" "}
                            <span className="ml-8 flex items-center">
                              <LordsIcon className="mr-3 h-5 w-5 fill-primary" />
                              {totalClaimable.toString()}
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="border border-y-0 bg-background p-4">
                          <div className="grid text-lg">
                            <div className="font-sans text-xl font-semibold">
                              Galleon
                            </div>
                            <dl className="grid gap-1">
                              <div className="flex items-center justify-between">
                                <dt className="text-muted-foreground">
                                  Epoch 0-10:
                                </dt>
                                <dd>
                                  {galleonLordsAvailable?.toLocaleString()}{" "}
                                  <Button className="ml-3" size={"xs"}>
                                    Claim
                                  </Button>
                                </dd>
                              </div>
                              <div className="flex items-center justify-between">
                                <dt className="text-muted-foreground">
                                  Epoch 11-35:
                                </dt>
                                <dd>{poolV1Balance?.toLocaleString() ?? 0}</dd>
                              </div>
                              <div className="flex items-center justify-between">
                                <dt className="text-muted-foreground">
                                  Epoch 36-109:
                                </dt>
                                <dd>{poolV2Balance.toLocaleString()}</dd>
                              </div>
                            </dl>
                            <div className="mt-4 font-sans text-xl font-semibold">
                              Carrack
                            </div>
                            <dl className="grid gap-1">
                              <div className="flex items-center justify-between">
                                <dt className="text-muted-foreground">
                                  Epoch 11-109:
                                </dt>
                                <dd>
                                  {carrackLordsAvailable?.toLocaleString() ?? 0}
                                  {carrackLordsAvailable && (
                                    <Button className="ml-3" size={"sm"}>
                                      Claim
                                    </Button>
                                  )}
                                </dd>
                              </div>
                            </dl>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    <Card>
                      <CardHeader>
                        <CardDescription>Claimable Lords</CardDescription>
                        <CardTitle className="flex items-center text-4xl">
                          {balance && formatEther(BigInt(balance))}
                          <LordsIcon className="ml-3 h-7 w-7 fill-current" />
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Button
                          onClick={() => claimRewards()}
                          className="w-full"
                        >
                          Claim
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
