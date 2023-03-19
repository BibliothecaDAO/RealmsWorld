import { ActivityCard } from "@/app/components/ActivityCard";
import { BuyButton } from "@/app/components/BuyModal";
import { getData } from "@/functions";
import { Activity, Market, Token } from "@/types";
import { formatEther } from "ethers/lib/utils.js";
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: { address: string; id: string };
}) {
  const token_params = params.address + ":" + params.id;

  const data = await getData({ tokens: token_params }, "token");

  const token_activity = await getData(
    { token: token_params },
    "tokenActivity"
  );

  const token: Token = data.tokens[0].token;
  const market: Market = data.tokens[0].market;
  const activity: Activity[] = token_activity.activities;
  
  return (
    <div className="flex h-full p-8 -mt-64">
      <div className="flex-none w-1/3 p-4 rounded-t-2xl bg-gradient-to-b from-theme-gray-light">
        <Image
          src={token.image} // Use the path to your image
          alt="An example image" // Provide a descriptive alt text
          width={2000} // Set the original width of the image
          height={2000} // Set the original height of the image'fill')
          className="mx-auto border"
        />
      </div>
      <div className="flex-grow p-8">
        <h6>#{token.tokenId}</h6>
        <h1>{token.name}</h1> <hr />
        {market.floorAsk.price && (
          <h2>{formatEther(market.floorAsk.price.amount.raw)} ETH</h2>
        )}
        <BuyButton address={token.contract} id={token.tokenId} />
        <hr />
        <div className="grid grid-cols-1">
          {activity.map((activity: Activity, index: number) => {
            return <ActivityCard key={index} activity={activity} />;
          })}
        </div>
      </div>
    </div>
  );
}
