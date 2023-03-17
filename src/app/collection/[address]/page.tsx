import { getData } from "@/functions";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: { address: string };
}) {
  const data = await getData({ id: params.address }, "collection");

  const response: any = await data.json();

  const collection_name = response.collections[0].name;

  // this could be loaded after data is loaded
  const tokens = await getData({ collection: params.address }, "token");

  const token_response: any = await tokens.json();

  console.log(token_response);

  return (
    <div className="p-8">
      {/* <h1>{collection_name}</h1>{" "}
      <div className="grid grid-cols-6 gap-4">
        {token_response.tokens.map((token: any, index: number) => {
          return (
            <div className="border p-6" key={index}>
              <h5>{token.token.name}</h5>
              <Link href={`/collection/${params.address}/${token.token.tokenId}`} >page</Link>
            </div>
          );
        })}
      </div> */}
    </div>
  );
}
