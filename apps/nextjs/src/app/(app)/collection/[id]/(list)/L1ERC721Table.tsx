"use client";

import type { paths } from "@reservoir0x/reservoir-sdk";
import { NftActions } from "@/app/(app)/account/assets/NftActions";
import { L1ERC721Card } from "@/app/(app)/collection/[id]/(list)/L1ERC721Card";
import { SUPPORTED_L1_CHAIN_ID } from "@/constants/env";
import useNftSelection from "@/hooks/useNftSelection";
import { useUIStore } from "@/providers/UIStoreProvider";

import { getCollectionFromAddress } from "@realms-world/constants";

export const L1ERC721Table = ({
  address,
  tokens,
  selectable,
}: {
  address: string;
  tokens:
  | NonNullable<
    paths["/tokens/v7"]["get"]["responses"]["200"]["schema"]["tokens"]
  >
  | NonNullable<
    paths["/users/{user}/tokens/v10"]["get"]["responses"]["200"]["schema"]["tokens"]
  >;
  selectable?: boolean;
}) => {
  const { isGrid } = useUIStore((state) => state);

  const grid =
    "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5";
  const list = "grid grid-cols-1 w-full";
  const collectionName = getCollectionFromAddress(address);

  const {
    deselectAllNfts,
    isNftSelected,
    selectBatchNfts,
    toggleNftSelection,
    totalSelectedNfts,
    selectedTokenIds,
  } = useNftSelection({ userAddress: address as `0x${string}` });

  return (
    <>
      {selectable && (
        <NftActions
          selectedTokenIds={selectedTokenIds}
          totalSelectedNfts={totalSelectedNfts}
          selectBatchNfts={selectBatchNfts}
          tokens={tokens}
          deselectAllNfts={deselectAllNfts}
          sourceChain={SUPPORTED_L1_CHAIN_ID}
        />
      )}
      <div className={isGrid ? grid : list}>
        {tokens.map((token, index) => {
          const isSelected = isNftSelected(
            token.token?.tokenId?.toString() ?? "0",
            token.token?.contract ?? "0x",
          );
          return (
            <div key={index}>
              {selectable ? (
                <div
                  className="cursor-pointer"
                  onClick={() =>
                    toggleNftSelection(
                      token.token?.tokenId?.toString() ?? "0",
                      token.token?.contract ?? "0x",
                    )
                  }
                >
                  <L1ERC721Card
                    key={index}
                    collectionName={collectionName ?? ""}
                    token={token}
                    layout={isGrid ? "grid" : "list"}
                    selectable
                    isSelected={isSelected}
                  />
                </div>
              ) : (
                <L1ERC721Card
                  collectionName={collectionName ?? ""}
                  token={token}
                  layout={isGrid ? "grid" : "list"}
                />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};
