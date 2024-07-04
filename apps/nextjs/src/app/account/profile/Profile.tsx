"use client";

import Image from "next/image";
import Link from "next/link";
import { useDelegateRealms } from "@/hooks/staking/useDelegateRealms";
import { api } from "@/trpc/react";
import { padAddress, shortenHex } from "@/utils/utils";
import { useAccount, useReadContract } from "@starknet-react/core";
import { shortenAddress } from "@starkware-industries/commons-js-utils";
import { UserRoundPlus } from "lucide-react";
import { SignInSIWS } from "./SignInSIWS";

import type { RouterOutputs } from "@realms-world/api";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@realms-world/ui";
import { RealmsABI } from "@/abi/L2/Realms";
import { ProfileForm } from "./ProfileForm";
import { useCurrentDelegate } from "@/hooks/staking/useCurrentDelegate";
import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import { getCollectionAddresses, Collections } from "@realms-world/constants";

export const Profile = ({
  initialDelegate,
}: {
  initialDelegate?: RouterOutputs["delegates"]["byId"];
}) => {
  const { address } = useAccount();
  const { data: delegate } = api.delegates.byId.useQuery(
    {
      user: address,
    },
    {
      refetchInterval: 60000,
      initialData: initialDelegate,
      enabled: !!address,
    },
  );
  const { sendAsync: delegateRealms } = useDelegateRealms({
    delegatee: address,
  });
  const { data: currentDelegate } = useCurrentDelegate()

  const { data: ownerTokens } = api.erc721Tokens.all.useQuery({ owner: address, limit: 1 }, {
    enabled: !!address,
  });
  const { data: realmsBalance } = useReadContract({
    address: getCollectionAddresses(Collections.REALMS)?.[
      SUPPORTED_L2_CHAIN_ID
    ] as `0x${string}`,
    abi: RealmsABI,
    functionName: "balance_of",
    enabled: !!address,
    args: address ? [address] : undefined,
    refetchInterval: 10000,
  });
  /*const { data: tokenHolder } = api.delegates.tokenHolderById.useQuery(
    {
      id: address ?? "0x",
    },
    {
      refetchInterval: 60000,
      enabled: !!address,
    },
  );*/
  return (
    <div className="grid grid-cols-5 gap-x-6">
      <Card className="col-span-3">
        {delegate ? (
          <>
            <CardHeader>
              <CardTitle className="flex gap-2">
                <Image
                  alt="profile image"
                  width={16}
                  height={16}
                  src="https://avatars.githubusercontent.com/u/1?v=4"
                  className="h-16 w-16 rounded-full"
                />
                <div className="flex w-full justify-between">
                  <div>
                    <div className="mb-1">{shortenAddress(delegate.user)}</div>
                    <div className="mb-1 flex items-center text-sm font-bold uppercase text-muted-foreground">
                      Voting Power:
                      <Badge variant="outline" className="ml-2">
                        {delegate.delegatedVotesRaw} Realms
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <span className="text-sm font-bold uppercase">
                        Delegation:
                      </span>
                      <Badge variant="outline">
                        {realmsBalance} Realms
                      </Badge>
                      <span className="text-sm">delegated to</span>
                      <Badge variant="outline">
                        {currentDelegate == address
                          ? "self"
                          : shortenHex(currentDelegate, 8)}
                      </Badge>
                    </div>
                  </div>
                  {currentDelegate != padAddress(address) && (
                    <Button size="sm" onClick={() => delegateRealms()}>
                      <UserRoundPlus className="mr-2" /> Delegate to Self
                    </Button>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <ProfileForm
                delegateProfile={delegate.delegateProfile}
                delegateId={delegate.user}
              />
            </CardContent>
          </>
        ) : (
          <>
            <CardHeader>
              <CardTitle>No delegate found</CardTitle>
            </CardHeader>
            <CardContent>
              {ownerTokens?.items.length ? (
                <>
                  Delegate your Realms to yourself
                  to create a delegate profile
                  <Button size="sm" onClick={() => delegateRealms()}>
                    <UserRoundPlus className="mr-2" /> Delegate to Self
                  </Button>
                </>
              ) : (
                <>
                  <p className="mb-4">
                    You must have at least one Realm on Starknet to create a
                    delegate profile. Either bridge a Realm from Etherum or
                    purchase on the marketplace to get started
                  </p>
                  <Button asChild className="mr-4">
                    <Link href="/account/assets">Bridge</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/collection/realms">Marketplace</Link>
                  </Button>
                </>
              )}
            </CardContent>
          </>
        )}
      </Card>
      {delegate && (<div className="sticky top-[5rem] col-span-2 h-[200px]">
        <Card className="w-auto">
          <SignInSIWS />
        </Card>
      </div>)}
    </div>
  );
};
