import { Suspense } from "react";
import type { Metadata } from "next";
import { AttributesDropdown } from "@/app/collection/AttributesDropdown";
import { AttributeTags } from "@/app/collection/AttributeTags";
import { TokenCardSkeleton } from "@/app/collection/TokenCardSkeleton";
import { TokenTable } from "@/app/collection/TokenTable";
import { TradeFilters } from "@/app/collection/TradeFilters";
import { erc721Tokens } from "@/constants";
import { NETWORK_NAME } from "@/constants/env";
import { ChainType } from "@/constants/tokens";
import { getAttributes } from "@/lib/reservoir/getAttributes";
import { getCollections } from "@/lib/reservoir/getCollections";
import { getToken } from "@/lib/reservoir/getToken";
import type { Collection } from "@/types";
import { getTokenContractAddresses, isStarknetAddress } from "@/utils/utils";

import { BeastsTable } from "./BeastTable";

export const runtime = "edge";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const tokenAddresses = getTokenContractAddresses(
    params.id as keyof typeof erc721Tokens,
  );
  const collectionData = await getCollections([
    { contract: tokenAddresses.L1 },
  ]);
  const collection: Collection = collectionData.collections?.[0];

  return {
    title: `Collection: ${collection?.name}`,
    description: `Collection Details and Marketplace for ${collection?.name} - Created for adventurers by Bibliotheca DAO`,
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: {
    page?: string;
  };
}) {
  const token = erc721Tokens[params.id as keyof typeof erc721Tokens];

  const tokenAddresses = getTokenContractAddresses(
    params.id as keyof typeof erc721Tokens,
  );

  const tokensData = getToken({
    collection: tokenAddresses.L1,
    query: searchParams,
  });

  const attributesData = getAttributes({
    collection: tokenAddresses.L1,
  });
  const [tokens, attributes] = await Promise.all([tokensData, attributesData]);
  console.log(tokens);

  if (!tokens) {
    return <div>Collection Not Found</div>;
  }

  return (
    <div>
      <div className="mb-3 flex w-full justify-between">
        <TradeFilters />
      </div>

      <div className="flex w-full">
        {tokenAddresses.L1 && (
          <>
            <AttributesDropdown
              address={tokenAddresses.L1}
              attributes={attributes}
            />
            {/*<SweepButton id={params.address} />*/}
            <div className="w-full">
              <AttributeTags />
              <Suspense
                fallback={
                  <div className="flex w-full flex-col gap-4">
                    <TokenCardSkeleton />
                    <TokenCardSkeleton />
                    <TokenCardSkeleton />
                  </div>
                }
              >
                <TokenTable
                  address={tokenAddresses.L1}
                  tokens={tokens.tokens}
                />
              </Suspense>
            </div>
          </>
        )}
        {tokenAddresses.L2 && (
          <div className="w-full">
            <Suspense
              fallback={
                <div className="flex w-full flex-col gap-4">
                  <TokenCardSkeleton />
                  <TokenCardSkeleton />
                  <TokenCardSkeleton />
                </div>
              }
            >
              <BeastsTable />
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
}
