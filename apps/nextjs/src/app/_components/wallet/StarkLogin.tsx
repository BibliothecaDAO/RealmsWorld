"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { useWalletsProviderContext } from "@/app/providers/WalletsProvider";
import EthereumLogo from "@/icons/ethereum.svgr";
import Lords from "@/icons/lords.svgr";
import Starknet from "@/icons/starknet.svgr";
import { formatBigInt } from "@/utils/utils";
import { useAccount, useConnectors, useNetwork } from "@starknet-react/core";
import { LogOut, Mail } from "lucide-react";

import { StarknetLoginButton } from "./StarknetLoginButton";

export const StarkLogin = () => {
  const { disconnect } = useConnectors();
  const { status } = useAccount();
  const { balances } = useWalletsProviderContext();
  const { chain } = useNetwork();

  if (status === "connected")
    return (
      <div className="  rounded border p-2">
        <div className="mb-3 flex justify-between">
          <div className="flex">
            <Starknet className="w-8 px-1" />
            <div className="text-bright-yellow/50 mr-2 self-center">
              {chain?.name}
            </div>
          </div>
          <div>
            <Button
              variant="outline"
              size={"xs"}
              className=""
              onClick={() => disconnect()}
            >
              <LogOut className="w-4 self-center" />
            </Button>
          </div>
        </div>

        <div className="align-items-center grid grid-cols-2 space-x-3">
          <div className=" rounded border px-4 py-2">
            <div className="flex text-2xl">
              <EthereumLogo className="mr-2 w-4" />
              {formatBigInt(balances.l2.eth ?? 0n, 3)}
            </div>
          </div>
          <div className=" flex justify-between rounded border px-4 py-2">
            <div className="flex text-2xl">
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
        </div>
      </div>
    );
  return (
    <div className="w-full self-center">
      <StarknetLoginButton />
    </div>
  );
};

export default StarkLogin;
