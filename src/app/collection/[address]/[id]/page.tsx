import { BuyButton } from "@/app/components/BuyModal";
import { getData } from "@/functions";
import { Activity, Attributes, Collection, Market, Token } from "@/types";
import { formatEther } from "ethers/lib/utils.js";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { shortenHex } from "@/functions/utils";
import { TokenContent } from "./TokenContent";
import { ListingModal } from "@/app/components/ListingModal";
import { TokenAttributes } from "./TokenAttributes";
import { Metadata } from "next";
import { getCollections } from "@/app/lib/reservoir/getCollections";

export default async function Page({
  params,
}: {
  params: { address: string; id: string };
}) {
  const token_params = params.address + ":" + params.id;

  const data = await getData(
    {
      tokens: token_params,
      includeAttributes: true,
      includeQuantity: true,
    },
    "token"
  );

  const collectionData = await getCollections([{ contract: params.address }]);

  const token: Token = data.tokens[0].token;
  const market: Market = data.tokens[0].market;
  const collection: Collection = collectionData.collections[0];

  return (
    <div className="flex flex-wrap h-full p-4 sm:p-8">
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
          {token.name}{" "}
          {token.collection.name == "Realms" && <span>#{token.tokenId}</span>}
        </h1>
        <div className="flex space-x-4">
          <div>owner </div>
          <Link href={`/user/${token.owner}`}>
            {shortenHex(token.owner)}
          </Link>{" "}
        </div>
        {market.floorAsk.price && (
          <h2>{formatEther(market.floorAsk.price.amount.raw)} ETH</h2>
        )}
        <div>
          <TokenContent collection={collection} token={token} />
        </div>
      </div>
    </div>
  );
}
