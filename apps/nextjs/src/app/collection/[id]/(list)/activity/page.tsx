import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";

import { getCollectionAddresses } from "@realms-world/constants";

import { CollectionActivity } from "./CollectionActivity";
import { L2ActivityTable } from "./L2ActivityTable";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { types?: string[] | string };
}) {
  const tokenAddresses = getCollectionAddresses(params.id);
  if (!tokenAddresses) {
    return <div>Collection Not Found</div>;
  }

  /*const types =
    typeof searchParams.types === "string"
      ? [{ types: searchParams.types }]
      : searchParams.types?.map((q: string) => {
          return { types: q };
        });
*/

  if (tokenAddresses[SUPPORTED_L2_CHAIN_ID]) {
    return (
      <div className="flex">
        <CollectionActivity
          searchAttributes={["sale", "transfer", "listing"]}
        />
        <L2ActivityTable
          //tokenAddress={tokenAddresses[SUPPORTED_L2_CHAIN_ID]!}
          searchParams={searchParams}
          collectionId={params.id}
        />
      </div>
    );
  }
}
