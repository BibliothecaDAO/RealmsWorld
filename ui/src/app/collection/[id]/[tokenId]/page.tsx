import { Collection, Market, Token } from "@/types";
import { formatEther } from "viem";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { shortenHex } from "@/functions/utils";
import { TokenContent } from "./TokenContent";
import { TokenAttributes } from "./TokenAttributes";
import { getCollections } from "@/app/lib/reservoir/getCollections";
import { getToken } from "@/app/lib/reservoir/getToken";
import { getTokenContractAddresses } from "@/app/lib/utils";
import { erc721Tokens } from "@/constants";

export default async function Page({
  params,
}: {
  params: { id: string; tokenId: string };
}) {
  console.log(params);
  const tokenAddresses = getTokenContractAddresses(
    params.id as keyof typeof erc721Tokens
  );
  console.log(tokenAddresses);
  //if (tokenAddresses.L1) {
  const token_params = tokenAddresses.L1 + ":" + params.tokenId;

  const tokensData = getToken({
    query: {
      tokens: token_params,
      includeAttributes: true,
      includeQuantity: true,
    },
  });
  const collectionData = getCollections([{ contract: tokenAddresses.L1 }]);

  const [{ tokens }, { collections }] = await Promise.all([
    tokensData,
    collectionData,
  ]);
  console.log(tokens)
  const token: Token = tokens?.[0]?.token;
  const market: Market = tokens?.[0]?.market;
  const collection: Collection = collections?.[0];

  //}
  return (
    <div className="flex flex-wrap h-full p-4 sm:p-8 container mx-auto">
      {token && (
        <>
          <div className="flex-none w-full p-2 rounded-t md:w-1/2">
            <Image
              src={token.image}
              alt={token.name}
              width={2000}
              height={2000}
              className="mx-auto border"
            />
            <div className="flex flex-wrap my-2">
              <TokenAttributes token={token} collection={collection} />
            </div>
          </div>
          <div className="w-auto p-4 md:p-8 md:w-1/2">
            <Link
              className="flex opacity-70 hover:opacity-100"
              href={`/collection/${token.collection.id}`}
            >
              <ArrowLeft className="self-center w-4 mr-2" />{" "}
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
