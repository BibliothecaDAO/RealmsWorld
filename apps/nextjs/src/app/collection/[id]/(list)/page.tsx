import type { Metadata } from "next";
import { Suspense } from "react";
import { erc721Tokens } from "@/constants";
import { getAttributes } from "@/lib/reservoir/getAttributes";
import { getToken } from "@/lib/reservoir/getToken";
import { api } from "@/trpc/server";
import { getTokenContractAddresses } from "@/utils/utils";

import { L1TokenTable } from "./L1TokenTable";
import L2ERC721Table from "./L2ERC721Table";
import { TradeLayout } from "./Trade";

//export const runtime = "edge";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const collection = erc721Tokens[params.id as keyof typeof erc721Tokens];
  return {
    title: `${collection?.name}`,
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
  const tokenAddresses = getTokenContractAddresses(
    params.id as keyof typeof erc721Tokens,
  );

  /* isSepoliaGoldenToken =
    NETWORK_NAME == "SEPOLIA" &&
    (tokenAddresses.L2 ?? params.id == "goldenToken");

  if (isSepoliaGoldenToken) {
    return <Mint contractId={params.id} />;
  }*/
  if (tokenAddresses.L2) {
    return <L2TokenData tokenAddress={tokenAddresses.L2} />;
  }
  if (tokenAddresses.L1) {
    return (
      <L1TokenData
        tokenAddress={tokenAddresses.L1}
        searchParams={searchParams}
      />
    );
  } else {
    return <div>Collection Not Found</div>;
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
  });

  const attributesData = getAttributes({
    collection: tokenAddress,
  });
  const [tokens, attributes] = await Promise.all([tokensData, attributesData]);

  if (!tokens) {
    return <div>Collection Not Found</div>;
  }
  return (
    <TradeLayout tokenAddress={tokenAddress} attributes={attributes.attributes}>
      <L1TokenTable address={tokenAddress} tokens={tokens.tokens} />
    </TradeLayout>
  );
};
