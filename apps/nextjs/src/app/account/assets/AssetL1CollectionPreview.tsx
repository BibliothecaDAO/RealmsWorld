"use client";

import React from "react";
import { LoadingSkeletonGrid } from "@/app/_components/LoadingSkeletonGrid";
import { L1ERC721Table } from "@/app/collection/[id]/(list)/L1ERC721Table";
import { SUPPORTED_L1_CHAIN_ID } from "@/constants/env";
import { useUserTokens } from "@/hooks/reservoir/useUserTokens";
import { useAccount } from "wagmi";

import { CollectionAddresses } from "@realms-world/constants";
import { ScrollArea } from "@realms-world/ui";

//import UserTokenCard from "../../user/[address]/UserTokenCard";

function AssetL1CollectionPreview() {
  const { address: l1Address } = useAccount();

  const { tokens, isLoading } = useUserTokens({
    address: l1Address,
    //continuation: "",
  });
  // const { data: realmsData, isLoading: realmsDataIsLoading } = useUserActivity(address);

  return (
    <div className="min-h-24">
      {!l1Address ? (
        <h3>Please connect your ethereum wallet</h3>
      ) : (
        <div>
          {tokens?.tokens?.length ? (
            <>
              <ScrollArea>
                {isLoading ? (
                  <LoadingSkeletonGrid />
                ) : (
                  <L1ERC721Table
                    address={CollectionAddresses.realms[SUPPORTED_L1_CHAIN_ID]}
                    tokens={tokens.tokens}
                    selectable
                  />
                )}
              </ScrollArea>
            </>
          ) : (
            "No tokens"
          )}
        </div>
      )}
    </div>
  );
}

export default AssetL1CollectionPreview;
