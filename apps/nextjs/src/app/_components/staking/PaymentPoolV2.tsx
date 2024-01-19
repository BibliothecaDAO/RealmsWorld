import { useEffect } from "react";
import { useAirdropClaim } from "@/hooks/useAirdropClaim";
import Lords from "@/icons/lords.svg";

import { Button } from "@realms-world/ui";

export const PaymentPoolV2 = () => {
  const { numTokens, alreadyClaimed, claimAirdrop, balance } =
    useAirdropClaim();

  console.log("balance", balance);

  return (
    <div className="flex-col border p-8 text-lg">
      {numTokens > 0 && !balance ? (
        <div>
          <div className="mb-5 flex justify-center space-x-2 text-2xl ">
            {numTokens ? numTokens.toLocaleString() : 0}{" "}
            <Lords className="ml-2 h-5 w-5 self-center fill-current" />
          </div>

          {numTokens && (
            <Button onClick={claimAirdrop}>
              {alreadyClaimed ? "claimed" : "claim lords"}
            </Button>
          )}
        </div>
      ) : (
        "No tokens to claim"
      )}
    </div>
  );
};
