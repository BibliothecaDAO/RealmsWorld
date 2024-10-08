"use client";

import { Suspense } from "react";
import { LoadingSkeletonGrid } from "@/app/_components/LoadingSkeletonGrid";
import { StarknetLoginButton } from "@/app/_components/wallet/StarknetLoginButton";
import L2ERC721Table from "@/app/(app)/collection/[id]/(list)/L2ERC721Table";
import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import { useAccount as useL2Account } from "@starknet-react/core";

import { getCollectionAddresses } from "@realms-world/constants";
import {
  ScrollArea
} from "@realms-world/ui/components/ui/scroll-area";

function AssetL2CollectionPreview({
  collectionName,
  hideTitle,
}: {
  collectionName: string;
  hideTitle?: boolean;
}) {
  const { address: l2address } = useL2Account();
  const collectionAddress =
    getCollectionAddresses(collectionName)?.[SUPPORTED_L2_CHAIN_ID];

  if (!hideTitle) {
    return <div>
      <div className="mb-4 flex flex-col capitalize items-center justify-center space-x-4 border-b pb-3 text-4xl md:flex-row md:justify-start">
        <h2>
          {collectionName === "goldentoken" ? "Golden Token" : collectionName}
        </h2>
        <StarknetLoginButton />
      </div>
    </div>
  }

  if (!l2address) {
    return <div>
      <div className="min-h-24">
        <h3>Please connect your starknet wallet</h3>
      </div>
    </div>
  }

  return (
    <div>
      <div className="min-h-24">
        <Suspense fallback={<LoadingSkeletonGrid />}>
          {collectionAddress && (
            <ScrollArea>
              <L2ERC721Table
                contractAddress={collectionAddress}
                infiniteScroll={true}
                limit={200}
                ownerAddress={l2address}
                loadMoreAssetName={collectionName}
                selectable={collectionName == "realms"}
              />
            </ScrollArea>
          )}
        </Suspense>
      </div>
    </div>
  );
}

export default AssetL2CollectionPreview;
