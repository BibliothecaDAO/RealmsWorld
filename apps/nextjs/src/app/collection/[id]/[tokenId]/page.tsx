import type { Metadata } from "next";
import { Suspense } from "react";
import { SUPPORTED_L1_CHAIN_ID, SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import { getCollections } from "@/lib/reservoir/getCollections";
import { getToken } from "@/lib/reservoir/getToken";
import { api } from "@/trpc/server";
import { formatEther } from "viem";

import type { Collections } from "@realms-world/constants";
import {
  CollectionDetails,
  getCollectionAddresses,
} from "@realms-world/constants";

import { L2Token } from "./L2Token";
import { LoadingSkeleton } from "./loading";
import { TokenContent } from "./TokenContent";
import { TokenInformation } from "./TokenInformation";

export function generateMetadata({
  params: { tokenId, id },
}: {
  params: { id: string; tokenId: string };
}): Metadata {
  const collection = CollectionDetails[id as Collections].displayName;
  return {
    title: `${collection} #${tokenId}`,
    description: `Collection Details and Marketplace for ${collection} - Created for adventurers by Bibliotheca DAO`,
    openGraph: {
      images: `https://realms.world/collections/${collection.toLowerCase()}.png`,
    },
    twitter: {
      images: [`https://realms.world/collections/${collection}.png`], // Must be an absolute URL
    },
  };
}

export default function Page({
  params,
}: {
  params: { id: string; tokenId: string };
}) {
  const tokenAddresses = getCollectionAddresses(params.id);
  if (!tokenAddresses) {
    return <div>Collection Not Found</div>;
  }
  if (tokenAddresses[SUPPORTED_L2_CHAIN_ID]) {
    return (
      <Suspense fallback={<LoadingSkeleton />}>
        <L2TokenData
          contractAddress={tokenAddresses[SUPPORTED_L2_CHAIN_ID] ?? ""}
          tokenId={params.tokenId}
          collectionId={params.id}
        />
      </Suspense>
    );
  } else if (tokenAddresses[SUPPORTED_L1_CHAIN_ID]) {
    return (
      <L1TokenData
        collectionId={params.id}
        contractAddress={tokenAddresses[SUPPORTED_L1_CHAIN_ID] ?? ""}
        tokenId={params.tokenId}
      />
    );
  }

  return <>Collection Not Supported</>;
}
const L2TokenData = async ({
  contractAddress,
  tokenId,
  collectionId,
}: {
  contractAddress: string;
  tokenId: string;
  collectionId: string;
}) => {
  const erc721Token = await api.erc721Tokens.byId({
    id: contractAddress + ":" + tokenId,
  });
  console.log(erc721Token);

  return (
    <>
      {erc721Token && (
        <TokenInformation
          name={erc721Token.name}
          image={erc721Token.image}
          tokenId={erc721Token.token_id}
          owner={erc721Token.owner}
          attributes={erc721Token.attributes}
          //collection={erc721Token}
          collectionId={collectionId}
        >
          <L2Token
            contractAddress={contractAddress}
            tokenId={tokenId}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            token={JSON.parse(JSON.stringify(erc721Token))}
          />
        </TokenInformation>
      )}
    </>
  );
};

const L1TokenData = async ({
  contractAddress,
  tokenId,
  collectionId,
}: {
  contractAddress: string;
  tokenId: string;
  collectionId: string;
}) => {
  const token_params = contractAddress + ":" + tokenId;

  const tokensData = getToken({
    query: {
      tokens: token_params,
      includeAttributes: true,
      includeQuantity: true,
    },
  });
  const collectionData = getCollections([{ contract: contractAddress }]);
  const [{ tokens }, { collections }] = await Promise.all([
    tokensData,
    collectionData,
  ]);
  const token = tokens?.[0]?.token;
  const market = tokens?.[0]?.market;
  const collection = collections?.[0];

  return (
    <>
      {token && (
        <TokenInformation
          name={token.name}
          image={token.image}
          tokenId={parseInt(token.tokenId, 10)}
          owner={token.owner}
          attributes={token.attributes?.map((attr) => ({
            key: attr.key ?? "",
            value: attr.value,
            collectionId: collectionId,
            token_key: token.tokenId,
            attributeId: parseInt(attr.key ?? "0"),
          }))}
          collection={collection}
          collectionId={collectionId}
        >
          {market?.floorAsk?.price && (
            <h2>
              {formatEther(BigInt(market.floorAsk.price.amount?.raw ?? 0))} ETH
            </h2>
          )}
          <div>
            {collection && tokens[0]?.token && (
              <TokenContent collection={collection} token={token} />
            )}
          </div>
        </TokenInformation>
      )}
    </>
  );
};
