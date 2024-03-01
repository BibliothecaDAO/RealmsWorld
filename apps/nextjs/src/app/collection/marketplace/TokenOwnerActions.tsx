"use client";

import React from "react";
import { findLowestPriceActiveListing } from "@/utils/getters";
import { RefreshCw, Trash2 } from "lucide-react";

import type { RouterOutputs } from "@realms-world/api";
import { Button } from "@realms-world/ui";

import { ListCancelModal } from "./cancel/ListCancelModal";
import { ListModal } from "./list/ListModal";
import { ListingEditModal } from "./listEdit/ListingEditModal";

//import { useToast } from "@realms-world/ui";;

interface TokenOwnerActionsProps {
  token: RouterOutputs["erc721Tokens"]["byId"];
  //tokenOwnerAddress: string;
}

const TokenOwnerActions: React.FC<TokenOwnerActionsProps> = ({
  token,
  //tokenOwnerAddress,
}) => {
  //const { toast } = useToast();
  //const { listItem } = useBurner();
  const [isSubmitting, _] = React.useState<boolean>(false);

  const lowestPriceActiveListing =
    token?.listings &&
    findLowestPriceActiveListing(token?.listings, token?.owner);
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
      {lowestPriceActiveListing?.price ? (
        <div className="flex gap-x-3">
          <ListingEditModal
            token={token}
            listingId={lowestPriceActiveListing?.id}
            trigger={
              <Button variant={"default"}>
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
              <Button variant={"outline"}>
                <Trash2 className="h-auto w-7" />
              </Button>
            }
          />
        </div>
      ) : (
        <ListModal
          token={token}
          trigger={
            <Button variant={"default"}>
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
