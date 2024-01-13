import type { erc721Tokens } from "@/constants/erc721Tokens";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { AttributesDropdown } from "@/app/collection/AttributesDropdown";
import { AttributeTags } from "@/app/collection/AttributeTags";
import { TokenCardSkeleton } from "@/app/collection/TokenCardSkeleton";
import { TokenTable } from "@/app/collection/TokenTable";
import { TradeFilters } from "@/app/collection/TradeFilters";
import { getAttributes } from "@/lib/reservoir/getAttributes";
import { getToken } from "@/lib/reservoir/getToken";
import { api } from "@/trpc/server";
import { getTokenContractAddresses } from "@/utils/utils";

const L2ERC721Table = dynamic(() => import("./L2ERC721Table"));

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

  const erc721Attributes = await api.erc721Attributes.all(
    {
      contractAddress: tokenAddresses.L2,
    },
    /*{
        getNextPageParam(lastPage) {
          return lastPage.nextCursor;
        },
      },*/
  );
  console.log(erc721Attributes);
  if (tokenAddresses.L2) {
    return (
      <>
        <div className="mb-3 flex w-full justify-between">
          <TradeFilters />
        </div>
        <div className="flex w-full">
          {erc721Attributes.items.length ? (
            <AttributesDropdown
              address={tokenAddresses.L2}
              attributes={erc721Attributes}
            />
          ) : null}
          <div className="w-full">
            <AttributeTags />
            <Suspense
              fallback={
                <div className="mt-6 grid grid-cols-1 gap-4 sm:pl-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <TokenCardSkeleton key={index} />
                  ))}
                </div>
              }
            >
              <L2ERC721Table contractAddress={tokenAddresses.L2} />
            </Suspense>
          </div>
        </div>
      </>
    );
  }

  const tokensData = getToken({
    collection: tokenAddresses.L1,
    query: searchParams ?? {},
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
      </div>
    </>
  );
}
