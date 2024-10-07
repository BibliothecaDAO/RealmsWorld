import { findLowestPriceActiveListing } from "@/utils/getters";
import { useAccount } from "@starknet-react/core";

import type { RouterOutputs } from "@realms-world/api";
import { Button } from "@realms-world/ui/components/ui/button";
import { padAddress } from "@realms-world/utils";

import { BuyModal } from "../../marketplace/buy/BuyModal";
import { ListModal } from "../../marketplace/list/ListModal";
import { ListingEditModal } from "../../marketplace/listEdit/ListingEditModal";
import type { CollectionToken } from "@/types/ark";
import { useTokenListing } from "@/hooks/market/useTokenListing";

export const CardAction = ({
  token,
}: {
  token: RouterOutputs["erc721Tokens"]["all"]["items"][number] | CollectionToken;
}) => {
  const { address } = useAccount();
  const listing = useTokenListing(token);
  if (undefined === listing || null === listing) return null;

  return (
    <>
      {
        (token.owner !== padAddress(address?.toLowerCase()) ? (
          <BuyModal
            trigger={
              <Button className="z-20 flex w-full" size={"lg"}>
                Buy Now
              </Button>
            }
            token={token}
            orderId={0}
          />
        ) : (
          <ListingEditModal
            token={token}
            collectionId={"test"}
            trigger={
              <Button size={"lg"} className="w-full">
                Edit Listing
              </Button>
            }
          />
        ))}
      {!token.price && token.owner == padAddress(address?.toLowerCase()) && (
        <ListModal
          token={token}
          trigger={
            <Button className="z-20 w-full" size={"lg"}>
              List Item
            </Button>
          }
        />
      )}
    </>
  );
};
