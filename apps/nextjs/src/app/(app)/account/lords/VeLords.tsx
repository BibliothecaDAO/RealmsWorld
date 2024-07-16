"use client";

import { useState } from "react";
import { TokenInput } from "@/app/_components/TokenInput";
import { TokenBalance } from "@/app/(app)/bridge/TokenBalance";
import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import LordsIcon from "@/icons/lords.svg";
import { useAccount, useBalance } from "@starknet-react/core";
import { formatEther } from "viem";

import { LORDS } from "@realms-world/constants";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@realms-world/ui";

export const VeLords = () => {
  const { address } = useAccount();
  const { isLoading, data } = useBalance({
    address,
    token: LORDS[SUPPORTED_L2_CHAIN_ID]?.address,
    watch: true,
  });
  const [amount, setAmount] = useState<string>();
  const [lockWeeks, setLockWeeks] = useState<string>("1");

  return (
    <div className="mt-4 grid grid-cols-3 gap-4 md:grid-cols-5">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            49
            <LordsIcon className="ml-2 h-7 w-7 fill-current" />
          </CardTitle>
        </CardHeader>
        <CardFooter>
          <CardDescription>Your Locked LORDS</CardDescription>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            19999999
            <LordsIcon className="ml-2 h-7 w-7 fill-current" />
          </CardTitle>
        </CardHeader>
        <CardFooter>
          <CardDescription>Total Locked LORDS</CardDescription>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">69.42%</CardTitle>
        </CardHeader>
        <CardFooter>
          <CardDescription>veLords max vAPR</CardDescription>
        </CardFooter>
      </Card>
      <Tabs defaultValue={"staking"} className="col-span-full">
        <TabsList>
          <TabsTrigger className="font-sans text-xl" value="staking">
            Staking
          </TabsTrigger>
          <TabsTrigger className="font-sans text-xl" value="rewards">
            Rewards
          </TabsTrigger>
        </TabsList>

        <TabsContent value={"staking"}>
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  Lords, expand the ecosystem
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Lock your Lords for veLords and:</p>
                <ul className="ml-5 list-disc">
                  <li>
                    Direct Lords emissions from the DAO to scale successful
                    games
                  </li>
                  <li>Be rewarded with dLords (dependant on lock time)</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Earn veLords</CardTitle>
                <CardDescription>
                  Lock your Lords to veLords for a period to direct Lords to
                  Game Vaults and
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <Label>Lords</Label>
                    <TokenInput
                      onChange={(event) => {
                        setAmount(event.target.value);
                      }}
                      amount={amount}
                      icon={<LordsIcon />}
                    ></TokenInput>
                    <TokenBalance
                      onClick={() =>
                        setAmount(formatEther(BigInt(data?.value ?? 0n)))
                      }
                      balance={data?.value ?? 0}
                      symbol=""
                      isLoading={isLoading}
                    />
                  </div>
                  <div>
                    <Label>Lock Period (weeks)</Label>
                    <Input
                      className="h-14 p-4 text-xl"
                      value={lockWeeks}
                      onChange={(event) => setLockWeeks(event.target.value)}
                    ></Input>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Stake Lords</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
