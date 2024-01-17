import { useAirdropClaim } from "@/hooks/useAirdropClaim";

import { Button } from "@realms-world/ui";

export const PaymentPoolV2 = () => {
  const { dataLoading, numTokens, alreadyClaimed, claimAirdrop } =
    useAirdropClaim();

  return (
    <div className="flex-col pb-2 text-lg">
      <div>
        <div>{numTokens}</div>

        <Button onClick={claimAirdrop}>
          {alreadyClaimed ? "claimed" : "claim"}
        </Button>
      </div>
    </div>
  );
};
