"use client";

import { useCurrentDelegate } from "@/hooks/staking/useCurrentDelegate";
import { useDelegateRealms } from "@/hooks/staking/useDelegateRealms";
import type { BigNumberish } from "starknet";
import { num } from "starknet";

import type { RouterOutputs } from "@realms-world/api";
import { Button } from "@realms-world/ui";
import { padAddress } from "@realms-world/utils";

export const DelegateActions = ({
  delegate,
}: {
  delegate: RouterOutputs["delegates"]["all"]["items"][0];
}) => {
  const { sendAsync: delegateRealms } = useDelegateRealms({
    delegatee: delegate.user,
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data: currentDelegate } = useCurrentDelegate();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const isCurrentDelegate =
    currentDelegate &&
    padAddress(num.toHexString(currentDelegate as BigNumberish)) === delegate.user;

  return (
    <Button
      variant={"default"}
      size={"sm"}
      rel="noopener noreferrer"
      onClick={() => delegateRealms()}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      disabled={isCurrentDelegate}
    >
      {isCurrentDelegate ? "Delegated" : "Delegate To"}
    </Button>
  );
};
