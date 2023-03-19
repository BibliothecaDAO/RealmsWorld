import { getData } from "@/functions";
import { CollectionContent } from "../CollectionContent";
import { CollectionAttributes } from "../CollectionAttributes";

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

  const tokens = await getData({ collection: params.address }, "token");

  return (
    <div className="flex h-full -mt-56 sm:p-8">
      {/* <CollectionAttributes
        address={params.address}
        collection={collection.collections[0]}
        attributes={attributes}
      /> */}
      <CollectionContent
        collection={collection.collections[0]}
        tokens={tokens.tokens}
        attributes={attributes}
      />
    </div>
  );
}
