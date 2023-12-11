"use client";

import Lords from "@/icons/lords.svg";
import { api } from "@/utils/api";
import { findTokenName, padAddress } from "@/utils/utils";
import { useAccount } from "@starknet-react/core";

import { Button } from "@realms-world/ui";

import { BuyModal } from "../../marketplace/buy/BuyModal";
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

  const activeListings = erc721Token?.listings?.filter(
    (listing) => listing.active,
  );

  const lowestPriceActiveListing = activeListings?.reduce(
    (minPriceListing, currentListing) => {
      return currentListing?.price < minPriceListing?.price
        ? currentListing
        : minPriceListing;
    },
    activeListings[0],
  );

  const collectionId = findTokenName(contractAddress);
  return (
    <>
      {erc721Token ? (
        <>
          <TokenInformation
            //token={erc721Token}
            collectionId={collectionId}
            collection={undefined}
            name={erc721Token.name}
            image={erc721Token.image}
            tokenId={erc721Token.token_id}
            owner={erc721Token.owner}
            attributes={erc721Token.metadata?.attributes}
          >
            {erc721Token.owner == padAddress(address) ? (
              <TokenOwnerActions
                token={erc721Token}
                tokenId={tokenId}
                contractAddress={contractAddress}
              />
            ) : (
              <div className="mt-4 w-full rounded border bg-dark-green p-6">
                {lowestPriceActiveListing ? (
                  <>
                    <div className="flex items-center gap-x-8">
                      <div>
                        <span className="text-sm text-bright-yellow/50">
                          Price
                        </span>
                        <span className="flex text-2xl font-bold">
                          {lowestPriceActiveListing.price}{" "}
                          <Lords className="ml-2 w-6 fill-current" />
                        </span>
                      </div>
                      <div>
                        <span className="text-sm text-bright-yellow/50">
                          Sale Ends
                        </span>
                        <span className="flex text-lg font-bold">
                          {lowestPriceActiveListing.expiration &&
                            new Date(
                              parseInt(lowestPriceActiveListing?.expiration) *
                                1000,
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                        </span>
                      </div>
                    </div>
                    <BuyModal
                      trigger={
                        <Button className="mt-6 w-full" size={"lg"}>
                          Buy Now
                        </Button>
                      }
                      tokenId={tokenId}
                      token={erc721Token}
                      collectionId={collectionId}
                      orderId={0}
                    />
                  </>
                ) : (
                  "Not listed"
                )}
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
