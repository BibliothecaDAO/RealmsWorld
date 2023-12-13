"use client";

import { useWalletsProviderContext } from "@/app/providers/WalletsProvider";
import Album from "@/icons/album.svg";
import EthereumLogo from "@/icons/ethereum.svg";
import Lords from "@/icons/lords.svg";
import Starknet from "@/icons/starknet.svg";
import { formatBigInt, shortenHex } from "@/utils/utils";
import {
  useAccount,
  useDisconnect,
  useNetwork,
  useStarkName,
} from "@starknet-react/core";
import { LogOut, Mail } from "lucide-react";

import { Button } from "@realms-world/ui";

import { AccountLink } from "./AccountLink";
import { StarknetLoginButton } from "./StarknetLoginButton";

export const StarkAccount = () => {
  const { disconnect } = useDisconnect();
  const { status, address } = useAccount();
  const { balances } = useWalletsProviderContext();
  const { chain } = useNetwork();
  const { data } = useStarkName({ address });

  if (status === "connected")
    return (
      <div className="flex w-full flex-col justify-between rounded border p-2">
        <div className="flex justify-between">
          <div className="flex">
            <Starknet className="w-8 px-1" />
            <div className="text-bright-yellow/50 mr-2 self-center">
              {chain?.name}
            </div>
            <div className="mr-2 self-center text-lg">
              {data ?? shortenHex(address ?? "")}
            </div>
            <AccountLink isL1={false} />
          </div>

          <Button
            variant="outline"
            size={"xs"}
            className=""
            onClick={() => disconnect()}
          >
            <LogOut className="w-4 self-center" />
          </Button>
        </div>

        <div className="align-items-center mt-2 flex justify-between">
          <Button href={"/user/" + address} variant={"outline"}>
            <Album className="mr-2 h-6 w-6" />
            Assets
          </Button>
          <div className="flex flex-grow" />

          <div className="flex items-center justify-between px-4">
            <div className="flex text-lg sm:text-2xl">
              <EthereumLogo className="mr-2 w-4" />
              {formatBigInt(balances.l2.eth ?? 0n, 3)}
            </div>
          </div>
          <div className="flex items-center justify-between  px-4">
            <div className="flex text-lg sm:text-2xl">
              <Lords className="w-6 fill-current pr-2" />
              {balances.l2.lords && balances.l2.lords > 0
                ? formatBigInt(balances.l2.lords, 3).toLocaleString()
                : 0}
            </div>
            <Button
              href="/bridge"
              size={"xs"}
              variant={"subtle"}
              className="self-center"
            >
              Bridge
            </Button>
          </div>

          <div className="flex flex-grow" />
        </div>
      </div>
    );
  return (
    <div className="ml-2 w-full self-center">
      <StarknetLoginButton />
    </div>
  );
};

export default StarkAccount;
