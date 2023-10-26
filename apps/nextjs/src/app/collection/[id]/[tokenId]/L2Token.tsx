"use client";

import { api } from "@/utils/api";
import { findTokenName } from "@/utils/utils";

import { LoadingSkeleton } from "./loading";
import { TokenInformation } from "./TokenInformation";

//import { SweepModal } from '@reservoir0x/reservoir-kit-ui'

export const L2Token = ({
  contractAddress,
  tokenId,
  children,
}: {
  contractAddress: string;
  children?: React.ReactNode;
  tokenId: string;
}) => {
  const [erc721Tokens, { isLoading }] = api.erc721Tokens.byId.useSuspenseQuery({
    id: contractAddress + ":" + tokenId,
  });

  return (
    <>
      {erc721Tokens ? (
        <TokenInformation
          token={erc721Tokens}
          collectionId={findTokenName(contractAddress)}
          collection={null}
        />
      ) : (
        "No Token Found"
      )}
      {isLoading && <LoadingSkeleton />}
    </>
  );
};
