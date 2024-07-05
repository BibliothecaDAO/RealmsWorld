import type { Metadata } from "next";
import { Suspense } from "react";
import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";

import { api } from "@/trpc/server";

import type { Collections } from "@realms-world/constants";
import {
  CollectionDetails,
  getCollectionAddresses,
} from "@realms-world/constants";

import L2ERC721Table from "./L2ERC721Table";
import { TradeLayout } from "./Trade";

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
    const l2TokenAddress = tokenAddresses[SUPPORTED_L2_CHAIN_ID];
    if (typeof l2TokenAddress === "string") {
      return <L2TokenData tokenAddress={l2TokenAddress} />;
    }
  }
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

