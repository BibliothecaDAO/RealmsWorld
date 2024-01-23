"use client";

import { useTimeDiff } from "@/hooks/useTimeDiff";
import Lords from "@/icons/lords.svg";
import { api } from "@/trpc/react";
import { findTokenName, padAddress } from "@/utils/utils";
import { useAccount } from "@starknet-react/core";
import { Clock } from "lucide-react";

import type { RouterOutputs } from "@realms-world/api";
import { Button } from "@realms-world/ui";

import { BuyModal } from "../../marketplace/buy/BuyModal";
import TokenOwnerActions from "../../marketplace/TokenOwnerActions";
import { LoadingSkeleton } from "./loading";
import { TokenInformation } from "./TokenInformation";

export const L2Token = ({
  contractAddress,
  tokenId,
  token,
}: {
  contractAddress: string;
  tokenId: string;
  token: RouterOutputs["erc721Tokens"]["byId"];
}) => {
  const { data: erc721Token, isLoading } = api.erc721Tokens.byId.useQuery(
    {
      id: contractAddress + ":" + tokenId,
    },
    { refetchInterval: 10000, initialData: token },
  );
  const { address } = useAccount();

  //if (isLoading) return <LoadingSkeleton />;
  if (!erc721Token) return <div>Token Information Loading</div>;

  const activeListings = erc721Token.listings?.filter(
    (listing) => listing.active,
  );

  const lowestPriceActiveListing = activeListings?.reduce(
    (minPriceListing, currentListing) =>
      currentListing.price < minPriceListing.price
        ? currentListing
        : minPriceListing,
    activeListings[0],
  );

  const collectionId = findTokenName(contractAddress);
  const expiryDiff = useTimeDiff(lowestPriceActiveListing?.expiration || 0);

  const price = lowestPriceActiveListing?.price
    ? BigInt(parseInt(lowestPriceActiveListing?.price || "0")).toString()
    : null;

  return (
    <>
      {lowestPriceActiveListing?.expiration && (
        <div className="my-2 flex items-center  py-4 text-xs opacity-60">
          <Clock className="mr-2 w-6" />
          <span>Listing ends in {expiryDiff}</span>
        </div>
      )}
      <div className="mt-4 flex flex-wrap items-center justify-between border bg-dark-green p-4">
        <div className="flex flex-wrap gap-x-2 text-lg">
          {price ? (
            <>
              {price && (
                <div className="mb-4 flex w-full gap-x-2">
                  <div className="flex max-w-[140px]">
                    <span className="truncate text-3xl">{price}</span>
                  </div>
                  <Lords className="w-8 fill-current pr-2" />
                </div>
              )}
            </>
          ) : (
            "Not listed"
          )}{" "}
          {erc721Token.owner == padAddress(address) ? (
            <TokenOwnerActions
              token={token}
              tokenId={tokenId}
              contractAddress={contractAddress}
            />
          ) : (
            <div>
              {lowestPriceActiveListing && (
                <BuyModal
                  trigger={
                    <Button className="w-full" size={"lg"}>
                      Buy Now
                    </Button>
                  }
                  // tokenId={tokenId}
                  token={token}
                  collectionId={collectionId}
                  orderId={0}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
