"use client";

import React from "react";
import Lords from "@/icons/lords.svg";
import { RefreshCw, Trash2 } from "lucide-react";

import type { RouterOutputs } from "@realms-world/api";
import { Button } from "@realms-world/ui";

import { ListCancelModal } from "./cancel/ListCancelModal";
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

  const onItemlist = async () => {};

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
    <>
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
      {activeListings?.length ? (
        <div className="flex gap-x-3">
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
          <ListCancelModal
            token={token}
            trigger={
              <Button onClick={() => onItemlist()} variant={"outline"}>
                <Trash2 className="h-auto w-7" />
              </Button>
            }
          />
        </div>
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
    </>
  );
};

export default TokenOwnerActions;
