"use client";

import Link from "next/link";
import { Progress } from "@/app/_components/ui/progress";
import Table from "@/app/homepages/realms-adventurers/components/Table";
import { shortenHex } from "@/utils/utils";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { useOwnerListings } from "@reservoir0x/reservoir-kit-ui";

export const TopOwners = ({
  owners,
}: {
  owners: {
    address: string;
    ownership: {
      tokenCount: number;
      onSaleCount: number;
    };
  }[];
}) => {
  return (
    <div>
      <h4>Owners</h4>
      <div className="grid w-full grid-cols-5 text-sm uppercase">
        <div className="col-span-2">Wallet</div>
        <div>Owned</div>
        <div>On Sale</div>
        <div>% Owned</div>
      </div>
      <ScrollArea.Root className="ScrollAreaRoot">
        <ScrollArea.Viewport className="h-96">
          {owners.map((owner) => (
            <div key={owner.address} className="grid grid-cols-5 py-1">
              <div className="col-span-2">
                <Link href={`/user/${owner.address}`}>
                  {shortenHex(owner.address, 8)}
                </Link>
              </div>
              <div>{owner.ownership.tokenCount}</div>
              <div>{owner.ownership.onSaleCount}</div>
              <div>
                {((owner.ownership.tokenCount / 8000) * 100).toFixed(2)}
              </div>
            </div>
          ))}
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className="ScrollAreaScrollbar"
          orientation="horizontal"
        >
          <ScrollArea.Thumb className="ScrollAreaThumb" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Scrollbar
          className="ScrollAreaScrollbar"
          orientation="vertical"
        >
          <ScrollArea.Thumb className="ScrollAreaThumb" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner />
      </ScrollArea.Root>
    </div>
  );
};
