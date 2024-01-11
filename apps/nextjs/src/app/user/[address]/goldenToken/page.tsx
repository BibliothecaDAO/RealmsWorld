import { Suspense } from "react";
import { LoadingSkeletonGrid } from "@/app/_components/LoadingSkeletonGrid";
import L2ERC721Table from "@/app/collection/[id]/(list)/L2ERC721Table";
import { getTokenContractAddresses } from "@/utils/utils";

export default async function GoldenToken({
  params,
}: {
  params: { address: string };
}) {
  return (
    <Suspense fallback={<LoadingSkeletonGrid />}>
      <L2ERC721Table
        contractAddress={getTokenContractAddresses("goldenToken").L2!}
        ownerAddress={params.address}
      />
    </Suspense>
  );
}
