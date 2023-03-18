import { BuyButton } from "@/app/components/BuyModal";
import { getData } from "@/functions";
import { Market, Token } from "@/types";
import { formatEther } from "ethers/lib/utils.js";
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: { address: string; id: string };
}) {
  const data = await getData(
    { tokens: params.address + ":" + params.id },
    "token"
  );

  console.log(data);

  const token: Token = data.tokens[0].token;
  const market: Market = data.tokens[0].market;

  console.log(token);

  // const query: any = await data.json();

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
      </div>
    </div>
  );
}
