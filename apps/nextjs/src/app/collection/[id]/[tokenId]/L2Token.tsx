"use client";

import { api } from "@/utils/api";
import { findTokenName, padAddress } from "@/utils/utils";
import { useAccount } from "@starknet-react/core";

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
  const [erc721Token, { isLoading }] = api.erc721Tokens.byId.useSuspenseQuery({
    id: contractAddress + ":" + tokenId,
  });
  const { address } = useAccount();

  if (!erc721Token) {
    return <div>Token Information Loading</div>;
  }

  const collectionId = findTokenName(contractAddress);

  return (
    <>
      {erc721Token ? (
        <>
          <TokenInformation
            token={erc721Token}
            collectionId={collectionId}
            collection={null}
          >
            {erc721Token.owner == padAddress(address) && (
              <TokenOwnerActions
                token={erc721Token}
                tokenId={tokenId}
                contractAddress={contractAddress}
              />
            )}
            {collectionId == "beasts" &&
              erc721Token.metadata?.attributes?.length && (
                <div className="mt-4 rounded border bg-dark-green">
                  <div className="flex items-center justify-between border-b px-3 py-2 pr-6">
                    <h5>Type:</h5>
                    <span className="text-xl">
                      {
                        erc721Token.metadata?.attributes.find(
                          (trait) => trait.trait_type === "type",
                        )?.value
                      }
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b px-3 py-2 pr-6">
                    <h5>Tier: </h5>
                    <span className="text-xl">
                      {
                        erc721Token.metadata?.attributes.find(
                          (trait) => trait.trait_type === "tier",
                        )?.value
                      }
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b px-3 py-2 pr-6">
                    <h5>Level: </h5>
                    <span className="text-xl">
                      {
                        erc721Token.metadata?.attributes.find(
                          (trait) => trait.trait_type === "level",
                        )?.value
                      }
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b px-3 py-2 pr-6">
                    <h5>Health: </h5>
                    <span className="text-xl">
                      {
                        erc721Token.metadata?.attributes.find(
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
