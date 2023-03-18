import { getData } from "@/functions";
import { Attributes } from "../../components/Attributes";
import Image from "next/image";
import { CollectionContent } from "../CollectionContent";

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
    <div className="flex h-full p-8 -mt-56">
      <div className="flex-none w-64 pt-8 rounded-t-full shadow bg-gradient-to-b from-theme-gray-light/50 shadow-white/20">
        <Image
          src={collection.collections[0].image} // Use the path to your image
          alt="An example image" // Provide a descriptive alt text
          width={200} // Set the original width of the image
          height={200} // Set the original height of the image'fill')
          className="mx-auto border rounded-full"
        />
        <Attributes address={params.address} attributes={attributes} />
      </div>
      <CollectionContent collection={collection.collections[0]}/>
    </div>
  );
}
