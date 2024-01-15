import { useAirdropClaim } from "@/hooks/useAirdropClaim";

import { Button } from "@realms-world/ui";

export const PaymentPoolV2 = () => {
  const { dataLoading, numTokens, alreadyClaimed, claimAirdrop } =
    useAirdropClaim();

  return (
    <div className="flex-col pb-2 text-lg">
      <div>
        <Button onClick={claimAirdrop}>claim</Button>
      </div>
    </div>
  );
};
