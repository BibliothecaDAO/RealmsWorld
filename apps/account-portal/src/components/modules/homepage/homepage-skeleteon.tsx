import BridgeIcon from "@/components/icons/bridge.svg?react";
import EthereumIcon from "@/components/icons/ethereum.svg?react";
import LordsIcon from "@/components/icons/lords.svg?react";
import StarknetIcon from "@/components/icons/starknet.svg?react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Gavel, Plus } from "lucide-react";

import { DelegateCardSkeleton } from "../governance/delegate-card-skeleton";

export function HomepageSkeleton() {
  return (
    <div className="space-y-6">
      {/* Assets Section */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Realms Card */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="">Realms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="bg-muted h-9 w-20 animate-pulse rounded" />
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <EthereumIcon className="h-4 w-4" />
                  Ethereum
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="bg-muted h-9 w-20 animate-pulse rounded" />
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <StarknetIcon className="h-4 w-4" />
                  Starknet
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2 pt-2">
            <Button variant="outline" size="sm" className="w-full" disabled>
              <BridgeIcon className="mr-2 h-4 w-4" />
              Bridge
            </Button>
            <Button variant="outline" size="sm" className="w-full" disabled>
              <Gavel className="mr-2 h-4 w-4" />
              Market
            </Button>
          </CardFooter>
        </Card>

        {/* Lords Card */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <LordsIcon className="h-6 w-6" />
              Lords
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="bg-muted h-9 w-20 animate-pulse rounded" />
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <EthereumIcon className="h-4 w-4" />
                  Ethereum
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="bg-muted h-9 w-20 animate-pulse rounded" />
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <StarknetIcon className="h-4 w-4" />
                  Starknet
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="bg-muted h-9 w-20 animate-pulse rounded" />
                <div className="text-muted-foreground text-sm">
                  Staked (veLords)
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Claims Section */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="">Available Claims</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <LordsIcon className="h-6 w-6" />
                    <div>
                      <div className="font-semibold">Realms Emissions</div>
                      <div className="text-muted-foreground text-sm">
                        Claim your realm rewards
                      </div>
                    </div>
                  </div>
                  <div className="bg-muted h-9 w-20 animate-pulse rounded" />
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <LordsIcon className="h-6 w-6" />
                    <div>
                      <div className="font-semibold">veLords Rewards</div>
                      <div className="text-muted-foreground text-sm">
                        Staking rewards available
                      </div>
                    </div>
                  </div>
                  <div className="bg-muted h-9 w-20 animate-pulse rounded" />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2 pt-0 sm:flex-row">
            <Button className="flex-1" variant="outline" disabled>
              Claim Realms
            </Button>
            <Button className="flex-1" variant="outline" disabled>
              Claim veLords
            </Button>
          </CardFooter>
        </Card>

        {/* Delegate Section */}
        <div className="space-y-4">
          <DelegateCardSkeleton />
        </div>
      </div>

      {/* Proposals Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-3 pb-4">
          <CardTitle className="">Recent Proposals</CardTitle>
          <Button variant="outline" size="sm" disabled>
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border-b pb-4 last:border-0">
                <div className="bg-muted h-6 w-3/4 animate-pulse rounded" />
                <div className="bg-muted mt-2 h-4 w-1/2 animate-pulse rounded" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Realms Grid */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-3 pb-4">
          <CardTitle className="">Your Realms</CardTitle>
          <Button variant="outline" size="sm" disabled>
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="bg-muted aspect-square animate-pulse rounded-lg border"
              />
            ))}
            <Card className="flex items-center justify-center">
              <div className="flex h-full w-full items-center justify-center p-6">
                <div className="text-center">
                  <Plus className="text-muted-foreground mx-auto h-8 w-8" />
                  <div className="text-muted-foreground mt-2 text-sm">
                    +5 more
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
