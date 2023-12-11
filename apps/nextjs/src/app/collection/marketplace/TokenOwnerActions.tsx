"use client";

import React, { useMemo } from "react";
import Lords from "@/icons/lords.svg";
import type { RouterOutputs } from "@/utils/api";
import { useContractWrite } from "@starknet-react/core";
import { RefreshCw } from "lucide-react";
import { formatEther } from "viem";

import { Button, Dialog, DialogContent, DialogTrigger } from "@realms-world/ui";

import { ListModal } from "./list/ListModal";
import { ListingEditModal } from "./listEdit/ListingEditModal";

//import { useToast } from "@realms-world/ui";;

interface TokenOwnerActionsProps {
  token: RouterOutputs["erc721Tokens"]["byId"];
  tokenId: string;
  //tokenOwnerAddress: string;
  contractAddress: string;
}

const TokenOwnerActions: React.FC<TokenOwnerActionsProps> = ({
  token,
  tokenId,
  //tokenOwnerAddress,
  contractAddress,
}) => {
  //const { toast } = useToast();
  //const { listItem } = useBurner();
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  const onItemlist = async () => {
    try {
      setIsSubmitting(true);
      /*await listItem({
        tokenId: parseInt(tokenId),
        tokenOwnerAddress,
        contractAddress
      });
      toast({
        title: "Order placed",
        description: "Your order has been submitted"
      });*/
      setIsSubmitting(false);
    } catch (error: any) {
      setIsSubmitting(false);
      /*toast({
        title: "Error",
        description: error.message
      });*/
    }
  };

  const activeListings = token?.listings?.filter((listing) => listing.active);

  const lowestPriceActiveListing = activeListings?.reduce(
    (minPriceListing, currentListing) => {
      return currentListing?.price < minPriceListing?.price
        ? currentListing
        : minPriceListing;
    },
    activeListings[0],
  );

  return (
    <div className="my-4 flex items-center justify-between border p-6">
      <div className="flex gap-x-4 text-lg font-bold">
        {lowestPriceActiveListing ? (
          <>
            {lowestPriceActiveListing.expiration &&
              new Date(
                parseInt(lowestPriceActiveListing?.expiration) * 1000,
              ).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}{" "}
            {lowestPriceActiveListing.price && (
              <div className="flex gap-x-2">
                <div className="flex max-w-[140px]">
                  <span className="truncate">
                    {lowestPriceActiveListing.price}
                  </span>
                </div>
                <Lords className="w-8 fill-current pr-2" />
              </div>
            )}
          </>
        ) : (
          "No active Listings"
        )}
        {/*token?.listings?.map((listing) => {
          return (
            <div className="flex" key={token.id}>
              {listing.expiration &&
                new Date(
                  parseInt(listing.expiration) * 1000,
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}{" "}
              {listing.price && formatEther(BigInt(listing.price))}
            </div>
          );
        })*/}
      </div>
      {activeListings ? (
        <ListingEditModal
          token={token}
          tokenId={tokenId}
          listingId={lowestPriceActiveListing?.id}
          collectionId={"test"}
          trigger={
            <Button onClick={() => onItemlist()} variant={"default"}>
              <>
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    <span>Please wait</span>
                  </div>
                ) : (
                  "Edit Listing"
                )}
              </>
            </Button>
          }
        />
      ) : (
        <ListModal
          token={token}
          tokenId={tokenId}
          collectionId={"test"}
          trigger={
            <Button onClick={() => onItemlist()} variant={"default"}>
              <>
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    <span>Please wait</span>
                  </div>
                ) : (
                  "List Item"
                )}
              </>
            </Button>
          }
        />
      )}
    </div>
  );
};

export default TokenOwnerActions;
