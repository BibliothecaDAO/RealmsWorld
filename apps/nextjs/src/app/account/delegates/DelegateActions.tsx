"use client";

import { useDelegateRealms } from "@/hooks/staking/useDelegateRealms";
import type { RouterOutputs } from "@realms-world/api";
import { Button } from "@realms-world/ui";
import { useCurrentDelegate } from "@/hooks/staking/useCurrentDelegate";
import { num } from "starknet";
import { padAddress } from "@realms-world/utils";

export const DelegateActions = ({
  delegate,
}: {
  delegate: RouterOutputs["delegates"]["all"]["items"][0];
}) => {

  const { sendAsync: delegateRealms } = useDelegateRealms({
    delegatee: delegate.user,
  });
  const { data: currentDelegate } = useCurrentDelegate()
  const isCurrentDelegate = currentDelegate && padAddress(num.toHexString(currentDelegate)) === delegate.user;

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
