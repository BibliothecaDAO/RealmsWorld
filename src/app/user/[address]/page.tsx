import { getData } from "@/functions";
import { hexToNumber, shortenHex } from "@/functions/utils";
import { UserTokenData } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: { address: string };
}) {
  const data = await getData({ address: params.address }, "user");

  const id = hexToNumber(params.address, 1, 10);

  console.log(data.tokens[0].ownership);

  const tokens: UserTokenData[] = data.tokens;

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
        <div className="grid grid-cols-3 gap-3">
          {tokens.map((token: UserTokenData, index) => {
            console.log(token.token.image);
            return (
              <div
                key={index}
                className="duration-300 transform border rounded-xl border-white/10 hover:-translate-y-1"
              >
                {/* <Image
                src={token.token.image} // Use the path to your image
                alt="An example image" // Provide a descriptive alt text
                className="mx-auto rounded-t-xl"
                width={800} // Set the original width of the image
                height={800} // Set the original height of the image'fill')
              /> */}
                <div className="px-3 pt-4 pb-4">
                  <div className="text-sm truncate">#{token.token.tokenId}</div>
                  <h6>{token.token.name}</h6>

                  <h5>ETH</h5>
                  <div className="flex justify-between">
                    <Link
                      href={`/collection/${token.token.contract}/${token.token.tokenId}`}
                    >
                      More
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
