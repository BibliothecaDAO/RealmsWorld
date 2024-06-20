"use client";

import Image from "next/image";
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
      {delegate && (
        <>
          <CardHeader>
            <CardTitle className="flex gap-2">
              <Image
                alt="profile image"
                width={48}
                height={48}
                src="https://avatars.githubusercontent.com/u/1?v=4"
                className="h-14 w-14 rounded-full"
              />
              <div>
                <div>{shortenAddress(delegate.id)}</div>
                <div className="flex items-center text-lg font-bold uppercase text-muted-foreground">
                  Voting Power:
                  <Badge variant="outline" className="ml-2">
                    {delegate.delegatedVotesRaw} Realms
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="text-lg font-bold uppercase">
                    Delegation:
                  </span>
                  <Badge variant="outline">
                    {tokenHolder?.tokenBalanceRaw} /{" "}
                    {tokenHolder?.totalTokensHeldRaw} Realms
                  </Badge>
                  <span className="text-sm">delegated to</span>
                  <Badge variant="outline">
                    {tokenHolder?.delegate == delegate.id
                      ? "self"
                      : shortenHex(tokenHolder?.delegate ?? "0x", 8)}
                  </Badge>
                </div>
                <Button size="sm" onClick={() => delegateRealms()}>
                  Delegate to Self
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <ProfileForm delegateProfile={delegate.delegateProfile} />
          </CardContent>
        </>
      )}
    </>
  );
};
