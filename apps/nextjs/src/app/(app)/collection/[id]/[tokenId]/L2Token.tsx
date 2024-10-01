"use client";

import Lords from "@/icons/lords.svg";
import { padAddress } from "@/utils/utils";
import { useAccount } from "@starknet-react/core";
import { Clock } from "lucide-react";
import { ViewOnMarketplace } from "../../ViewOnMarketplace";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
} from "@realms-world/ui";

import { BuyModal } from "../../marketplace/buy/BuyModal";
import TokenOwnerActions from "../../marketplace/TokenOwnerActions";
import { L2ActivityCard } from "../(list)/activity/L2ActivityCard";
import { ListingCard } from "../(list)/ListingCard";
import type { Token, TokenActivity } from "@/types/ark";
import { useQuery } from "@tanstack/react-query";
import { getToken } from "@/lib/ark/getToken";
import { useArkClient } from "@/lib/ark/useArkClient";
import { getTokenMarketdata } from "@/lib/ark/getTokenMarketdata";
import { getTokenActivity } from "@/lib/ark/getTokenActivity";
import { useTimeDiff } from "@/hooks/useTimeDiff";
import { useTokenPrice } from "@/hooks/market/useTokenPrice";

export const L2Token = ({
  contractAddress,
  tokenId,
  token,
}: {
  contractAddress: string;
  tokenId: string;
  token: Token;
}) => {
  const { marketplace: arkClient } = useArkClient();
  let { data: erc721Token } = useQuery({
    queryKey: ["erc721Token", contractAddress, tokenId],
    queryFn: async () => {
      return await getToken({ client: arkClient, contractAddress, tokenId: parseInt(tokenId) })
    },
    refetchInterval: 10000,
    initialData: { data: token },
  })
  let { data: listing } = useQuery({
    queryKey: ["erc721Listings", contractAddress, tokenId],
    queryFn: async () => {
      return await getTokenMarketdata({ client: arkClient, contractAddress, tokenId: parseInt(tokenId) })
    },
    refetchInterval: 5000,
  });
  const { data: activities } = useQuery({
    queryKey: ["erc721Activities", contractAddress, tokenId],
    queryFn: async () => {
      return await getTokenActivity({ client: arkClient, contractAddress, tokenId: parseInt(tokenId) })
    },
    refetchInterval: 5000,

  });
  const { address } = useAccount();
  const expiryDiff = useTimeDiff(listing?.data?.listing.end_date ?? 0);

  const price = useTokenPrice(listing?.data?.listing?.start_amount, listing?.data?.listing?.currency_address);

  if (!erc721Token?.data || !listing?.data) return <div>Token Information Loading</div>;
  erc721Token = erc721Token.data
  listing = listing.data

  return (
    <>
      {listing.is_listed && (
        <div className="my-2 flex items-center py-4 text-xs opacity-60">
          <Clock className="mr-2 w-6" />
          <span>Listing ends in {expiryDiff}</span>
        </div>
      )}
      <div className="mt-4 flex flex-wrap items-center justify-between border bg-background p-4">
        <div className="flex flex-wrap gap-x-2 text-lg">
          {listing.is_listed ? (
            <>
              <div className="mb-4 flex w-full gap-x-2">
                <div className="flex max-w-[140px]">
                  <span className="truncate text-3xl">{price}</span>
                </div>
                <Lords className="w-8 fill-current pr-2" />
              </div>
            </>
          ) : (
            "Not listed"
          )}{" "}
          {erc721Token.owner == padAddress(address) ? (
            <TokenOwnerActions token={token} />
          ) : (
            <div>
              {listing.is_listed && (
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
              {listing.is_listed ? (
                <ListingCard
                  listing={listing}
                  token={token}
                />
              )
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
              {activities?.data.map((activity: TokenActivity, index: number) => {
                return <L2ActivityCard key={index} activity={activity} />;
              })}
            </AccordionContent>
          </div>
        </AccordionItem>
      </Accordion>
    </>*/}

};
