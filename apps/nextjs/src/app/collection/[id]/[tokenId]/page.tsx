import Image from "next/image";
import Link from "next/link";
import type { erc721Tokens } from "@/constants";
import { getCollections } from "@/lib/reservoir/getCollections";
import { getToken } from "@/lib/reservoir/getToken";
import type { Collection, Market, Token } from "@/types";
import { getTokenContractAddresses, shortenHex } from "@/utils/utils";
import { ArrowLeft } from "lucide-react";
import { formatEther } from "viem";

import { TokenAttributes } from "./TokenAttributes";
import { TokenContent } from "./TokenContent";

export default async function Page({
  params,
}: {
  params: { id: string; tokenId: string };
}) {
  const tokenAddresses = getTokenContractAddresses(
    params.id as keyof typeof erc721Tokens,
  );
  const token_params = tokenAddresses.L1 + ":" + params.tokenId;

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
  const token: Token = tokens?.[0]?.token;
  const market: Market = tokens?.[0]?.market;
  const collection: Collection = collections?.[0];

  //}
  return (
    <div className="container mx-auto flex h-full flex-wrap p-4 pt-16 sm:p-8">
      {token && (
        <>
          <div className="w-full flex-none rounded-t p-2 md:w-1/2">
            <Image
              src={token.image}
              alt={token.name}
              width={2000}
              height={2000}
              className="mx-auto border"
            />
            <div className="my-2 flex flex-wrap">
              <TokenAttributes token={token} collection={collection} />
            </div>
          </div>
          <div className="w-auto p-4 md:w-1/2 md:p-8">
            <Link
              className="flex opacity-70 hover:opacity-100"
              href={`/collection/${params.id}`}
            >
              <ArrowLeft className="mr-2 w-4 self-center" />{" "}
              {token.collection.name}
            </Link>

            <h1>
              {token.name}
              {token.collection.name == "Realms" && (
                <span>#{token.tokenId}</span>
              )}
            </h1>
            <div className="flex space-x-4">
              <div>owner </div>
              <Link href={`/user/${token.owner}`}>
                {shortenHex(token.owner)}
              </Link>
            </div>
            {market.floorAsk.price && (
              <h2>
                {formatEther(BigInt(market.floorAsk.price.amount.raw))} ETH
              </h2>
            )}
            <div>
              <TokenContent collection={collection} token={token} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
