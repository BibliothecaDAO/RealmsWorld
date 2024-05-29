"use client";

import React from "react";
import { useUserTokens } from "@/hooks/reservoir/useUserTokens";
import useNftSelection from "@/hooks/useNftSelection";
import { useAccount } from "wagmi";

import { ScrollArea } from "@realms-world/ui";

import UserTokenCard from "../../user/[address]/UserTokenCard";
import { NftActions } from "./NftActions";

function AssetL1CollectionPreview() {
  const { address: l1Address } = useAccount();
  const { tokens } = useUserTokens({
    address: l1Address!,
    //continuation: "",
  });
  // const { data: realmsData, isLoading: realmsDataIsLoading } = useUserActivity(address);

  const {
    deselectAllNfts,
    isNftSelected,
    selectBatchNfts,
    toggleNftSelection,
    totalSelectedNfts,
    selectedTokenIds,
  } = useNftSelection({ userAddress: l1Address! });

  return (
    <div className="min-h-24">
      {!l1Address ? (
        <h3>Please connect your ethereum wallet</h3>
      ) : (
        <div>
          {tokens?.tokens?.length ? (
            <>
              <NftActions
                selectedTokenIds={selectedTokenIds}
                totalSelectedNfts={totalSelectedNfts}
                selectBatchNfts={selectBatchNfts}
                tokens={tokens.tokens}
                deselectAllNfts={deselectAllNfts}
              />
              <ScrollArea>
                <div className="my-3 grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                  {tokens?.tokens?.map((token) => {
                    const isSelected = isNftSelected(
                      token.token?.tokenId ?? "0",
                      token.token?.contract ?? "0x",
                    );

                    return (
                      <UserTokenCard
                        key={token.token?.tokenId}
                        token={token}
                        onClick={() =>
                          toggleNftSelection(
                            token.token?.tokenId ?? "0",
                            token.token?.contract ?? "0x",
                          )
                        }
                        selected={isSelected}
                      />
                    );
                  })}
                </div>
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
