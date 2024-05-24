"use client";

import React from "react";
import { useWriteDepositRealms } from "@/hooks/bridge/useWriteDepositRealms";
import { useUserTokens } from "@/hooks/reservoir/useUserTokens";
import useNftSelection, { MAX_SELECTED_ITEMS } from "@/hooks/useNftSelection";
import { useAccount as useL2Account } from "@starknet-react/core";
import { XIcon } from "lucide-react";
import { useAccount } from "wagmi";

import { Badge, Button, ScrollArea } from "@realms-world/ui";

import UserTokenCard from "../../user/[address]/UserTokenCard";

function AssetL1CollectionPreview() {
  const { address: l1Address } = useAccount();
  const { address: l2Address } = useL2Account();
  const { tokens } = useUserTokens({
    address: l1Address as `0x${string}`,
    //continuation: "",
  });
  // const { data: realmsData, isLoading: realmsDataIsLoading } = useUserActivity(address);
  const {
    deselectAllNfts,
    isNftSelected,
    selectBatchNfts,
    selectedCollectionAddress,
    toggleNftSelection,
    totalSelectedNfts,
    selectedTokenIds,
  } = useNftSelection({ userAddress: l1Address as `0x${string}` });

  const { writeAsync } = useWriteDepositRealms({
    onSuccess: () => console.log("success"),
  });

  const isAllSelected =
    totalSelectedNfts === MAX_SELECTED_ITEMS ||
    totalSelectedNfts === tokens?.tokens?.length;
  const hasMoreThanMaxSelectNfts =
    (tokens?.tokens?.length ?? 0) > MAX_SELECTED_ITEMS;
  return (
    <div className="min-h-24">
      {!l1Address ? (
        <h3>Please connect your ethereum wallet</h3>
      ) : (
        <div>
          {tokens?.tokens?.length ? (
            <>
              <div className="mt-2 flex w-full justify-between">
                <div className="flex items-center gap-x-4">
                  <span className="text-lg">Actions:</span>
                  <Button
                    onClick={() =>
                      l2Address &&
                      writeAsync({
                        tokenIds: selectedTokenIds.map((id) => BigInt(id)),
                        l2Address,
                      })
                    }
                    disabled={totalSelectedNfts < 1}
                  >
                    Bridge
                  </Button>
                </div>
                <div className="flex items-center gap-x-4">
                  <Badge variant={"outline"} className="h-6 font-bold">
                    {totalSelectedNfts} Realms
                  </Badge>

                  {isAllSelected ? (
                    <Button
                      variant={"secondary"}
                      className="flex"
                      onClick={deselectAllNfts}
                      size="sm"
                    >
                      Deselect All
                      <XIcon className="ml-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        selectBatchNfts(tokens.tokens ?? []);
                      }}
                      color="default"
                      size="sm"
                    >
                      <span>
                        {hasMoreThanMaxSelectNfts
                          ? "Select 30 Max"
                          : "Select All"}
                      </span>
                    </Button>
                  )}
                </div>
              </div>
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
          {/* TODO: display L1 assets when connected */}
          {/*<UserTokenGrid
              address={"0x0efcc732b7f88bab88886638d2e4faacda44f7ff"}
              continuation=""
            />*/}
        </div>
      )}
    </div>
  );
}

export default AssetL1CollectionPreview;
