import type { erc721Tokens } from "@/constants";
import type { Collection, Market, Token } from "@/types";
import { Suspense } from "react";
import { getCollections } from "@/lib/reservoir/getCollections";
import { getToken } from "@/lib/reservoir/getToken";
import { getTokenContractAddresses } from "@/utils/utils";
import { formatEther } from "viem";

import { L2Token } from "./L2Token";
import { LoadingSkeleton } from "./loading";
import { TokenContent } from "./TokenContent";
import { TokenInformation } from "./TokenInformation";

export default async function Page({
  params,
}: {
  params: { id: string; tokenId: string };
}) {
  const tokenAddresses = getTokenContractAddresses(
    params.id as keyof typeof erc721Tokens,
  );
  const token_params = tokenAddresses.L1 + ":" + params.tokenId;

  if (tokenAddresses.L2) {
    return (
      <Suspense fallback={<LoadingSkeleton />}>
        <L2Token contractAddress={tokenAddresses.L2} tokenId={params.tokenId} />
      </Suspense>
    );
  }

  const tokensData = getToken({
    query: {
      tokens: token_params,
      includeAttributes: true,
      includeQuantity: true,
    },
  });
  const collectionData = getCollections([
    { contract: tokenAddresses.L1 ?? params.id },
  ]);

  const [{ tokens }, { collections }] = await Promise.all([
    tokensData,
    collectionData,
  ]);
  const token: Token | null = tokens?.[0]?.token;
  const market: Market | null = tokens?.[0]?.market;
  const collection: Collection | null = collections?.[0];

  //}
  return (
    <>
      {token && (
        <TokenInformation
          token={token}
          collection={collection}
          collectionId={params.id}
        >
          {market?.floorAsk.price && (
            <h2>{formatEther(BigInt(market.floorAsk.price.amount.raw))} ETH</h2>
          )}
          <div>
            {collection && (
              <TokenContent collection={collection} token={token} />
            )}
          </div>
        </TokenInformation>
      )}
    </>
  );
}
