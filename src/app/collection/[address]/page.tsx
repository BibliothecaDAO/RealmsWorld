import { getData } from "@/functions";
import { Metadata } from "next";
import { Collection } from "@/types";

import { TokenTable } from "@/app/components/TokenTable";
import { Button } from "@/app/components/ui/button";
import { TradeFilters } from "../TradeFilters";
import { AttributesDropdown } from "@/app/components/AttributesDropdown";
import { AttributeTags } from "../AttributeTags";
import { getCollections } from "@/app/lib/getCollections";
import { getToken } from "@/app/lib/getToken";
import { getAttributes } from "@/app/lib/getAttributes";

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
  const tokensData = getToken({
    collection: params.address,
    query: searchParams,
  });

  const attributesData = getAttributes({
    collection: params.address,
  });
  const [tokens, attributes] = await Promise.all([tokensData, attributesData]);
  return (
    <div>
      <div className="flex justify-between w-full mb-3">
        <TradeFilters />
      </div>

      <div className="flex w-full">
        <AttributesDropdown address={params.address} attributes={attributes} />
        <div className="w-full">
          <AttributeTags />
          <TokenTable address={params.address} tokens={tokens.tokens} />
        </div>
      </div>
    </div>
  );
}
