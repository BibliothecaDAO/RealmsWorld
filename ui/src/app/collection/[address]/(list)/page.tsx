import { Metadata } from "next";
import { Collection } from "@/types";

import { TokenTable } from "@/app/components/TokenTable";
import { TradeFilters } from "@/app/collection/TradeFilters";
import { AttributesDropdown } from "@/app/components/AttributesDropdown";
import { AttributeTags } from "@/app/collection/AttributeTags";
import { getCollections } from "@/app/lib/reservoir/getCollections";
import { getToken } from "@/app/lib/reservoir/getToken";
import { getAttributes } from "@/app/lib/reservoir/getAttributes";
//import { SweepButton } from "@/app/components/SweepModal";

export async function generateMetadata({
  params,
}: {
  params: { address: string };
}): Promise<Metadata> {
  const collectionData = await getCollections([{ contract: params.address }]);
  const collection: Collection = collectionData.collections[0];

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
        {/*<SweepButton id={params.address} />*/}
        <div className="w-full">
          <AttributeTags />
          <TokenTable address={params.address} tokens={tokens.tokens} />
        </div>
      </div>
    </div>
  );
}
