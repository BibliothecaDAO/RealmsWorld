"use client";

import Image from "next/image";
import LordsIcon from "@/icons/lords.svg";
import { api } from "@/trpc/react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@realms-world/ui/components/ui/card";
import { formatNumber } from "@realms-world/utils";

import { VeLordsRewardsChart } from "../(app)/account/lords/velords/VeLordsRewardsChart";

interface VeLordsBannerProps {
  totalSupply: number;
}

export function VeLordsBanner() {
  const [data] = api.veLordsBurns.all.useSuspenseQuery({});
  const [totalSupplyData] =
    api.veLordsBurns.totalLordsSupply.useSuspenseQuery();
  console.log(data);
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

  const last90DaysRewards = data
    .filter((burn) => new Date(burn.epoch) >= ninetyDaysAgo)
    .reduce((sum, burn) => sum + Number(burn.amount), 0);

  return (
    <div className="relative my-12 w-full overflow-hidden rounded-lg sm:p-20">
      <div className="absolute inset-0 items-center justify-center sm:flex">
        <video autoPlay className={"sm:w-1/2"} loop muted>
          <source src={"/lords-coin-animation.webm"} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hidden sm:block sm:w-1/2">
          <VeLordsRewardsChart
            data={data}
            totalSupply={totalSupplyData?.new_supply}
          />
        </div>
      </div>
      <div className="relative z-10 flex h-full flex-col items-center justify-center p-6 sm:my-40">
        <h2 className="mb-8 text-center text-4xl font-bold md:text-5xl">
          veLords - Staking for Ecosystem Rewards
        </h2>

        <div className="grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-primary/60">APY</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{formatNumber(12.34)}%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-primary/60">
                Lords Locked
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="flex text-2xl font-bold">
                <LordsIcon className="mr-3 w-5" />
                {formatNumber(Number(totalSupplyData?.new_supply ?? 0))}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-primary/60">
                90d Lords Rewards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="flex text-2xl font-bold">
                <LordsIcon className="mr-3 w-5" />
                {formatNumber(last90DaysRewards)}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
