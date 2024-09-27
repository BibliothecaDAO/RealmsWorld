import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import { useWalletRequest } from "@starknet-react/core";

import { LORDS } from "@realms-world/constants";
import { Button } from "@realms-world/ui/components/ui/button";

export const AddLordsToWallet = () => {
  const { requestAsync, isPending, isError, error } = useWalletRequest({
    type: "wallet_watchAsset",
  });

  return (
    <>
      {LORDS[SUPPORTED_L2_CHAIN_ID]?.address && (
        <Button
          onClick={() =>
            requestAsync({
              type: "wallet_watchAsset",
              params: {
                type: "ERC20",
                options: {
                  address: LORDS[SUPPORTED_L2_CHAIN_ID].address,
                  decimals: 18,
                  symbol: "LORDS",
                  name: "Lords",
                },
              },
            })
          }
        >
          Request
        </Button>
      )}
    </>
  );
};
