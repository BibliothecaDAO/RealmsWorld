"use client";

import { useAccount, useConnect, useDisconnect, useEnsName } from "wagmi";
import { Button } from "@/app/components/ui/button";
import { shortenHex } from "@/functions/utils";
import { LogOut } from "lucide-react";
import { ConnectKitButton } from "connectkit";
import { useNetwork } from "wagmi";
import { useWalletsProviderContext } from "@/app/providers/WalletsProvider";
import { formatBigInt } from "@/app/lib/utils";
import EthereumLogo from "@/icons/ethereum.svg";
import Lords from "@/icons/lords.svg";
import { EthereumLoginButton } from "./EthereumLoginButton";
function EthereumLogin() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();
  const { chain } = useNetwork();
  const { balances } = useWalletsProviderContext();
  const { data: ensAddress, isError } = useEnsName({
    address: address,
  });

  if (isConnected)
    return (
      <div className="border p-2 rounded border-white/20">
        <div className="flex mb-3 justify-between">
          <div className="flex text-xl">
            <EthereumLogo className="w-7 mx-2" />{" "}
            <div className="self-center">{chain?.name}</div>
          </div>
          <div>
            <Button
              variant="outline"
              size={"xs"}
              className=""
              onClick={() => disconnect()}
            >
              <LogOut className="self-center w-4" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 align-items-center space-x-3">
          <div className="px-4 pt-4 pb-2 border rounded flex justify-between border-white/20">
            <div className="text-2xl flex">
              <EthereumLogo className="w-4 mr-2" />
              {balances.l1.eth ? formatBigInt(balances.l1.eth, 3) : 0}
            </div>
          </div>
          <div className="px-4 pt-4 pb-2 border rounded  flex justify-between border-white/20">
            <div className="text-2xl flex">
              <Lords className="w-6 fill-current pr-2" />
              {balances.l1.lords && balances.l1.lords > 0
                ? formatBigInt(balances.l1.lords, 3)
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
    <div className="self-center w-full">
      <EthereumLoginButton />
      {error && <div>{error.message}</div>}
    </div>
  );
}

export default EthereumLogin;
