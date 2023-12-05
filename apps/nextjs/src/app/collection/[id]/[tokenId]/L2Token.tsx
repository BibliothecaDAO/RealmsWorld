"use client";

import { api } from "@/utils/api";
import { findTokenName } from "@/utils/utils";

import TokenOwnerActions from "../../marketplace/TokenOwnerActions";
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

  if (!erc721Tokens) {
    return <div>Token Information Loading</div>;
  }

  const collectionId = findTokenName(contractAddress);

  return (
    <>
      {erc721Tokens ? (
        <>
          <TokenInformation
            token={erc721Tokens}
            collectionId={collectionId}
            collection={null}
          >
            <TokenOwnerActions
              tokenId={tokenId}
              contractAddress={contractAddress}
            />
            {collectionId == "beasts" &&
              erc721Tokens.metadata?.attributes?.length && (
                <div className="bg-dark-green mt-4 rounded border">
                  <div className="flex items-center justify-between border-b px-3 py-2 pr-6">
                    <h5>Type:</h5>
                    <span className="text-xl">
                      {
                        erc721Tokens.metadata?.attributes.find(
                          (trait) => trait.trait_type === "type",
                        )?.value
                      }
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b px-3 py-2 pr-6">
                    <h5>Tier: </h5>
                    <span className="text-xl">
                      {
                        erc721Tokens.metadata?.attributes.find(
                          (trait) => trait.trait_type === "tier",
                        )?.value
                      }
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b px-3 py-2 pr-6">
                    <h5>Level: </h5>
                    <span className="text-xl">
                      {
                        erc721Tokens.metadata?.attributes.find(
                          (trait) => trait.trait_type === "level",
                        )?.value
                      }
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b px-3 py-2 pr-6">
                    <h5>Health: </h5>
                    <span className="text-xl">
                      {
                        erc721Tokens.metadata?.attributes.find(
                          (trait) => trait.trait_type === "health",
                        )?.value
                      }
                    </span>
                  </div>
                </div>
              )}
          </TokenInformation>
        </>
      ) : (
        "No Token Found"
      )}
      {isLoading && <LoadingSkeleton />}
    </>
  );
};
