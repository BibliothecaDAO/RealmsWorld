"use client";

import { Button } from "@/app/_components/ui/button";
import { useWalletsProviderContext } from "@/app/providers/WalletsProvider";
import EthereumLogo from "@/icons/ethereum.svgr";
import Lords from "@/icons/lords.svgr";
import { formatBigInt } from "@/utils/utils";
import { ConnectKitButton } from "connectkit";
//import { shortenHex } from "@/utils/utils";
import { LogOut } from "lucide-react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsName,
  useNetwork,
} from "wagmi";

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
      <div className="rounded border border-white/20 p-2">
        <div className="mb-3 flex justify-between">
          <div className="flex text-xl">
            <EthereumLogo className="mx-2 w-5" />{" "}
            <div className="self-center">{chain?.name}</div>
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
          <div className="flex justify-between rounded border border-white/20 px-4 pb-2 pt-4">
            <div className="flex text-2xl">
              <EthereumLogo className="mr-2 w-4" />
              {balances.l1.eth ? formatBigInt(balances.l1.eth, 3) : 0}
            </div>
          </div>
          <div className="flex justify-between rounded border border-white/20  px-4 pb-2 pt-4">
            <div className="flex text-2xl">
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
    <div className="w-full self-center">
      <EthereumLoginButton />
      {error && <div>{error.message}</div>}
    </div>
  );
}

export default EthereumLogin;
