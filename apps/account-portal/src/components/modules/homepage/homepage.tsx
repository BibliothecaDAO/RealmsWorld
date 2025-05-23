import type { Address } from "@starknet-react/core";
import { Suspense } from "react";
import { VeLords } from "@/abi/L2/VeLords";
import BridgeIcon from "@/components/icons/bridge.svg?react";
import EthereumIcon from "@/components/icons/ethereum.svg?react";
import LordsIcon from "@/components/icons/lords.svg?react";
import StarknetIcon from "@/components/icons/starknet.svg?react";
import { DelegateCard } from "@/components/modules/governance/delegate-card";
import { DelegateCardSkeleton } from "@/components/modules/governance/delegate-card-skeleton";
import { RealmCard } from "@/components/modules/realms/realm-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCurrentDelegate } from "@/hooks/governance/use-current-delegate";
import { useL2RealmsClaims } from "@/hooks/use-l2-realms-claims";
import useVeLordsClaims from "@/hooks/use-velords-claims";
import { getDelegateByIDQueryOptions } from "@/lib/getDelegates";
import { getL1UsersRealmsQueryOptions } from "@/lib/getL1Realms";
import { getAccountTokensQueryOptions } from "@/lib/eternum/getPortfolioCollections";
import { getRealmsQueryOptions } from "@/lib/eternum/getRealms";
import {
  formatAddress,
  formatNumber,
  SUPPORTED_L1_CHAIN_ID,
  SUPPORTED_L2_CHAIN_ID,
} from "@/utils/utils";
import {
  useBalance,
  useReadContract,
  useSendTransaction,
} from "@starknet-react/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Gavel, Plus } from "lucide-react";
import { num } from "starknet";
import { formatEther } from "viem";
import { useAccount as useL1Account, useBalance as useL1Balance } from "wagmi";

import {
  CollectionAddresses,
  LORDS,
  SnapshotSpaceAddresses,
  StakingAddresses,
} from "@realms-world/constants";

import { ProposalList } from "../governance/proposal-list";

export function Homepage({ address }: { address: `0x${string}` }) {
  //const { address } = useAccount();
  const { address: l1Address } = useL1Account();
  /*const l2RealmsQuery = useSuspenseQuery(
    getRealmsQueryOptions({
      address,
      collectionAddress: CollectionAddresses.realms[
        SUPPORTED_L2_CHAIN_ID
      ] as string,
    }),
  );
  const l2Realms = l2RealmsQuery.data;*/

  const l1UsersRealmsQuery = useSuspenseQuery(
    getL1UsersRealmsQueryOptions({
      address: l1Address ?? "",
    }),
  );
  const l1UsersRealms = l1UsersRealmsQuery.data;

  const accountTokensQuery = useSuspenseQuery(
    getAccountTokensQueryOptions({
      address: address,
    }),
  );
  const accountTokens = accountTokensQuery.data;

  const { data } = useCurrentDelegate();
  const currentDelegateQuery = useSuspenseQuery(
    getDelegateByIDQueryOptions({
      address:
        data && BigInt(data) != 0n
          ? formatAddress(num.toHex(BigInt(data)))
          : undefined,
    }),
  );
  const currentDelegate = currentDelegateQuery.data;

  const { data: starknetBalance } = useBalance({
    address,
    token: LORDS[SUPPORTED_L2_CHAIN_ID]?.address as Address,
    watch: true,
  });
  const { data: l1Balance } = useL1Balance({
    address: l1Address,
    token: LORDS[SUPPORTED_L1_CHAIN_ID]?.address as Address,
  });

  const { lordsClaimable, claimCall } = useVeLordsClaims();

  const { balance: l2RealmsBalance, calls: l2RealmsClaimCall } =
    useL2RealmsClaims();

  const { data: ownerLordsLock } = useReadContract({
    address: StakingAddresses.velords[SUPPORTED_L2_CHAIN_ID] as Address,
    abi: VeLords,
    functionName: "get_lock_for",
    watch: true,
    args: [address],
  });

  // Prepare the function to send the claim rewards transaction.
  const { sendAsync: claimAllRewards, isPending: claimIsSubmitting } =
    useSendTransaction({
      calls: [...(claimCall ?? []), ...l2RealmsClaimCall],
    });

  return (
    <>
      <div className="grid grid-cols-2 gap-10">
        {/* Realms Count */}
        <div className="mb-4">
          <h2 className="mb-2 text-xl font-semibold">Your Assets</h2>
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Realms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="flex w-full justify-between gap-2">
                  <span className="text-3xl">
                    <Suspense fallback={<div>Loading...</div>}>
                      {l1UsersRealms?.collections?.[0]?.ownership?.tokenCount ??
                        0}
                    </Suspense>
                  </span>
                  <span className="flex items-center gap-2">
                    on <EthereumIcon className="h-6 w-6" /> Ethereum
                  </span>
                </p>
                <p className="flex justify-between gap-2">
                  <span className="text-3xl">
                    {accountTokens.length}
                  </span>
                  <span className="flex items-center gap-2">
                    on <StarknetIcon className="h-6 w-6" /> Starknet
                  </span>
                </p>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Link to={`/realms/bridge`}>
                  <Button variant="outline" size={"sm"}>
                    <BridgeIcon className="!h-5 !w-5" /> Bridge
                  </Button>
                </Link>
                <a href="https://market.realms.world/" target="__blank">
                  <Button variant="outline" size={"sm"}>
                    <Gavel /> Marketplace
                  </Button>
                </a>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LordsIcon className="w-8" />
                  Lords
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="flex w-full justify-between gap-2">
                  <span className="text-3xl">
                    {formatNumber(Number(l1Balance?.formatted ?? 0))}
                  </span>
                  <span className="flex items-center gap-2">
                    on <EthereumIcon className="h-6 w-6" /> Ethereum
                  </span>
                </p>
                <p className="flex justify-between gap-2">
                  <span className="text-3xl">
                    {formatNumber(Number(starknetBalance?.formatted))}
                  </span>
                  <span className="flex items-center gap-2">
                    on <StarknetIcon className="h-6 w-6" /> Starknet
                  </span>
                </p>
                <p className="flex justify-between gap-2">
                  <span className="text-3xl">
                    {formatNumber(
                      Number(formatEther(BigInt(ownerLordsLock?.amount ?? 0))),
                    )}
                  </span>
                  <span className="flex items-center gap-2">
                    staked for veLords
                  </span>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Claimable Lords */}
        <div className="mb-4 md:w-1/2">
          <h2 className="mb-2 text-xl font-semibold">Your Claims</h2>
          <Card>
            <CardContent className="flex flex-col gap-2 pt-6">
              <Link to={`/realms/claims`}>
                <Badge className="flex justify-between gap-2 rounded">
                  <span className="flex text-3xl">
                    <LordsIcon className="mr-2 w-6" />
                    {l2RealmsBalance
                      ? formatNumber(Number(formatEther(l2RealmsBalance)))
                      : 0}
                  </span>
                  <span className="flex items-center gap-2">
                    Realms Emissions
                  </span>
                </Badge>
              </Link>
              <Link to={`/velords`}>
                <Badge className="flex justify-between gap-2 rounded">
                  <span className="flex text-3xl">
                    <LordsIcon className="mr-2 w-6" />
                    {lordsClaimable
                      ? formatNumber(Number(formatEther(lordsClaimable)))
                      : 0}
                  </span>
                  <span className="flex items-center gap-2">
                    from veLords staking
                  </span>
                </Badge>
              </Link>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                onClick={() => claimAllRewards()}
                variant={"outline"}
                size={"sm"}
              >
                Claim All
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Delegate Profile */}
        <div>
          <h2 className="mb-2 text-xl font-semibold">Your Delegate</h2>
          <div className="flex flex-col gap-4">
            <Suspense fallback={<DelegateCardSkeleton />}>
              {!currentDelegate ||
              (currentDelegate.user && BigInt(currentDelegate.user) == 0n) ? (
                <Card>
                  <CardHeader className="text-2xl">
                    No delegate selected
                  </CardHeader>

                  <CardContent>
                    You must delegate your Realms for governance in order to
                    vote on proposals and receive $LORDS emissions
                  </CardContent>
                  <CardFooter>
                    <Link to={`/delegate/list`}>
                      <Button>Choose a Delegate</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ) : (
                <DelegateCard delegate={currentDelegate} />
              )}
            </Suspense>
          </div>
        </div>

        {/* Recent Proposals */}
        <div className="mb-4">
          <h2 className="mb-2 text-xl font-semibold">Recent Proposals</h2>
          <Card>
            <Suspense fallback={<div>Loading...</div>}>
              <ProposalList delegateId={currentDelegate?.user} />
            </Suspense>
          </Card>
          <div className="mt-2 flex justify-end">
            <Link to={`/proposal/list`}>
              <Button variant="outline" size={"sm"}>
                View All
              </Button>
            </Link>
          </div>
        </div>
      </div>
      {/* Realms Grid */}
      <div className="my-12">
        <h2 className="mb-2 text-xl font-semibold">Your Realms</h2>
        {accountTokens?.length > 0 ? (
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {accountTokens?.slice(0, 5)
              .map((realm) => (
                <RealmCard key={realm.token_id} token={realm} isGrid={true} />
              ))}
            <Card>
              <Link to={`/realms`} className="h-full">
                <CardContent className="hover:bg-muted flex h-full flex-col items-center justify-center">
                  <Plus className="h-16 w-16" />
                  View All
                </CardContent>
              </Link>
            </Card>
          </div>
        ) : (
          <div>No Realms Found in wallet</div>
        )}
      </div>
    </>
  );
}
