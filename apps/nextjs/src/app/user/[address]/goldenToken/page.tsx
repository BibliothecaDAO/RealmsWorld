import { Suspense } from "react";
import { LoadingSkeletonGrid } from "@/app/_components/LoadingSkeletonGrid";
import L2ERC721Table from "@/app/collection/[id]/(list)/L2ERC721Table";
import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";

import { Collections, getCollectionAddresses } from "@realms-world/constants";

export default async function GoldenToken({
  params,
}: {
  params: { address: string };
}) {
  return (
    <Suspense fallback={<LoadingSkeletonGrid />}>
      <L2ERC721Table
        contractAddress={
          getCollectionAddresses(Collections.GOLDEN_TOKEN)[
            SUPPORTED_L2_CHAIN_ID
          ]!
        }
        ownerAddress={params.address}
      />
    </Suspense>
  );
}
