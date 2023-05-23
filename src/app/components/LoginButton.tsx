"use client";

import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsName,
  useBalance,
} from "wagmi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Button } from "./ui/button";
import { shortenHex } from "@/functions/utils";
import { LogOut } from "lucide-react";
//import { ConnectKitButton } from "connectkit"
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";

function Profile() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();

  const { data: ensAddress, isError } = useEnsName({
    address: address,
  });

  const {
    data: lords,
    isError: lordsError,
    isLoading: lordsLoading,
  } = useBalance({
    address: address,
    token: "0x686f2404e77ab0d9070a46cdfb0b7fecdd2318b0",
  });

  const {
    data: eth,
    isError: ethError,
    isLoading: ethLoading,
  } = useBalance({
    address: address,
  });

  if (isConnected)
    return (
      <div className="flex self-center space-x-3">
        <Button className="sm:block hidden">
          {eth?.symbol} {parseFloat(eth?.formatted || "").toFixed(3)}
        </Button>
        {lords && (
          <Button className="sm:block hidden">
            {lords?.symbol} {lords?.formatted}
          </Button>
        )}
        {address && (
          <Button href={`/user/${address}`}>
            {ensAddress ? ensAddress : shortenHex(address || "")}
          </Button>
        )}
        <Button
          className="self-center"
          variant={"default"}
          onClick={() => disconnect()}
        >
          <LogOut className="self-center w-3" />
        </Button>
      </div>
    );
  return (
    <div className="self-center">
      {connectors && (
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            mounted,
          }) => {
            return (
              <div
                {...(!mounted && {
                  "aria-hidden": true,
                  style: {
                    opacity: 0,
                    pointerEvents: "none",
                    userSelect: "none",
                  },
                })}
              >
                {(() => {
                  if (!mounted || !account || !chain) {
                    return (
                      <button onClick={openConnectModal} type="button">
                        Connect Wallet
                      </button>
                    );
                  }
                  if (chain.unsupported) {
                    return (
                      <button onClick={openChainModal} type="button">
                        Wrong network
                      </button>
                    );
                  }

                  return (
                    <div style={{ display: "flex", gap: 12 }}>
                      <button
                        onClick={openChainModal}
                        style={{ display: "flex", alignItems: "center" }}
                        type="button"
                      >
                        {chain.hasIcon && (
                          <div
                            style={{
                              background: chain.iconBackground,
                              width: 12,
                              height: 12,
                              borderRadius: 999,
                              overflow: "hidden",
                              marginRight: 4,
                            }}
                          >
                            {chain.iconUrl && (
                              <Image
                                alt={chain.name ?? "Chain icon"}
                                src={chain.iconUrl}
                                width={12}
                                height={12}
                              />
                            )}
                          </div>
                        )}
                        {chain.name}
                      </button>

                      <button onClick={openAccountModal} type="button">
                        {account.displayName}
                        {account.displayBalance
                          ? ` (${account.displayBalance})`
                          : ""}
                      </button>
                    </div>
                  );
                })()}
              </div>
            );
          }}
        </ConnectButton.Custom>
      )}
      {error && <div>{error.message}</div>}
    </div>
  );
}

export default Profile;
