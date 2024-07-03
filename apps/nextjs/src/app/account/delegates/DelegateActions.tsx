"use client";

import { useDelegateRealms } from "@/hooks/staking/useDelegateRealms";
import { api } from "@/trpc/react";
import { useAccount } from "@starknet-react/core";

import type { RouterOutputs } from "@realms-world/api";
import { Button } from "@realms-world/ui";
import { useCurrentDelegate } from "@/hooks/staking/useCurrentDelegate";

export const DelegateActions = ({
  delegate,
}: {
  delegate: RouterOutputs["delegates"]["all"]["items"][0];
}) => {
  const { address } = useAccount();
  const { sendAsync: delegateRealms } = useDelegateRealms({
    delegatee: delegate.user,
  });
  const { data: currentDelegate } = useCurrentDelegate()

  const isCurrentDelegate = currentDelegate === delegate.id;
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
