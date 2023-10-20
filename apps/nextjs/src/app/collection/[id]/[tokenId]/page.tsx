import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import type { erc721Tokens } from "@/constants";
import { getCollections } from "@/lib/reservoir/getCollections";
import { getToken } from "@/lib/reservoir/getToken";
import type { Collection, Market, Token } from "@/types";
import type { RouterOutputs } from "@/utils/api";
import { api } from "@/utils/api";
import { getTokenContractAddresses, shortenHex } from "@/utils/utils";
import { ArrowLeft } from "lucide-react";
import { formatEther } from "viem";

import { L2Token } from "./L2Token";
import { LoadingSkeleton } from "./loading";
import { TokenAttributes } from "./TokenAttributes";
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

  let token: Token | null;
  let collection: Collection | null;
  let market: Market | null;
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
  token = tokens?.[0]?.token;
  market = tokens?.[0]?.market;
  collection = collections?.[0];

  //}
  return (
    <div className="container mx-auto flex h-full flex-wrap p-4 pt-16 sm:p-8">
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
      {tokenAddresses.L2 && (
        <Suspense fallback={<LoadingSkeleton />}>
          <L2Token
            contractAddress={tokenAddresses.L2}
            tokenId={params.tokenId}
          />
        </Suspense>
      )}
    </div>
  );
}
