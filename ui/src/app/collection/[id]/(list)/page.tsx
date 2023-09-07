import { Metadata } from "next";
import { Collection } from "@/types";

import { TokenTable } from "@/app/components/TokenTable";
import { TradeFilters } from "@/app/collection/TradeFilters";
import { AttributesDropdown } from "@/app/components/AttributesDropdown";
import { AttributeTags } from "@/app/collection/AttributeTags";
import { getCollections } from "@/app/lib/reservoir/getCollections";
import { getToken } from "@/app/lib/reservoir/getToken";
import { getAttributes } from "@/app/lib/reservoir/getAttributes";
import { isStarknetAddress } from "@/functions/utils";
import { erc721Tokens } from "@/constants";
import { getTokenContractAddresses } from "@/app/lib/utils";
import { getBuiltGraphSDK } from "@/.graphclient";
import { useQuery } from "@tanstack/react-query";
import { BeastCard } from "./BeastCard";
import { BeastsTable } from "./BeastTable";
import { NETWORK_NAME } from "@/constants/env";
import { ChainType } from "@/constants/tokens";

//import { SweepButton } from "@/app/components/SweepModal";

export async function generateMetadata({
  params,
}: {
  params: { address: string };
}): Promise<Metadata> {
  const collectionData = await getCollections([{ contract: params.address }]);
  const collection: Collection = collectionData.collections?.[0];

  return {
    title: `Collection: ${collection?.name}`,
    description: `Collection Details and Marketplace for ${collection?.name} - Created for adventurers by Bibliotheca DAO`,
  };
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: {
    page?: string;
  };
}) {
  const token = erc721Tokens[params.id as keyof typeof erc721Tokens];

  const tokenAddresses = getTokenContractAddresses(
    params.id as keyof typeof erc721Tokens
  );

  const tokensData = getToken({
    collection: tokenAddresses.L1,
    query: searchParams,
  });

  const attributesData = getAttributes({
    collection: tokenAddresses.L1,
  });
  const [tokens, attributes] = await Promise.all([tokensData, attributesData]);

  if (!tokens) {
    return <div>Collection Not Found</div>;
  }

  return (
    <div>
      <div className="flex justify-between w-full mb-3">
        <TradeFilters />
      </div>

      <div className="flex w-full">
        {tokenAddresses.L1 && (<>
        <AttributesDropdown
          address={tokenAddresses.L1}
          attributes={attributes}
        />
        {/*<SweepButton id={params.address} />*/}
        <div className="w-full">
          <AttributeTags />
          <TokenTable address={tokenAddresses.L1} tokens={tokens.tokens} />
        </div>
        </>)}
        {tokenAddresses.L2 && (<BeastsTable />)}

      </div>
    </div>
  );
}
