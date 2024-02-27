import type { TokenMarketData } from "@/types";
import type { Metadata } from "next";
import { Suspense } from "react";
import { SUPPORTED_L1_CHAIN_ID, SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import { getAttributes } from "@/lib/reservoir/getAttributes";
import { getToken } from "@/lib/reservoir/getToken";
import { api } from "@/trpc/server";

import type { Collections } from "@realms-world/constants";
import {
  CollectionDisplayName,
  getCollectionAddresses,
} from "@realms-world/constants";

import { L1TokenTable } from "./L1TokenTable";
import L2ERC721Table from "./L2ERC721Table";
import { TradeLayout } from "./Trade";

//export const runtime = "edge";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const collection = CollectionDisplayName[params.id as Collections];
  return {
    title: `${collection}`,
    description: `Collection Details and Marketplace for ${collection} - Created for Adventurers by Bibliotheca DAO`,
    openGraph: {
      images: `https://realms.world/collections/${collection}.png`,
    },
    twitter: {
      images: [`https://realms.world/collections/${collection}.png`], // Must be an absolute URL
    },
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
  const tokenAddresses = getCollectionAddresses(params.id);

  if (!tokenAddresses) {
    return <div>Collection Not Found</div>;
  }
  /* isSepoliaGoldenToken =
    NETWORK_NAME == "SEPOLIA" &&
    (tokenAddresses.L2 ?? params.id == "goldenToken");

  if (isSepoliaGoldenToken) {
    return <Mint contractId={params.id} />;
  }*/
  if (tokenAddresses[SUPPORTED_L2_CHAIN_ID]) {
    return (
      <L2TokenData tokenAddress={tokenAddresses[SUPPORTED_L2_CHAIN_ID]!} />
    );
  }
  if (tokenAddresses[SUPPORTED_L1_CHAIN_ID]) {
    return (
      <L1TokenData
        tokenAddress={tokenAddresses[SUPPORTED_L1_CHAIN_ID]!}
        searchParams={searchParams}
      />
    );
  }
}

const L2TokenData = async ({ tokenAddress }: { tokenAddress: string }) => {
  const erc721Attributes = api.erc721Attributes.all({
    contractAddress: tokenAddress,
  });

  return (
    <Suspense>
      <TradeLayout
        tokenAddress={tokenAddress}
        attributesPromise={erc721Attributes}
      >
        <L2ERC721Table contractAddress={tokenAddress} />
      </TradeLayout>
    </Suspense>
  );
};

const L1TokenData = async ({
  tokenAddress,
  searchParams,
}: {
  tokenAddress: string;
  searchParams?: {
    page?: string;
  };
}) => {
  const tokensData = getToken({
    collection: tokenAddress,
    query: searchParams ?? {},
  }) as Promise<{ tokens: TokenMarketData[] }>;

  const attributesData = getAttributes({
    collection: tokenAddress,
  });
  const [{ tokens }, { attributes }] = await Promise.all([
    tokensData,
    attributesData,
  ]);

  if (!tokens) {
    return <div>Collection Not Found</div>;
  }
  return (
    <TradeLayout tokenAddress={tokenAddress} attributes={attributes}>
      <L1TokenTable address={tokenAddress} tokens={tokens} />
    </TradeLayout>
  );
};
