"use client";

import Link from "next/link";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { NETWORK_NAME } from "@/constants/env";
import { stakingAddresses } from "@/constants/staking";
//import { Progress } from "@/app/_components/ui/progress";
//import Table from "@/app/homepages/realms-eternum/components/Table";
import { shortenHex } from "@/utils/utils";

//import { useOwnerListings } from "@reservoir0x/reservoir-kit-ui";

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
      <ScrollArea className="ScrollAreaRoot h-96">
        {owners?.map((owner) => (
          <div key={owner.address} className="grid grid-cols-5 py-1">
            <div className="col-span-2">
              <Link href={`/user/${owner.address}`}>
                {owner.address === stakingAddresses[NETWORK_NAME].v1Galleon
                  ? "Galleon Staking"
                  : owner.address ===
                      stakingAddresses[NETWORK_NAME].v2Carrack.toLowerCase()
                    ? "Carrack Staking"
                    : shortenHex(owner.address, 8)}
              </Link>
            </div>
            <div>{owner.ownership.tokenCount}</div>
            <div>{owner.ownership.onSaleCount}</div>
            <div>{((owner.ownership.tokenCount / 8000) * 100).toFixed(2)}</div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};
