import { ActivityCard } from "@/app/components/ActivityCard";
import { BuyButton } from "@/app/components/BuyModal";
import { getData } from "@/functions";
import { Activity, Attributes, Market, Token } from "@/types";
import { formatEther } from "ethers/lib/utils.js";
import Image from "next/image";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: { address: string; id: string };
}) {
  const token_params = params.address + ":" + params.id;

  const data = await getData(
    { tokens: token_params, includeAttributes: true, includeQuantity: true },
    "token"
  );

  const token_activity = await getData(
    { token: token_params },
    "tokenActivity"
  );

  const token: Token = data.tokens[0].token;
  const market: Market = data.tokens[0].market;
  const activity: Activity[] = token_activity.activities;

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
                  {attributes.key}: {attributes.value} [{attributes.tokenCount}]
                  <div className="mt-4 text-xs">
                    Floor {attributes.floorAskPrice}ETH
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex-grow p-8">
        <h6>#{token.tokenId}</h6>
        <h1>{token.name}</h1> <hr />
        {market.floorAsk.price && (
          <h2>{formatEther(market.floorAsk.price.amount.raw)} ETH</h2>
        )}
        <BuyButton address={token.contract} id={token.tokenId} />
        <div className="grid grid-cols-1">
          {activity.map((activity: Activity, index: number) => {
            return <ActivityCard key={index} activity={activity} />;
          })}
        </div>
      </div>
    </div>
  );
}
