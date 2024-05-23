"use client";

import { Suspense } from "react";
import { LoadingSkeletonGrid } from "@/app/_components/LoadingSkeletonGrid";
import L2ERC721Table from "@/app/collection/[id]/(list)/L2ERC721Table";
import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import { useAccount as useL2Account } from "@starknet-react/core";

import { Collections, getCollectionAddresses } from "@realms-world/constants";

import { WalletSheet } from "../_components/wallet/WalletSheet";

function AssetL2CollectionPreview({
  collectionName,
}: {
  collectionName: string;
}) {
  const { address: l2address } = useL2Account();
  return (
    <div>
      <div className="mb-4 flex flex-col items-center justify-center space-x-4 border-b pb-3 text-4xl md:flex-row md:justify-start">
        <h2>
          {collectionName === Collections.GOLDEN_TOKEN
            ? "Golden Token"
            : collectionName}
        </h2>
        <WalletSheet showEthereumLoginButton={false} />
      </div>
      <div className="min-h-24">
        {!l2address ? (
          <h3>Please connect your starknet wallet</h3>
        ) : (
          <Suspense fallback={<LoadingSkeletonGrid />}>
            <L2ERC721Table
              contractAddress={
                getCollectionAddresses(collectionName)[SUPPORTED_L2_CHAIN_ID]!
              }
              infiniteScroll={false}
              limit={10}
              ownerAddress={l2address}
              loadMoreAssetName={collectionName}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
}

export default AssetL2CollectionPreview;
