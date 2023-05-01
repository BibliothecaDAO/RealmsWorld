import { getData } from "@/functions";
import { CollectionContent } from "../CollectionContent";
import { Metadata } from "next";
import { Collection } from "@/types";
import { convertToJSON, decodeAndSplit } from "@/functions/utils";

export async function generateMetadata({
  params,
}: {
  params: { address: string };
}): Promise<Metadata> {
  const collection_data = await getData({ id: params.address }, "collection");
  const collection: Collection = collection_data.collections[0];

  return {
    title: `Atlas - Collection: ${collection.name}`,
    description: `Collection Details and Marketplace for ${collection.name} - Created for adventurers by Bibliotheca DAO`,
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { address: string };
  searchParams?: {
    page?: string;
  };
}) {
  /*const paramsArray = decodeAndSplit(searchParams?.toString());
  const jsonObject = convertToJSON(paramsArray);*/

  const collection = await getData({ id: params.address }, "collection");

  const attributes = await getData(
    { collection: params.address },
    "attributes"
  );
  const tokens = await getData(
    { collection: params.address, ...searchParams },
    "token"
  );

  return (
    <div className="flex h-full -mt-56">
      <CollectionContent
        collection={collection.collections[0]}
        tokens={tokens.tokens}
        attributes={attributes}
      />
    </div>
  );
}
