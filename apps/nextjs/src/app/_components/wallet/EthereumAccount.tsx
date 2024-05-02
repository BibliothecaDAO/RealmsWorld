"use client";

import { useRouter } from "next/navigation";
import { useUIStore } from "@/providers/UIStoreProvider";
import { useWalletsProviderContext } from "@/providers/WalletsProvider";
import Album from "@/icons/album.svg";
import EthereumLogo from "@/icons/ethereum.svg";
import Lords from "@/icons/lords.svg";
import { LogOut } from "lucide-react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

import { Button } from "@realms-world/ui";

import { AccountLink } from "./AccountLink";
import { EthereumLoginButton } from "./EthereumLoginButton";
import { DisplayBalance } from "./StarkAccount";

function EthereumAccount() {
  const { address, isConnected } = useAccount();
  const { error } = useConnect();
  const { disconnect } = useDisconnect();
  const { balances } = useWalletsProviderContext();

  const { toggleAccount } = useUIStore((state) => state,);

  const DisplayChainInfo = () => (
    <div className="flex">
      <EthereumLogo className="mx-2 w-5" />
      <AccountLink isL1 />
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
        <div className="flex justify-between border-t p-2 ">
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
            balance={balances.l1.eth}
            tokenName="ETH"
          />
          <DisplayBalance
            icon={<Lords className="w-6 fill-current pr-2" />}
            balance={balances.l1.lords}
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
      <EthereumLoginButton />
      {error && <div>{error.message}</div>}
    </div>
  );
}

export default EthereumAccount;
