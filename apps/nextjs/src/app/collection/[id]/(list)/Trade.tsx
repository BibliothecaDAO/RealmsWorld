import type { erc721Tokens } from "@/constants/erc721Tokens";
import { Suspense } from "react";
import { AttributesDropdown } from "@/app/collection/AttributesDropdown";
import { AttributeTags } from "@/app/collection/AttributeTags";
import { TokenCardSkeleton } from "@/app/collection/TokenCardSkeleton";
//import { TokenTable } from "@/app/collection/TokenTable";
import { TradeFilters } from "@/app/collection/TradeFilters";

export async function Trade({
  contractId,
  searchParams,
}: {
  contractId: keyof typeof erc721Tokens;
  searchParams?: {
    page?: string;
  };
}) {
  /*if (tokenAddresses.L2) {
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
  }*/

  return (
    <>
      {/*} <TokenTable
                  address={tokenAddresses.L1}
                  tokens={tokens.tokens}
  />*/}
    </>
  );
}

export const TradeLayout = ({
  tokenAddress,
  attributes,
  children,
}: {
  tokenAddress: string;
  attributes: any;
  children: React.ReactNode;
}) => {
  return (
    <>
      <div className="mb-3 flex w-full justify-between">
        <TradeFilters />
      </div>

      <div className="flex w-full">
        {tokenAddress && (
          <>
            <AttributesDropdown
              address={tokenAddress}
              attributes={attributes}
            />
            {/*<SweepButton id={params.address} />*/}
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
                {children}
              </Suspense>
            </div>
          </>
        )}
      </div>
    </>
  );
};
