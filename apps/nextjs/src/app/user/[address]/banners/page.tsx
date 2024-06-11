import { Suspense } from "react";
import { LoadingSkeletonGrid } from "@/app/_components/LoadingSkeletonGrid";
import L2ERC721Table from "@/app/collection/[id]/(list)/L2ERC721Table";
import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";

import { Collections, getCollectionAddresses } from "@realms-world/constants";

export default function Page({ params }: { params: { address: string } }) {
  const address = getCollectionAddresses(Collections.BANNERS)?.[
    SUPPORTED_L2_CHAIN_ID
  ];
  return (
    <Suspense fallback={<LoadingSkeletonGrid />}>
      {address && (
        <L2ERC721Table
          contractAddress={address}
          ownerAddress={params.address}
        />
      )}
    </Suspense>
  );
}
