import { Suspense } from "react";
import { AttributesDropdown } from "@/app/collection/AttributesDropdown";
import { AttributeTags } from "@/app/collection/AttributeTags";
import { TokenCardSkeleton } from "@/app/collection/TokenCardSkeleton";
import { TokenTable } from "@/app/collection/TokenTable";
import { TradeFilters } from "@/app/collection/TradeFilters";
import type { erc721Tokens } from "@/constants/erc721Tokens";
import { getAttributes } from "@/lib/reservoir/getAttributes";
import { getToken } from "@/lib/reservoir/getToken";
import { getTokenContractAddresses } from "@/utils/utils";

import { L2ERC721Table } from "./L2ERC721Table";

export async function Trade({
  contractId,
  searchParams,
}: {
  contractId: keyof typeof erc721Tokens;
  searchParams?: {
    page?: string;
  };
}) {
  const tokenAddresses = getTokenContractAddresses(contractId);

  const tokensData = getToken({
    collection: tokenAddresses.L1,
    query: searchParams,
  });

  const attributesData = getAttributes({
    collection: tokenAddresses.L1 ?? contractId,
  });
  const [tokens, attributes] = await Promise.all([tokensData, attributesData]);

  if (!tokens) {
    return <div>Collection Not Found</div>;
  }
  return (
    <>
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
              <L2ERC721Table contractAddress={tokenAddresses.L2} />
            </Suspense>
          </div>
        )}
      </div>
    </>
  );
}
