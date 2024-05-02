"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useUIStore } from "@/providers/UIStoreProvider";
import { useWalletsProviderContext } from "@/providers/WalletsProvider";
import Album from "@/icons/album.svg";
import EthereumLogo from "@/icons/ethereum.svg";
import Lords from "@/icons/lords.svg";
import Starknet from "@/icons/starknet.svg";
import { formatBigInt } from "@/utils/utils";
import { useAccount, useDisconnect } from "@starknet-react/core";
import { LogOut } from "lucide-react";

import { Button } from "@realms-world/ui";

import { AccountLink } from "./AccountLink";
import { StarknetLoginButton } from "./StarknetLoginButton";

export const DisplayBalance = ({
  icon,
  balance,
  tokenName,
}: {
  icon?: React.ReactElement;
  balance?: bigint;
  tokenName?: string;
}) => (
  <div className="flex space-x-2 text-lg sm:text-2xl">
    <span className="self-center">
      {balance && balance > 0 ? formatBigInt(balance, 3).toLocaleString() : 0}
    </span>
    <span className="self-center">{icon ?? tokenName}</span>
  </div>
);

export const StarkAccount = () => {
  const { disconnect } = useDisconnect();
  const { status, address: addressLong } = useAccount();

  const address = "0x0" + addressLong?.substring(2);

  const { toggleAccount } = useUIStore((state) => state,);

  const { balances } = useWalletsProviderContext();

  const isConnected = status === "connected";

  const DisplayChainInfo = () => (
    <div className="flex">
      <Starknet className="mx-2 w-6" />
      <AccountLink isL1={false} />
    </div>
  );

  const router = useRouter();

  if (isConnected) {
    return (
      <div className="flex w-full flex-col justify-between border-2">
        <div className="flex justify-between p-2">
          <DisplayChainInfo />

          <Button variant="outline" size="xs" onClick={() => disconnect()}>
            <LogOut className="w-4 self-center" />
          </Button>
        </div>

        <div className="flex justify-between border-t p-2">
          <Button
            onClick={() => {
              router.push(`/user/${address}`);
              toggleAccount();
            }}
            variant="outline"
          >
            <Album className="mr-2 h-6 w-6" />
            Assets
          </Button>
          <DisplayBalance
            icon={<EthereumLogo className="mr-2 w-4" />}
            balance={balances.l2.eth}
            tokenName="ETH"
          />
          <DisplayBalance
            icon={<Lords className="w-6 fill-current pr-2" />}
            balance={balances.l2.lords}
            tokenName="LORDS"
          />
          <Button
            onClick={() => {
              router.push(`/bridge`);
              toggleAccount();
            }}
            size="sm"
            variant="default"
          >
            Bridge
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="ml-2 w-full self-center">
      <StarknetLoginButton />
    </div>
  );
};

export default StarkAccount;
