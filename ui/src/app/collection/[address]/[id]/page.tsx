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

export default async function Page({
  params,
}: {
  params: { address: string; id: string };
}) {
  const token_params = params.address + ":" + params.id;

  const tokensData = getToken({
    query: {
      tokens: token_params,
      includeAttributes: true,
      includeQuantity: true,
    },
  });
  const collectionData = getCollections([{ contract: params.address }]);

  const [{ tokens }, { collections }] = await Promise.all([
    tokensData,
    collectionData,
  ]);

  const token: Token = tokens[0].token;
  const market: Market = tokens[0].market;
  const collection: Collection = collections[0];

  return (
    <div className="ml-16 flex flex-wrap h-full p-4 sm:p-8">
      <div className="flex-none w-full p-2 rounded-t md:w-1/3 bg-gradient-to-b from-theme-gray-light">
        <Image
          src={token.image}
          alt={token.name}
          width={2000}
          height={2000}
          className="mx-auto border-4 rounded border-white/10"
        />
        <div className="flex flex-wrap">
          <TokenAttributes token={token} collection={collection} />
        </div>
      </div>
      <div className="w-auto p-4 md:p-8 md:w-2/3">
        <Link
          className="flex opacity-70 hover:opacity-100"
          href={`/collection/${token.collection.id}`}
        >
          <ArrowLeft className="self-center w-4 mr-2" /> {token.collection.name}
        </Link>

        <h1>
          {token.name}
          {token.collection.name == "Realms" && <span>#{token.tokenId}</span>}
        </h1>
        <div className="flex space-x-4">
          <div>owner </div>
          <Link href={`/user/${token.owner}`}>{shortenHex(token.owner)}</Link>
        </div>
        {market.floorAsk.price && (
          <h2>{formatEther(BigInt(market.floorAsk.price.amount.raw))} ETH</h2>
        )}
        <div>
          <TokenContent collection={collection} token={token} />
        </div>
      </div>
    </div>
  );
}
