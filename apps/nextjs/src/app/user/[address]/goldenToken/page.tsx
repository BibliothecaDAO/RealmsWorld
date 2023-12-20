import { Suspense } from "react";
import { L2ERC721Table } from "@/app/collection/[id]/(list)/L2ERC721Table";
import { TokenCardSkeleton } from "@/app/collection/TokenCardSkeleton";
import { getTokenContractAddresses } from "@/utils/utils";

export default async function GoldenToken({
  params,
}: {
  params: { address: string };
}) {
  return (
    <Suspense
      fallback={
        <div className="grid grid-cols-1 gap-4 sm:pl-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {Array.from({ length: 3 }).map((_, index) => (
            <TokenCardSkeleton key={index} />
          ))}
        </div>
      }
    >
      <L2ERC721Table
        contractAddress={getTokenContractAddresses("goldenToken").L2!}
        ownerAddress={params.address}
      />
    </Suspense>
  );
}
