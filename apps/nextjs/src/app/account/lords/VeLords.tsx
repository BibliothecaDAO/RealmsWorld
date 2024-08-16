"use client";

import { useEffect, useState } from "react";
import { TokenInput } from "@/app/_components/TokenInput";
import { TokenBalance } from "@/app/bridge/TokenBalance";
import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import LordsIcon from "@/icons/lords.svg";
import type { Address } from "@starknet-react/core";
import { useAccount, useBalance, useReadContract } from "@starknet-react/core";
import { formatEther, parseEther } from "viem";
import { VeLords as VeLordsABI } from "@/abi/L2/VeLords";

import { LORDS, StakingAddresses } from "@realms-world/constants";
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
import { useVeLords } from "@/hooks/staking/useVeLords";
import type { BlockNumber } from "starknet";
import { BlockTag } from "starknet";

export const VeLords = () => {
  const veLordsAddress = StakingAddresses.velords[SUPPORTED_L2_CHAIN_ID];
  const { address } = useAccount();
  const { isLoading, data } = useBalance({
    address,
    token: LORDS[SUPPORTED_L2_CHAIN_ID]?.address as Address,
    watch: true,
  });
  const { isLoading: veLordsIsLoading, data: veLordsData } = useBalance({
    address,
    token: veLordsAddress as Address,
    watch: true,
    blockIdentifier: BlockTag.PENDING as BlockNumber,

  });
  const { data: totalSupply, isFetching, error } = useReadContract({
    address: veLordsAddress as Address,
    abi: VeLordsABI,
    functionName: "total_supply",
    //enabled: !!l2Address,
    watch: true,
    args: []
    // args: l2Address ? [l2Address] : undefined,
    //blockIdentifier: BlockTag.PENDING as BlockNumber,
  });
  const { data: ownerLordsLock } = useReadContract({
    address: veLordsAddress as Address,
    abi: VeLordsABI,
    functionName: "get_lock_for",
    //enabled: !!l2Address,
    watch: true,
    args: address ? [address] : undefined,
    // args: l2Address ? [l2Address] : undefined,
    blockIdentifier: BlockTag.PENDING as BlockNumber,
  });


  const [amount, setAmount] = useState<string>("");
  const [lockWeeks, setLockWeeks] = useState<string>("1");
  const { claim, manageLock, withdraw } = useVeLords()
  useEffect(() => {
    console.log((Date.now() / 1000) + parseInt(lockWeeks) * 7 * 24 * 60 * 60)
  }, [lockWeeks])
  return (
    <div className="mt-4 grid grid-cols-3 gap-4 md:grid-cols-5">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            {ownerLordsLock?.amount && Number(formatEther(ownerLordsLock?.amount)).toFixed(4)}
            <LordsIcon className="ml-2 h-7 w-7 fill-current" />
          </CardTitle>
        </CardHeader>
        <CardFooter>
          <CardDescription>Your Locked LORDS</CardDescription>
        </CardFooter>
      </Card>
      <Card>
        {error?.message}
        <CardHeader>
          <CardTitle className="flex items-center">
            {Number(veLordsData?.formatted).toFixed(4)}
            <LordsIcon className="ml-2 h-7 w-7 fill-current" />
          </CardTitle>
        </CardHeader>
        <CardFooter>
          <CardDescription>veLORDS Balance</CardDescription>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            {totalSupply && veLordsData && ((Number(veLordsData.value) / Number(totalSupply)) * 100).toFixed(2)}%
          </CardTitle>
          <span className="text-muteds text-sm">Total: {totalSupply && Number(formatEther(totalSupply)).toFixed(2)} veLords</span>
        </CardHeader>
        <CardFooter>
          <CardDescription>Your share of Pool</CardDescription>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">X.XX%</CardTitle>
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
                    <Label>{ownerLordsLock?.amount && "Add "}Lords <span className="text-muted text-sm">{ownerLordsLock?.amount && formatEther(ownerLordsLock.amount)} locked</span></Label>
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
                    <div className="flex justify-end text-sm">
                      Locked until: {ownerLordsLock?.end_time && new Date(Number(ownerLordsLock.end_time) * 1000).toLocaleString()}</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-x-4">
                <Button onClick={() => amount && manageLock(parseEther(amount), Math.round((Date.now() / 1000) + parseInt(lockWeeks) * 7 * 24 * 60 * 60))} className="w-full">Stake Lords</Button>
                <Button onClick={() => withdraw()} className="w-full">Withdraw Lords</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value={"rewards"}>
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  Claim your Lords Rewards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Your Lords Earnt</p>

              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Claim Lords</CardTitle>
                <CardDescription>
                  Lock
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  These are your rewards
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => claim()} className="w-full">Claim Lords</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
