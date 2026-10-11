import type { Address } from "@starknet-start/react";
import type { Call } from "starknet";
import { useMemo, useState } from "react";
import { L2_C1ERC20 } from "@/abi/L2/C1ERC20";
import { VeLords } from "@/abi/L2/VeLords";
import LordsIcon from "@/components/icons/lords.svg?react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/hooks/use-toast";
import { parseOptionalStakeAmount } from "@/lib/velords-utils";
import { getTimeUntil, toWeeks, WEEK_IN_SECONDS } from "@/utils/time";
import { formatNumber, SUPPORTED_L2_CHAIN_ID } from "@/utils/utils";
import { useAccount, useContract } from "@starknet-start/react";
import { formatDistanceToNow, getUnixTime } from "date-fns";
import { Check, Plus, Wallet } from "lucide-react";
import { formatEther } from "viem";

import { LORDS, StakingAddresses } from "@realms-world/constants";

function formatLockEndTime(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return `${date.toLocaleDateString()} (${formatDistanceToNow(date, { addSuffix: true })})`;
}

export function StakeDialog({
  ownerLordsLock,
  lordsBalance,
  manageLordsLock,
}: {
  ownerLordsLock:
    | {
        amount: number | bigint;
        end_time: number | bigint;
      }
    | undefined;
  lordsBalance?: number | bigint;
  manageLordsLock: (args?: Call[]) => Promise<{ transaction_hash: string }>;
}) {
  const { address } = useAccount();
  const [open, setOpen] = useState(false);
  const [stakeAmount, setStakeAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const veLordsAddress = StakingAddresses.velords[SUPPORTED_L2_CHAIN_ID];
  const { contract: veLords } = useContract({
    abi: VeLords,
    address: veLordsAddress as Address,
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!/^\d*\.?\d*$/.test(value)) return;
    setStakeAmount(value);
  };
  const { contract: lordsContract } = useContract({
    abi: L2_C1ERC20,
    address: LORDS[SUPPORTED_L2_CHAIN_ID]?.address as `0x${string}`,
  });

  const [lockWeeks, setLockWeeks] = useState<number>(0);
  const maxLockWeeks = 4 * 52; // 4 years in weeks

  const timeUntilUnlock = ownerLordsLock?.end_time
    ? getTimeUntil(Number(ownerLordsLock.end_time))
    : undefined;
  const weeksToUnlock = toWeeks(timeUntilUnlock);

  // Check if the current lock has expired
  const isLockExpired = useMemo(() => {
    if (!ownerLordsLock?.end_time) return false;
    const currentTime = getUnixTime(new Date());
    return Number(ownerLordsLock.end_time) < currentTime;
  }, [ownerLordsLock?.end_time]);
  const remainingLockWeeks = Math.max(maxLockWeeks - weeksToUnlock, 0);
  const canExtendLock = isLockExpired || remainingLockWeeks > 0;
  const lockDurationSliderMax = isLockExpired
    ? maxLockWeeks
    : Math.max(remainingLockWeeks, 1);

  const newLockEndTime = useMemo(() => {
    const currentTime = getUnixTime(new Date());
    const additionalLockTime = lockWeeks * WEEK_IN_SECONDS;
    if (ownerLordsLock?.end_time && !isLockExpired) {
      // For active locks, extend from the current end time or current time, whichever is later
      return (
        Math.max(Number(ownerLordsLock.end_time), currentTime) +
        additionalLockTime
      );
    } else {
      // For expired locks or new locks, start from current time
      return currentTime + additionalLockTime;
    }
  }, [ownerLordsLock?.end_time, lockWeeks, isLockExpired]);

  const manageLock = async () => {
    if (!address || !veLords) return;

    try {
      const parsedAmount = parseOptionalStakeAmount(stakeAmount);
      const hasStakeInput = stakeAmount.trim().length > 0;
      if (hasStakeInput && !parsedAmount && lockWeeks === 0) {
        toast({
          variant: "destructive",
          description: "Enter a valid LORDS amount.",
        });
        return;
      }
      if (!parsedAmount && lockWeeks <= 0) return;

      const calls: Call[] = [];
      if (parsedAmount && lordsContract) {
        calls.push(
          lordsContract.populate("approve", [
            veLordsAddress as `0x${string}`,
            parsedAmount,
          ]),
        );
      }
      calls.push(
        veLords.populate("manage_lock", [
          parsedAmount ?? 0n,
          newLockEndTime,
          address,
        ]),
      );

      setIsSubmitting(true);
      const hash = await manageLordsLock(calls);
      toast({
        description: (
          <div className="flex items-center gap-2">
            <Check /> Lords Lock Update successful {hash.transaction_hash}
          </div>
        ),
      });
      setOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        description:
          error instanceof Error ? error.message : "Unable to update lock.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to set stakeAmount as a fraction of lordsBalance.
  const setStakeByFraction = (fraction: number) => {
    if (lordsBalance === undefined) return;
    let value: string;
    if (fraction === 1) {
      value = lordsBalance.toString();
    } else if (typeof lordsBalance === "bigint") {
      if (fraction === 0.5) {
        value = (lordsBalance / BigInt(2)).toString();
      } else if (fraction === 0.25) {
        value = (lordsBalance / BigInt(4)).toString();
      } else {
        value = (Number(lordsBalance) * fraction).toString();
      }
    } else {
      value = (Number(lordsBalance) * fraction).toString();
    }
    setStakeAmount(value);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>
          <Plus className="h-4 w-4" />
          {isLockExpired ? "Create New Lock" : "Stake"}
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent className="max-h-[90dvh] overflow-y-auto">
          <DialogTitle className="mb-4 text-xl font-bold">
            {isLockExpired ? "Create New $LORDS Lock" : "$LORDS Staking"}
          </DialogTitle>
          {isLockExpired && (
            <div className="bg-warning/10 border-warning mb-4 rounded-md border p-3">
              <p className="text-warning-foreground text-sm">
                Your previous lock has expired. You can create a new lock or
                withdraw your Lords.
              </p>
            </div>
          )}
          <div>
            <Label>Current Lock</Label>
            <div className="my-4 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Card className="flex-1">
                <CardHeader className="p-3">
                  <CardTitle className="text-sm">Locked Lords</CardTitle>
                </CardHeader>
                <CardContent>
                  {ownerLordsLock?.amount ? (
                    <div className="flex items-center gap-2">
                      <LordsIcon className="h-4 w-4" />{" "}
                      {formatNumber(
                        Number(formatEther(BigInt(ownerLordsLock.amount))),
                      )}
                    </div>
                  ) : (
                    "-"
                  )}
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="p-3">
                  <CardTitle className="text-sm">Unlock Date</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  {ownerLordsLock?.end_time
                    ? formatLockEndTime(Number(ownerLordsLock.end_time))
                    : "N/A"}
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="mb-3 flex flex-col">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Label className="flex-1">Stake Lords</Label>
                <div className="flex flex-wrap items-center justify-end gap-2">
                  <Button
                    onClick={() => setStakeByFraction(1)}
                    variant={"link"}
                    className="h-8 p-1"
                  >
                    <Wallet className="mr-1 w-4" />
                    {lordsBalance ? formatNumber(Number(lordsBalance)) : "0"}
                  </Button>
                  <Button
                    className="h-8 min-w-11 rounded px-2"
                    variant="outline"
                    size="sm"
                    onClick={() => setStakeByFraction(1)}
                  >
                    Max
                  </Button>
                  <Button
                    className="h-8 min-w-11 rounded px-2"
                    variant="outline"
                    size="sm"
                    onClick={() => setStakeByFraction(0.5)}
                  >
                    50%
                  </Button>
                  <Button
                    className="h-8 min-w-11 rounded px-2"
                    variant="outline"
                    size="sm"
                    onClick={() => setStakeByFraction(0.25)}
                  >
                    25%
                  </Button>
                </div>
              </div>
              <div className="mt-2 flex items-center border pl-4">
                <div className="flex items-center gap-2 uppercase">
                  <LordsIcon className="w-7" />
                  Lords
                </div>
                <Input
                  value={stakeAmount}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  className="h-12 border-0 px-4 py-3 text-right md:text-xl"
                />
              </div>
            </div>
            <Label>
              {isLockExpired
                ? "Lock Duration"
                : `Lock Duration (+${lockWeeks} weeks)`}
            </Label>
            <Slider
              className="my-2"
              min={0}
              max={lockDurationSliderMax}
              step={1}
              value={[lockWeeks]}
              onValueChange={(value) => setLockWeeks(value[0] ?? 0)}
              disabled={!canExtendLock}
            />
            {lockWeeks > 0 ? (
              <p className="text-muted text-sm">
                New lock end:{" "}
                <span className="text-muted-foreground">
                  {formatLockEndTime(newLockEndTime)}
                </span>
              </p>
            ) : (
              <div className="h-5"></div>
            )}
          </div>
          <DialogFooter>
            <Button
              disabled={isSubmitting || (!stakeAmount.trim() && !lockWeeks)}
              className="w-full"
              onClick={manageLock}
            >
              {isLockExpired ? "Create New Lock" : "Stake"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
