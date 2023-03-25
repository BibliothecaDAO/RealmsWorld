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

  const collection_data = await getData({ id: params.address }, "collection");

  const token: Token = data.tokens[0].token;
  const market: Market = data.tokens[0].market;
  const collection: Collection = collection_data.collections[0];

  return (
    <div className="flex flex-wrap h-full p-4 -mt-64 sm:p-8">
      <div className="flex-none w-full p-2 rounded-t sm:w-1/3 bg-gradient-to-b from-theme-gray-light">
        <Image
          src={token.image} // Use the path to your image
          alt="An example image" // Provide a descriptive alt text
          width={2000} // Set the original width of the image
          height={2000} // Set the original height of the image'fill')
          className="mx-auto border-4 rounded border-white/10"
        />
        <div className="flex flex-wrap">
          {token.attributes.map((attributes: Attributes, index) => {
            return (
              <Link
                href={`/collection/${token.contract}?${attributes.key}=${attributes.value}`}
                key={index}
                className="w-1/2 p-1"
              >
                <div className="p-4 rounded bg-black/50 hover:bg-black/60">
                  <div className="w-full uppercase size-xs opacity-70">
                    {attributes.key}
                  </div>
                  <div className="flex justify-between w-full">
                    <div className="text-lg font-sans-serif">
                      {attributes.value}
                    </div>
                    <div className="ml-3">{attributes.floorAskPrice}</div>
                  </div>
                  <div className="w-full opacity-70">
                    {attributes.tokenCount} (
                    {(
                      (attributes.tokenCount /
                        parseInt(collection.tokenCount)) *
                      100
                    ).toFixed(2)}
                    %)
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex-grow p-8">
        <Link
          className="flex opacity-70 hover:opacity-100"
          href={`/collection/${token.collection.id}`}
        >
          <ArrowLeft className="self-center w-4 mr-2" /> {token.collection.name}
        </Link>

        <h1>
          {token.name} #{token.tokenId}
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

        <TokenContent collection={collection} token={token} />
      </div>
    </div>
  );
}
