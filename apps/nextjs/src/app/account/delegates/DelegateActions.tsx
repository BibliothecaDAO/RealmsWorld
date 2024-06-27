"use client";

import { useDelegateRealms } from "@/hooks/staking/useDelegateRealms";
import { api } from "@/trpc/react";
import { useAccount } from "@starknet-react/core";

import type { RouterOutputs } from "@realms-world/api";
import { Button } from "@realms-world/ui";

export const DelegateActions = ({
  delegate,
}: {
  delegate: RouterOutputs["delegates"]["all"]["items"][0];
}) => {
  const { address } = useAccount();
  const { sendAsync: delegateRealms } = useDelegateRealms({
    delegatee: delegate.id,
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

  const isCurrentDelegate = tokenHolder?.delegate === delegate.id;
  return (
    <Button
      variant={"default"}
      size={"sm"}
      rel="noopener noreferrer"
      onClick={() => delegateRealms()}
      disabled={isCurrentDelegate}
    >
      {isCurrentDelegate ? "Delgated" : "Delegate To"}
    </Button>
  );
};
