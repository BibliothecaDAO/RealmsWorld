import { TokenCard } from "@/app/components/TokenCard";
import { TokenTable } from "@/app/components/TokenTable";
import { getData } from "@/functions";
import { hexToNumber, shortenHex } from "@/functions/utils";
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: { address: string };
}) {
  const tokens = await getData({ address: params.address }, "user");

  const id = hexToNumber(params.address, 1, 10);

  console.log(tokens.tokens[0].token);
  return (
    <div className="flex h-full p-8 -mt-64">
      <div className="flex-none w-1/3 p-4 rounded-t-2xl bg-gradient-to-b from-theme-gray-light">
        <Image
          src={`/users/${id}.png`} // Use the path to your image
          alt="An example image" // Provide a descriptive alt text
          width={2000} // Set the original width of the image
          height={2000} // Set the original height of the image'fill')
          className="mx-auto rounded"
        />
      </div>
      <div className="flex-grow p-8">
        <h1>{shortenHex(params.address)}</h1> <hr />
      </div>
    </div>
  );
}
