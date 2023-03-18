import { getData } from "@/functions";
import Link from "next/link";
import { TokenTable } from "../../components/TokenTable";
import { Attributes } from "../../components/Attributes";
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: { address: string };
}) {
  const collection = await getData({ id: params.address }, "collection");

  const attributes = await getData(
    { collection: params.address },
    "attributes"
  );

  return (
    <div className="flex h-full p-8 -mt-64">
      <div className="flex-none w-64 pt-8 rounded-t-full bg-gradient-to-b from-theme-gray-light">
        <Image
          src={collection.collections[0].image} // Use the path to your image
          alt="An example image" // Provide a descriptive alt text
          width={200} // Set the original width of the image
          height={200} // Set the original height of the image'fill')
          className="mx-auto border rounded-full"
        />
        <Attributes address={params.address} attributes={attributes} />
      </div>
      <div className="flex-grow p-8">
        <h1>{collection.collections[0].name}</h1>{" "}
        <TokenTable
          address={params.address}
          collection={collection.collections[0]}
        />
      </div>
    </div>
  );
}
