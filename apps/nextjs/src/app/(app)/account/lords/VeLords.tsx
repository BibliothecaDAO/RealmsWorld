"use client";

import { useMemo, useState } from "react";
import { TokenInput } from "@/app/_components/TokenInput";
import { TokenBalance } from "@/app/(app)/bridge/TokenBalance";
import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import type { Address } from "@starknet-react/core";
import { useAccount, useBalance, useReadContract } from "@starknet-react/core";
import { formatEther, parseEther } from "viem";
import { VeLords as VeLordsABI } from "@/abi/L2/VeLords";
import LordsIcon from "@/icons/lords.svg";

import { LORDS, StakingAddresses } from "@realms-world/constants";
import { Button } from "@realms-world/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@realms-world/ui/components/ui/card";
import { Input } from "@realms-world/ui/components/ui/input";
import { Label } from "@realms-world/ui/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@realms-world/ui/components/ui/tabs";
import { Slider } from "@realms-world/ui/components/ui/slider";
import { Badge } from "@realms-world/ui/components/ui/badge";

import { useVeLords } from "@/hooks/staking/useVeLords";
import type { BlockNumber } from "starknet";
import { BlockTag } from "starknet";
import { VeLordsRewardsChart } from './VeLordsRewardsChart'
import { api } from "@/trpc/react";
import { formatDistanceToNow } from 'date-fns';
import {
  differenceInSeconds,
  getUnixTime,
  fromUnixTime
} from 'date-fns';
import { motion } from "framer-motion";

const WEEK_IN_SECONDS = 7 * 24 * 60 * 60; // 1 week in seconds
const YEAR_IN_SECONDS = 365 * 24 * 60 * 60; // 1 year in seconds

export function toTime(time: number | string | undefined) {
  return Number(time ?? 0);
}

export function getTimeUntil(time?: number): number {
  if (!time) return 0;
  const duration = differenceInSeconds(fromUnixTime(time), new Date());
  return Math.max(duration, 0);
}

export function toWeeks(time?: number): number {
  return Math.floor(toTime(time) / WEEK_IN_SECONDS);
}

export function roundToWeek(time: number) {
  return Math.floor(toTime(time) / WEEK_IN_SECONDS) * WEEK_IN_SECONDS;
}

export const MAX_LOCK = roundToWeek(4 * YEAR_IN_SECONDS); // 4 years from now

function getVotingPower(lockAmount: bigint, unlockTime: number): number {
  const duration = roundToWeek(unlockTime) - Math.floor(new Date().getTime() / 1000);
  if (duration <= 0) {
    return 0;
  }
  if (duration >= MAX_LOCK) {
    return Number(formatEther(lockAmount));
  }
  const result = (Number(formatEther(lockAmount)) / (MAX_LOCK)) * duration;
  return result;
}

interface LockInfo {
  amount: bigint;
  end: number;
}

const MAX_LOCK_DURATION = 4 * 365 * 24 * 60 * 60; // 4 years in seconds
const SCALE = 10000n;
const MAX_PENALTY_RATIO = 7500n; // 50%

function calculatePenalty(lockInfo: LockInfo): bigint {
  if (lockInfo.amount === 0n) return 0n;

  const currentTime = Math.floor(Date.now() / 1000);
  if (lockInfo.end > currentTime) {
    const timeLeft = BigInt(Math.min(lockInfo.end - currentTime, MAX_LOCK_DURATION));
    const penaltyRatio = BigInt(Math.min(
      Number((timeLeft * SCALE) / BigInt(MAX_LOCK_DURATION)),
      Number(MAX_PENALTY_RATIO)
    ));
    return (lockInfo.amount * penaltyRatio) / SCALE;
  }
  return 0n;
}

function formatLockEndTime(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return `${date.toLocaleDateString()} (${formatDistanceToNow(date, { addSuffix: true })})`;
}

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

  const { data: veLordsBurns } = api.veLordsBurns.sumByWeek.useQuery();

  const [amount, setAmount] = useState<string>("");
  const [lockWeeks, setLockWeeks] = useState<number>(0);
  const maxLockWeeks = 4 * 52; // 4 years in weeks

  const unlockTime = useMemo(() => {
    const currentTime = getUnixTime(new Date());
    const additionalLockTime = lockWeeks * WEEK_IN_SECONDS;
    if (ownerLordsLock?.end_time) {
      return Math.max(Number(ownerLordsLock.end_time), currentTime) + additionalLockTime;
    } else {
      return currentTime + additionalLockTime;
    }
  }, [ownerLordsLock?.end_time, lockWeeks]);

  const timeUntilUnlock = ownerLordsLock?.end_time ? getTimeUntil(Number(ownerLordsLock?.end_time)) : undefined;
  const weeksToUnlock = toWeeks(timeUntilUnlock);

  const votingPower = useMemo(() => {
    const currentLockAmount = ownerLordsLock?.amount ? BigInt(ownerLordsLock.amount) : 0n;
    const additionalAmount = amount ? parseEther(amount) : 0n;
    return getVotingPower(currentLockAmount + additionalAmount, unlockTime);
  }, [ownerLordsLock?.amount, amount, unlockTime]);

  const penalty = useMemo(() => {
    if (ownerLordsLock) {
      const lockInfo: LockInfo = {
        amount: BigInt(ownerLordsLock.amount),
        end: Number(ownerLordsLock.end_time),
      };
      return calculatePenalty(lockInfo);
    }
    return 0n;
  }, [ownerLordsLock]);

  const { claim, manageLock, withdraw } = useVeLords()

  const newLockEndTime = useMemo(() => {
    const currentTime = getUnixTime(new Date());
    const additionalLockTime = lockWeeks * WEEK_IN_SECONDS;
    if (ownerLordsLock?.end_time) {
      return Math.max(Number(ownerLordsLock.end_time), currentTime) + additionalLockTime;
    } else {
      return currentTime + additionalLockTime;
    }
  }, [ownerLordsLock?.end_time, lockWeeks]);

  const handleManageLock = async () => {
    if (amount || lockWeeks) {
      await manageLock(parseEther(amount), newLockEndTime);
      setAmount("");
      setLockWeeks(0);
    }
  };

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
        </CardHeader>
        <CardFooter>
          <CardDescription>Your share of Pool</CardDescription>
        </CardFooter>
      </Card>
      {/*<Card>
        <CardHeader>
          <CardTitle className="flex items-center">X.XX%</CardTitle>
        </CardHeader>
        <CardFooter>
          <CardDescription>veLords max vAPR</CardDescription>
        </CardFooter>
      </Card>*/}
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
                <div className="prose text-primary">            <p>Lock your Lords for veLords and:</p>
                  <ul className="ml-5 list-disc">
                    <li>

                      Direct Lords emissions from the DAO to scale successful
                      games
                    </li>
                    <li>Be rewarded with Lords (dependant on lock time)</li>
                  </ul>

                  <p>This is phase one of rolling releases of the lordship protocol. This initial release focuses on funneling game fees.</p>

                  <p>The following releases will include:</p>

                  <ul className="ml-5 list-disc">
                    <li>
                      LP fee capture within the system </li>
                    <li>
                      Game incentives </li>
                    <li>
                      LORDS distribution mechanism </li></ul></div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Lords Distributions</CardTitle>
              </CardHeader>
              <VeLordsRewardsChart totalSupply={totalSupply && Number(formatEther(totalSupply))} data={veLordsBurns} />
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Lords ⇆ veLords</CardTitle>
                <CardDescription>
                  Lock your Lords in return for veLords - entitling to a share of Lords fees from ecosystem games and marketplaces, and participate in future liquidity provision. Claimable at weekly epochs.

                  Note: there is a maximum penalty of 75% for early withdrawal (if withdrawn immediately after locking for 4 years)
                </CardDescription>
              </CardHeader>
              <CardContent>
                {ownerLordsLock?.amount ? (<div className="mb-4">
                  <p className="mb-2">Your Lock:</p>
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Badge className="py-3 px-4 text-lg font-medium bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors duration-200">
                      <LordsIcon className="w-6 h-6 mr-3" />
                      <span className="mr-2">{Number(formatEther(ownerLordsLock.amount)).toFixed(2)} LORDS</span>
                      <span className="text-sm opacity-80">
                        until {ownerLordsLock?.end_time && formatLockEndTime(Number(ownerLordsLock.end_time))}
                      </span>
                    </Badge>
                  </motion.div></div>
                ) : null}
                <div className="grid grid-cols-5 gap-6">
                  <div className="col-span-2">
                    <Label>{ownerLordsLock?.amount ? "Add " : null}Lords</Label>
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
                  <div className="col-span-3">
                    <Label className="mb-2">{ownerLordsLock?.amount ? "Extend " : null}Lock Period (weeks)</Label>
                    <div className="flex space-x-2">
                      <Slider
                        min={0}
                        max={maxLockWeeks - weeksToUnlock}
                        step={1}
                        value={[lockWeeks]}
                        onValueChange={(value) => setLockWeeks(value[0] ?? 0)}
                      />
                      <Input
                        className="h-14 w-24 p-4 text-xl"
                        value={lockWeeks}
                        onChange={(event) => {
                          const value = parseInt(event.target.value);
                          if (!isNaN(value) && value >= 0 && value <= maxLockWeeks) {
                            setLockWeeks(value);
                          }
                        }}
                      />
                    </div>
                    {lockWeeks > 0 && (
                      <p className="mt-2 text-sm text-muted">
                        New lock end: <span className="text-muted-foreground">{formatLockEndTime(newLockEndTime)}</span>
                      </p>
                    )}
                  </div>
                  <div className="col-span-2">
                    <Label>Total veLords</Label>
                    <Input
                      disabled
                      className="h-14 p-4 text-xl"
                      value={votingPower}
                    ></Input>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-x-4">
                <Button onClick={handleManageLock} disabled={!amount && !lockWeeks} className="w-full">{ownerLordsLock?.amount ? "Update Lock" : "Stake Lords"}</Button>
              </CardFooter>
            </Card>
            {ownerLordsLock?.amount ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    Early Withdrawal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Pay a penalty determined by lock duration to withdraw your locked Lords early</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Your Locked Lords</Label>
                      <TokenInput
                        disabled
                        amount={formatEther(ownerLordsLock.amount)}
                        icon={<LordsIcon />}
                      />
                    </div>
                    <div>
                      <Label>Current lock time (weeks)</Label>
                      <Input className="h-14" value={weeksToUnlock} disabled />
                    </div>
                    <div>
                      <Label>After Withdrawal Penalty</Label>
                      <TokenInput
                        disabled
                        amount={formatEther(ownerLordsLock.amount - penalty)}
                        icon={<LordsIcon />}
                      />
                      <span className="text-muted text-sm">Penalty: {(Number(penalty) / Number(ownerLordsLock.amount) * 100).toFixed(2)}%</span>
                    </div>

                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => withdraw()} className="w-full">Withdraw Lords</Button>
                </CardFooter>
              </Card>
            ) : null}
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
                <p>Lords fees distributed to the DAO from various games are accumulated in your balance, and are claimable at the end of each epoch (weekly)</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Claim Lords</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  You have <span className="font-bold text-3xl">0</span> Lords to claim
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
