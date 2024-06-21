"use client";

import Image from "next/image";
import Link from "next/link";
import { useDelegateRealms } from "@/hooks/staking/useDelegateRealms";
import { api } from "@/trpc/react";
import { shortenHex } from "@/utils/utils";
import { useAccount } from "@starknet-react/core";
import { shortenAddress } from "@starkware-industries/commons-js-utils";

import type { RouterOutputs } from "@realms-world/api";
import {
  Badge,
  Button,
  CardContent,
  CardHeader,
  CardTitle,
} from "@realms-world/ui";

import { ProfileForm } from "./ProfileForm";

export const Profile = ({
  initialDelegate,
}: {
  initialDelegate?: RouterOutputs["delegates"]["byId"];
}) => {
  const { address } = useAccount();
  const { data: delegate } = api.delegates.byId.useQuery(
    {
      id: address ?? "0x",
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

  const { data: tokenHolder } = api.delegates.tokenHolderById.useQuery(
    {
      id: address ?? "0x",
    },
    {
      refetchInterval: 60000,
      enabled: !!address,
    },
  );
  return (
    <>
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
                  <div className="mb-1">{shortenAddress(delegate.id)}</div>
                  <div className="mb-1 flex items-center text-sm font-bold uppercase text-muted-foreground">
                    Voting Power:
                    <Badge variant="default" className="ml-2">
                      {delegate.delegatedVotesRaw} Realms
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span className="text-sm font-bold uppercase">
                      Delegation:
                    </span>
                    <Badge variant="default">
                      {tokenHolder?.tokenBalanceRaw} /{" "}
                      {tokenHolder?.totalTokensHeldRaw} Realms
                    </Badge>
                    <span className="text-sm">delegated to</span>
                    <Badge variant="default">
                      {tokenHolder?.delegate == delegate.id
                        ? "self"
                        : shortenHex(tokenHolder?.delegate ?? "0x", 8)}
                    </Badge>
                  </div>
                </div>
                <Button size="sm" onClick={() => delegateRealms()}>
                  Delegate to Self
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <ProfileForm
              delegateProfile={delegate.delegateProfile}
              delegateId={delegate.id}
            />
          </CardContent>
        </>
      ) : (
        <>
          <CardHeader>
            <CardTitle>No delegate found</CardTitle>
          </CardHeader>
          <CardContent>
            {tokenHolder?.totalTokensHeldRaw ? (
              <>
                Delegate your {tokenHolder.totalTokensHeldRaw} Realms to
                yourself to create a delegate profile
                <Button size="sm" onClick={() => delegateRealms()}>
                  Delegate to Self
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
    </>
  );
};
