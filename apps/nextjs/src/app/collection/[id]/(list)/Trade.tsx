import type { getAttributes } from "@/lib/reservoir/getAttributes";
import { Suspense } from "react";
import { AttributesDropdown } from "@/app/collection/[id]/(list)/AttributesDropdown";
import { AttributeTags } from "@/app/collection/[id]/(list)/AttributeTags";
import { TradeFilters } from "@/app/collection/[id]/(list)/TradeFilters";
import { TokenCardSkeleton } from "@/app/collection/TokenCardSkeleton";

import type { RouterOutputs } from "@realms-world/api";

export const TradeLayout = ({
  tokenAddress,
  attributes,
  children,
  attributesPromise,
}: {
  tokenAddress: string;
  attributes?: Awaited<ReturnType<typeof getAttributes>>["attributes"];
  children: React.ReactNode;
  attributesPromise?: Promise<RouterOutputs["erc721Attributes"]["all"]>;
}) => {
  return (
    <>
      <div className="mb-3 flex w-full justify-between">
        <TradeFilters />
      </div>

      <div className="flex w-full">
        {tokenAddress && (
          <>
            {attributes && (
              <AttributesDropdown
                address={tokenAddress}
                attributes={attributes}
              />
            )}
            {attributesPromise && (
              <AttributesDropdown
                address={tokenAddress}
                attributesPromise={attributesPromise}
              />
            )}
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
