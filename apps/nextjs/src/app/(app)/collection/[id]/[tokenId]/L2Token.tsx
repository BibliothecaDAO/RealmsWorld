"use client";

import { useTimeDiff } from "@/hooks/useTimeDiff";
import Lords from "@/icons/lords.svg";
import { api } from "@/trpc/react";
import { findLowestPriceActiveListing } from "@/utils/getters";
import { padAddress } from "@/utils/utils";
import { useAccount } from "@starknet-react/core";
import { Clock } from "lucide-react";
import { ViewOnMarketplace } from "../../ViewOnMarketplace";

import type { RouterOutputs } from "@realms-world/api";

import { BuyModal } from "../../marketplace/buy/BuyModal";
import TokenOwnerActions from "../../marketplace/TokenOwnerActions";
import { L2ActivityCard } from "../(list)/activity/L2ActivityCard";
import { ListingCard } from "../(list)/ListingCard";

export const L2Token = ({
  contractAddress,
  tokenId,
  token,
}: {
  contractAddress: string;
  tokenId: string;
  token: RouterOutputs["erc721Tokens"]["byId"];
}) => {
  const { data: erc721Token } = api.erc721Tokens.byId.useQuery(
    {
      id: contractAddress + ":" + tokenId,
    },
    { refetchInterval: 10000, initialData: token },
  );
  const { address } = useAccount();

  //if (isLoading) return <LoadingSkeleton />;
  if (!erc721Token) return <div>Token Information Loading</div>;

  const activeListings = erc721Token.listings.filter(
    (
      listing: NonNullable<
        RouterOutputs["erc721Tokens"]["byId"]
      >["listings"][number],
    ) => listing.active && listing.created_by == erc721Token.owner,
  );

  const lowestPriceActiveListing = findLowestPriceActiveListing(
    erc721Token.listings,
    erc721Token.owner,
  );

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const expiryDiff = useTimeDiff(lowestPriceActiveListing?.expiration ?? 0);

  const price = lowestPriceActiveListing?.price;

  return (
    <div className="mt-6">
      <ViewOnMarketplace collection={erc721Token.contract_address ?? ""} tokenId={erc721Token.token_id} /></div>
  )
  {/*<>
      {lowestPriceActiveListing?.expiration && (
        <div className="my-2 flex items-center py-4 text-xs opacity-60">
          <Clock className="mr-2 w-6" />
          <span>Listing ends in {expiryDiff}</span>
        </div>
      )}
      <div className="mt-4 flex flex-wrap items-center justify-between border bg-background p-4">
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
            <TokenOwnerActions token={token} />
          ) : (
            <div>
              {price && (
                <BuyModal
                  trigger={
                    <Button className="w-full" size={"lg"}>
                      Buy Now
                    </Button>
                  }
                  // tokenId={tokenId}
                  token={token}
                  orderId={0}
                />
              )}
            </div>
          )}
        </div>
      </div>
      <Accordion
        type="multiple"
        defaultValue={["item-1", "item-2"]}
        className=""
      >
        <AccordionItem value="item-1">
          <div className="mt-4 border bg-background px-4">
            <AccordionTrigger className="text-lg">Listings</AccordionTrigger>
            <AccordionContent className="-mt-4 w-full flex-wrap gap-x-2">
              {activeListings.length
                ? activeListings.map((listing, index) => {
                    return (
                      <ListingCard
                        key={index}
                        activity={listing}
                        token={token}
                      />
                    );
                  })
                : "No Active Listings"}
            </AccordionContent>
          </div>
        </AccordionItem>
        <AccordionItem value="item-2">
          <div className="mt-4 border bg-background px-4">
            <AccordionTrigger className="text-lg">
              Token Activity
            </AccordionTrigger>
            <AccordionContent className="-mt-4 w-full flex-wrap gap-x-2">
              {erc721Token.listings.map((listing, index) => {
                return <L2ActivityCard key={index} activity={listing} />;
              })}
            </AccordionContent>
          </div>
        </AccordionItem>
      </Accordion>
    </>*/}

};
