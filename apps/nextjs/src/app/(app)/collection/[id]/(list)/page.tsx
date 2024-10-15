import type { Metadata } from "next";
import { Suspense } from "react";
import { SUPPORTED_L1_CHAIN_ID, SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import { getAttributes } from "@/lib/reservoir/getAttributes";
import { getToken } from "@/lib/reservoir/getToken";
import { api } from "@/trpc/server";

import type { Collections } from "@realms-world/constants";
import {
  CollectionDetails,
  getCollectionAddresses,
} from "@realms-world/constants";

import { L1ERC721Table } from "./L1ERC721Table";
import L2ERC721Table from "./L2ERC721Table";
import { TradeLayout } from "./Trade";
import CollectionFilters from "./CollectionFilters";

//export const runtime = "edge";

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const collection = CollectionDetails[params.id as Collections];
  return {
    title: `${collection.displayName}`,
    description: `Collection Details and Marketplace for ${collection.displayName} - Created for Adventurers by Bibliotheca DAO`,
    openGraph: {
      images: `https://realms.world/collections/${params.id}.png`,
    },
    twitter: {
      images: [`https://realms.world/collections/${params.id}.png`], // Must be an absolute URL
    },
  };
}

export default function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: {
    page?: string;
  };
}) {
  const tokenAddresses = getCollectionAddresses(params.id);

  const l2TokenAddress = tokenAddresses?.[SUPPORTED_L2_CHAIN_ID];
  if (!l2TokenAddress) {
    return <div>Collection Not Found</div>;
  }
  /* isSepoliaGoldenToken =
    NETWORK_NAME == "SEPOLIA" &&
    (tokenAddresses.L2 ?? params.id == "goldenToken");

  if (isSepoliaGoldenToken) {
    return <Mint contractId={params.id} />;
  }*/
  /* if (tokenAddresses[SUPPORTED_L2_CHAIN_ID]) {
    const l2TokenAddress = tokenAddresses[SUPPORTED_L2_CHAIN_ID];
    if (typeof l2TokenAddress === "string") {
      return <L2TokenData tokenAddress={l2TokenAddress} />;
    }
  }
  if (tokenAddresses[SUPPORTED_L1_CHAIN_ID]) {
    const l1TokenAddress = tokenAddresses[SUPPORTED_L1_CHAIN_ID];
    if (typeof l1TokenAddress === "string") {
      return (
        <L1TokenData
          tokenAddress={l1TokenAddress}
          searchParams={searchParams}
        />
      );
    }
  }*/

  return (
    <div className="flex">
      <L2ERC721Table contractAddress={l2TokenAddress} />
    </div>
  );
}

const L2TokenData = ({ tokenAddress }: { tokenAddress: string }) => {
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
  });

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
    <Suspense>
      <TradeLayout tokenAddress={tokenAddress} attributes={attributes}>
        <L1ERC721Table address={tokenAddress} tokens={tokens} />
      </TradeLayout>
    </Suspense>
  );
};
