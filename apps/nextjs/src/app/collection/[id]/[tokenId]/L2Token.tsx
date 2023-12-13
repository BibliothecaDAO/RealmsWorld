"use client";

import { useTimeDiff } from "@/hooks/useTimeDiff";
import Lords from "@/icons/lords.svg";
import { api } from "@/utils/api";
import { findTokenName, padAddress } from "@/utils/utils";
import { useAccount } from "@starknet-react/core";
import { Clock } from "lucide-react";

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
  const expiryDiff = useTimeDiff(lowestPriceActiveListing?.expiration);

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
            {lowestPriceActiveListing?.expiration && (
              <div className="my-4 flex items-center border bg-dark-green p-4">
                <Clock className="mr-2 w-8" />
                <span>Listing ends in {expiryDiff}</span>
              </div>
            )}
            <div className="my-4 flex flex-wrap items-center justify-between border bg-dark-green p-5">
              <div className="flex gap-x-4 text-lg font-bold">
                {lowestPriceActiveListing ? (
                  <>
                    {lowestPriceActiveListing.price && (
                      <div className="flex gap-x-2">
                        <Lords className="w-8 fill-current pr-2" />
                        <div className="flex max-w-[140px]">
                          <span className="truncate text-3xl">
                            {lowestPriceActiveListing.price}
                          </span>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  "Item not Listed"
                )}
              </div>
              {erc721Token.owner == padAddress(address) ? (
                <TokenOwnerActions
                  token={erc721Token}
                  tokenId={tokenId}
                  contractAddress={contractAddress}
                />
              ) : (
                <div className="w-full">
                  {lowestPriceActiveListing && (
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
                  )}
                </div>
              )}
            </div>
          </TokenInformation>
        </>
      ) : (
        "No Token Found"
      )}
      {isLoading && <LoadingSkeleton />}
    </>
  );
};
