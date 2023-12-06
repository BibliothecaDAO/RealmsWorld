"use client";

import React, { useMemo } from "react";
import { useContractWrite } from "@starknet-react/core";
import { RefreshCw } from "lucide-react";

//import { useToast } from "@realms-world/ui";;

interface TokenOwnerActionsProps {
  tokenId: string;
  tokenOwnerAddress: string;
  contractAddress: string;
}

const TokenOwnerActions: React.FC<TokenOwnerActionsProps> = ({
  tokenId,
  tokenOwnerAddress,
  contractAddress,
}) => {
  const calls = useMemo(() => {
    const tx = [
      {
        contractAddress: tokenAddress as `0x${string}`,
        entrypoint: "mint",
        calldata: [],
      },
    ];
    return tx;
  }, [price, expiration]);

  const {
    data: mintData,
    write,
    isLoading: isTxSubmitting,
  } = useContractWrite({
    calls: [
      {
        contractAddress: tokens.L2.ETH.tokenAddress?.[
          ChainType.L2[NETWORK_NAME]
        ] as `0x${string}`,
        entrypoint: "approve",
        calldata: [tokenAddress as `0x${string}`, MINT_COST * mintQty, 0],
      },
      ...calls,
    ],
  });

  //const { toast } = useToast();
  //const { listItem } = useBurner();
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  const onItemlist = async () => {
    try {
      setIsSubmitting(true);
      /*await listItem({
        tokenId: parseInt(tokenId),
        tokenOwnerAddress,
        contractAddress
      });
      toast({
        title: "Order placed",
        description: "Your order has been submitted"
      });*/
      setIsSubmitting(false);
    } catch (error: any) {
      setIsSubmitting(false);
      /*toast({
        title: "Error",
        description: error.message
      });*/
    }
  };

  return (
    <div className="border">
      <div className="flex items-center justify-between p-6">
        <div className="text-lg font-bold">Item not listed</div>
        <button
          onClick={() => onItemlist()}
          className="animate-background inline-block rounded-lg bg-gray-900 from-pink-500 via-red-500 to-yellow-500 bg-[length:_400%_400%] p-0.5 [animation-duration:_6s] hover:bg-gradient-to-r dark:bg-gray-800"
        >
          <div className="rounded-md bg-white px-5 py-3 text-sm font-medium text-gray-900 dark:bg-gray-900 dark:text-white">
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                <span>Please wait</span>
              </div>
            ) : (
              <>List Item</>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default TokenOwnerActions;
