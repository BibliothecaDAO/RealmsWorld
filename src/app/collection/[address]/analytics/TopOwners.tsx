"use client";
import { Progress } from "@/app/components/ui/progress";
import Table from "@/app/homepages/realms-adventurers/components/Table";
import { shortenHex } from "@/functions/utils";
import * as ScrollArea from "@radix-ui/react-scroll-area";

export const TopOwners = ({ owners }: { owners: any }) => {
  return (
    <div>
      <h4>Owners</h4>
      <div className="grid grid-cols-5 w-full uppercase text-sm">
        <div className="col-span-2">Wallet</div>
        <div>Owned</div>
        <div>On Sale</div>
        <div>% Owned</div>
      </div>
      <ScrollArea.Root className="ScrollAreaRoot">
        <ScrollArea.Viewport className="h-96">
          {owners.map((owner) => (
            <div key={owner.address} className="grid grid-cols-5 py-1">
              <div className="col-span-2">{shortenHex(owner.address, 8)}</div>
              <div>{owner.ownership.tokenCount}</div>
              <div>{owner.ownership.onSaleCount}</div>
              <div>
                {((owner.ownership.tokenCount / 8000) * 100).toFixed(2)}
              </div>
            </div>
          ))}{" "}
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
