import type { erc721Tokens } from "@/constants";
import type { Collection, Market, Token } from "@/types";
import { Suspense } from "react";
import { getCollections } from "@/lib/reservoir/getCollections";
import { getToken } from "@/lib/reservoir/getToken";
import { api } from "@/trpc/server";
import { getTokenContractAddresses } from "@/utils/utils";
import { formatEther } from "viem";

import { L2Token } from "./L2Token";
import { LoadingSkeleton } from "./loading";
import { TokenContent } from "./TokenContent";
import { TokenInformation } from "./TokenInformation";

export default async function Page({
  params,
}: {
  params: { id: string; tokenId: string };
}) {
  const tokenAddresses = getTokenContractAddresses(
    params.id as keyof typeof erc721Tokens,
  );

  if (tokenAddresses.L2) {
    return (
      <Suspense fallback={<LoadingSkeleton />}>
        <L2TokenData
          contractAddress={tokenAddresses.L2}
          tokenId={params.tokenId}
          collectionId={params.id}
        />
      </Suspense>
    );
  } else if (tokenAddresses.L1) {
    return (
      <L1TokenData
        collectionId={params.id}
        contractAddress={tokenAddresses.L1}
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
  const token: Token | undefined = tokens?.[0]?.token;
  const market: Market | null = tokens?.[0]?.market;
  const collection: Collection | undefined = collections?.[0];

  if (!tokens) {
    return <div>Collection Not Found</div>;
  }

  return (
    <>
      {token && (
        <TokenInformation
          name={token.name}
          image={token.image}
          tokenId={parseInt(token.tokenId)}
          owner={token.owner}
          attributes={token.attributes}
          collection={collection}
          collectionId={collectionId}
        >
          {market?.floorAsk.price && (
            <h2>{formatEther(BigInt(market.floorAsk.price.amount.raw))} ETH</h2>
          )}
          <div>
            {collection && (
              <TokenContent collection={collection} token={token} />
            )}
          </div>
        </TokenInformation>
      )}
    </>
  );
};
