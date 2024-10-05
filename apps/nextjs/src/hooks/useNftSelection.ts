import { useCallback, useMemo, useState } from "react";
import { toast } from "@realms-world/ui/components/ui/use-toast";

export const MAX_SELECTED_ITEMS = 140;

export default function useNftSelection({
  userAddress,
}: {
  userAddress: `0x${string}`;
}) {
  const [selectedTokensByUserAddress, setSelectedTokensByUserAddress] =
    useState<
      Record<
        `0x${string}`,
        { collectionAddress: string; tokenIds: string[] } | null
      >
    >();

  const { selectedCollectionAddress, selectedTokenIds } = useMemo(
    () => ({
      selectedCollectionAddress:
        selectedTokensByUserAddress?.[userAddress]?.collectionAddress,
      selectedTokenIds:
        selectedTokensByUserAddress?.[userAddress]?.tokenIds ?? [],
    }),
    [selectedTokensByUserAddress, userAddress],
  );

  const totalSelectedNfts = useMemo(
    () => selectedTokenIds.length,
    [selectedTokenIds],
  );

  const isNftSelected = useCallback(
    (tokenId: string, collectionAddress: string) => {
      return (
        selectedTokenIds.includes(tokenId) &&
        collectionAddress === selectedCollectionAddress
      );
    },
    [selectedCollectionAddress, selectedTokenIds],
  );

  function selectNft(tokenId: string, collectionAddress: string) {
    if (isNftSelected(tokenId, collectionAddress)) {
      return;
    }

    if (
      totalSelectedNfts === MAX_SELECTED_ITEMS &&
      collectionAddress === selectedCollectionAddress
    ) {
      toast({
        title: "Max Realms Selected",
        description: "Maximum 30 realms to be bridged in one transaction",
      });
      return;
    }

    if (
      collectionAddress !==
      selectedTokensByUserAddress?.[userAddress]?.collectionAddress
    ) {
      setSelectedTokensByUserAddress((previousValue) => ({
        ...previousValue,
        [userAddress]: { collectionAddress, tokenIds: [tokenId] },
      }));
      return;
    }

    setSelectedTokensByUserAddress((previousValue) => ({
      ...previousValue,
      [userAddress]: {
        collectionAddress,
        tokenIds: [...selectedTokenIds, tokenId],
      },
    }));
  }

  const deselectNft = useCallback(
    (tokenId: string, collectionAddress: string) => {
      if (!isNftSelected(tokenId, collectionAddress)) {
        return;
      }

      if (selectedTokenIds.length === 1) {
        setSelectedTokensByUserAddress((previousValue) => ({
          ...previousValue,
          [userAddress]: undefined,
        }));
        return;
      }

      setSelectedTokensByUserAddress((previousValue) => ({
        ...previousValue,
        [userAddress]: {
          collectionAddress,
          tokenIds: selectedTokenIds.filter(
            (selectedTokenId) => selectedTokenId !== tokenId,
          ),
        },
      }));
    },
    [
      isNftSelected,
      selectedTokenIds,
      setSelectedTokensByUserAddress,
      userAddress,
    ],
  );

  function selectBatchNfts(
    contractAddress: string,
    tokenIds: string[],
    // | RouterOutputs["erc721Tokens"]["all"]["items"],
  ) {
    console.log(tokenIds);
    if (tokenIds.length === 0) {
      return;
    }
    setSelectedTokensByUserAddress((previousValue) => ({
      ...previousValue,
      [userAddress]: {
        collectionAddress: contractAddress,
        tokenIds: tokenIds.slice(0, MAX_SELECTED_ITEMS),
      },
    }));
  }
  const deselectAllNfts = useCallback(() => {
    setSelectedTokensByUserAddress((previousValue) => ({
      ...previousValue,
      [userAddress]: undefined,
    }));
  }, [setSelectedTokensByUserAddress, userAddress]);

  function toggleNftSelection(tokenId: string, collectionAddress: string) {
    if (isNftSelected(tokenId, collectionAddress)) {
      deselectNft(tokenId, collectionAddress);
      return;
    }

    selectNft(tokenId, collectionAddress);
  }

  return {
    deselectAllNfts,
    deselectNft,
    isNftSelected,
    selectBatchNfts,
    selectedCollectionAddress,
    selectedTokenIds,
    toggleNftSelection,
    totalSelectedNfts,
  };
}
