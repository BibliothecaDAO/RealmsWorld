"use client";

import { CopyButton } from "@/app/_components/CopyButton";
import { shortenHex } from "@/utils/utils";
import { useStarkProfile } from "@starknet-react/core";

interface WalletHeaderProps {
  walletAddress: string;
}

export default function WalletHeader({ walletAddress }: WalletHeaderProps) {
  const { data: starkProfile } = useStarkProfile({
    address: walletAddress as `0x${string}`,
  });

  return (
    <div className="flex flex-col gap-4 border-border bg-background px-5 pb-0 pt-3.5 sm:flex-row sm:items-center sm:justify-between sm:border-b sm:pb-6 sm:pt-6 md:justify-start md:gap-4">
      <div className="flex items-center gap-4">
        {/*<ProfilePicture
          address={walletAddress}
          className="rounded-xs size-8 sm:rounded-lg lg:size-16"
  />*/}
        <div className="h-full w-full">
          <div className="flex items-center justify-between sm:justify-start">
            <p className="text-xl font-semibold">
              {starkProfile?.name ?? shortenHex(walletAddress, 10)}
            </p>
            <div className="ml-2.5 flex items-center gap-4 text-secondary-foreground">
              <CopyButton className="h-6 sm:h-4" text={walletAddress} />
            </div>
          </div>

          {starkProfile?.name !== undefined && (
            <div>
              <p className="mt-2 hidden text-sm sm:block">
                {shortenHex(walletAddress)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
