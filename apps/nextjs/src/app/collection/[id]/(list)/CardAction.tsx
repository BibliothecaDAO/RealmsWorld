import LordsIcon from "@/icons/lords.svg";
import { useAccount } from "@starknet-react/core";

import type { RouterOutputs } from "@realms-world/api";
import { Button } from "@realms-world/ui";
import { padAddress } from "@realms-world/utils";

import { BuyModal } from "../../marketplace/buy/BuyModal";
import { ListModal } from "../../marketplace/list/ListModal";
import { ListingEditModal } from "../../marketplace/listEdit/ListingEditModal";

export const CardAction = ({
  token,
  layout = "grid",
}: {
  token: RouterOutputs["erc721Tokens"]["all"]["items"][number];
  layout?: "grid" | "list";
}) => {
  const { address } = useAccount();
  return (
    <>
      {token?.price &&
        (token.owner !== padAddress(address?.toLowerCase()) ? (
          <BuyModal
            trigger={
              <Button className="z-20 flex w-full  justify-between" size={"lg"}>
                Buy Now <span className="flex">{token?.price} </span>
              </Button>
            }
            // tokenId={tokenId}
            token={token}
            collectionId={token.contract_address}
            orderId={0}
          />
        ) : (
          <ListingEditModal
            token={token}
            //tokenId={tokenId}
            //listingId={token?.id}
            collectionId={"test"}
            trigger={
              <Button size={"lg"} className="w-full">
                Edit Listing
              </Button>
            }
          />
        ))}
      {!token?.price && token.owner == padAddress(address?.toLowerCase()) && (
        <ListModal
          token={token}
          tokenId={token.token_id}
          collectionId={"test"}
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
