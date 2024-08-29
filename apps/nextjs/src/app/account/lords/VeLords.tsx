"use client";

import { useMemo, useState } from "react";
import { TokenInput } from "@/app/_components/TokenInput";
import { TokenBalance } from "@/app/bridge/TokenBalance";
import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import type { Address } from "@starknet-react/core";
import { useAccount, useBalance, useReadContract } from "@starknet-react/core";
import { formatEther, parseEther } from "viem";
import { VeLords as VeLordsABI } from "@/abi/L2/VeLords";
import LordsIcon from "@/icons/lords.svg";

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
import { VeLordsRewardsChart } from './VeLordsRewardsChart'
import { api } from "@/trpc/react";

const WEEK = 7 * 24 * 60 * 60; // 1 week in seconds
const YEAR = 365 * 24 * 60 * 60; // 1 year in seconds
export function toTime(time: number | string | undefined) {
  return Number(time ?? 0);
}
function toSeconds(timestamp: number): number {
  return Math.floor(timestamp / 1000);
}
export function getTimeUntil(time?: number): number {
  const duration = toTime(time) - Date.now();
  return duration < 0 ? 0 : duration;
}
export function toWeeks(time?: number): number {
  return Math.floor(toTime(time) / WEEK);
}
export function roundToWeek(time) {
  return Math.floor(toTime(time) / WEEK) * WEEK;
}

export const MAX_LOCK = roundToWeek(YEAR * 4);

function getVotingPower(lockAmount: bigint, unlockTime: number): number {
  const duration = roundToWeek(unlockTime) - toSeconds(Date.now());
  if (duration <= 0) {
    return 0;
  }
  if (duration >= MAX_LOCK) {
    return Number(lockAmount);
  }
  const result = (Number(lockAmount) / (MAX_LOCK)) * (duration);
  return result
}

interface LockInfo {
  amount: bigint;
  end: number;
}

const MAX_LOCK_DURATION = 4 * 365 * 24 * 60 * 60; // 4 years in seconds
const SCALE = 10000n;
const MAX_PENALTY_RATIO = 5000n; // 50%

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
  const [lockWeeks, setLockWeeks] = useState<string>("");
  const unlockTime = useMemo(() => {
    const currentTime = Date.now() / 1000;
    const additionalLockTime = parseInt(lockWeeks || '0') * 7 * 24 * 60 * 60;
    if (ownerLordsLock?.end_time) {
      return Math.max(Number(ownerLordsLock.end_time), currentTime) + additionalLockTime;
    } else {
      return currentTime + additionalLockTime;
    }
  }, [ownerLordsLock?.end_time, lockWeeks]);

  const timeUntilUnlock = ownerLordsLock?.end_time ? getTimeUntil(ownerLordsLock?.end_time) : undefined;
  const weeksToUnlock = toWeeks(timeUntilUnlock);

  const votingPower = useMemo(() => {
    return getVotingPower((ownerLordsLock?.amount ? BigInt(formatEther(ownerLordsLock?.amount)) : 0n) + BigInt(amount), unlockTime)

  }, [ownerLordsLock?.end_time, amount, unlockTime]);

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
                <CardTitle>Lords Distributions</CardTitle>
              </CardHeader>
              <VeLordsRewardsChart totalSupply={totalSupply && Number(formatEther(totalSupply))} data={veLordsBurns} />
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
                {ownerLordsLock?.amount ? (<div className="w-full mb-4">
                  <p>Your Lock:</p>
                  <span className="flex"><LordsIcon className="w-4 mr-2" />{formatEther(ownerLordsLock.amount)} until {ownerLordsLock?.end_time && new Date(Number(ownerLordsLock.end_time) * 1000).toLocaleString()}</span></div>
                ) : null}
                <div className="grid grid-cols-2 gap-4">
                  <div>
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
                  <div>
                    <Label>{ownerLordsLock?.amount ? "Extend " : null}Lock Period (weeks)</Label>
                    <Input
                      className="h-14 p-4 text-xl"
                      value={lockWeeks}
                      onChange={(event) => setLockWeeks(event.target.value)}
                    ></Input>
                  </div>
                  <div>
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
                <Button onClick={() => amount && manageLock(parseEther(amount), Math.round((Date.now() / 1000) + parseInt(lockWeeks) * 7 * 24 * 60 * 60))} className="w-full">{ownerLordsLock?.amount ? "Update Lock" : "Stake Lords"}</Button>
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
                  <div className="grid grid-cols-2">
                    <div>
                      <Label>Your veLords</Label>
                      <TokenInput
                        disabled
                        amount={formatEther(ownerLordsLock.amount)}
                        icon={<LordsIcon />}
                      />
                    </div>
                    <div>
                      <Label>Current lock time (weeks)</Label>
                      <Input value={weeksToUnlock} disabled />
                    </div>
                    <div>
                      <Label>Penalty</Label>
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
