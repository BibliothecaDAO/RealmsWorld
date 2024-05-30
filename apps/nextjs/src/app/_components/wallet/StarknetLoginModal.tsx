"use client";

//import { Mail } from "lucide-react";
import type { WalletProvider } from "get-starknet-core";
import { useEffect, useState } from "react";
import { useUIStore } from "@/providers/UIStoreProvider";
import { useAccount, useConnect } from "@starknet-react/core";
import { motion } from "framer-motion";
import getDiscoveryWallets from "get-starknet-core";

import { Button, Dialog, DialogContent, DialogHeader } from "@realms-world/ui";

import WalletIcons from "./WalletIcons";

export const StarknetLoginModal = () => {
  const { connect, connectors } = useConnect();
  const {
    isStarknetLoginOpen,
    toggleStarknetLogin,
    toggleAccount,
    isAccountOpen,
  } = useUIStore((state) => state);
  const { isConnected } = useAccount();

  const [braavos, setBraavos] = useState<string>("");
  const [argent, setArgent] = useState<string>("");

  function getBrowser(): string | undefined {
    const userAgent = navigator.userAgent;
    if (userAgent.includes("Chrome")) {
      return "chrome";
    } else if (userAgent.includes("Firefox")) {
      return "firefox";
    } else {
      return undefined;
    }
  }

  useEffect(() => {
    // get wallets download links from get-starknet-core
    // if browser is not recognized, it will default to their download pages
    const getWallets = async () =>
      getDiscoveryWallets.getDiscoveryWallets().then((wallets) => {
        const browser = getBrowser();

        wallets.map((wallet) => {
          if (wallet.id === "argentX") {
            setArgent(
              browser
                ? wallet.downloads[browser as keyof WalletProvider["downloads"]]
                : "https://www.argent.xyz/argent-x/",
            );
          } else if (wallet.id === "braavos") {
            setBraavos(
              browser
                ? wallet.downloads[browser as keyof WalletProvider["downloads"]]
                : "https://braavos.app/download-braavos-wallet/",
            );
          }
        });
      });

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getWallets();
  }, []);

  useEffect(() => {
    if (isConnected && isStarknetLoginOpen) {
      toggleStarknetLogin();
      !isAccountOpen && toggleAccount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  return (
    <Dialog open={isStarknetLoginOpen} onOpenChange={toggleStarknetLogin}>
      <DialogContent className="w-full min-w-[350px] !pt-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.4,
          }}
          //className="fixed top-0 left-0 z-50 h-full w-72 bg-grey-11 md:w-[70vw]"
        >
          <DialogHeader>
            <h6 className="-mt-3 mb-6 text-base">Connect Starknet Wallet</h6>
          </DialogHeader>
          <div className="flex flex-col space-y-2 self-center">
            {connectors.map((connector) => {
              if (connector.available()) {
                return (
                  <div className="mt-5 flex justify-center" key={connector.id}>
                    <Button
                      className="w-full justify-between self-center px-4 py-6 font-sans text-lg font-light capitalize"
                      variant={"outline"}
                      onClick={() => connect({ connector })}
                    >
                      <div className="flex items-center justify-center">
                        <WalletIcons id={connector.id} />
                        {connector.name
                          ? `Connect ${connector.name}`
                          : "Login with Email"}
                      </div>
                    </Button>
                  </div>
                );
              } else {
                if (
                  connector.id === "braavos" ||
                  connector.id === "argentX"
                ) {
                  return (
                    <div
                      className="mt-5 flex justify-center"
                      key={connector.id}
                    >
                      <Button
                        className="w-full justify-between self-center px-4 py-6 font-sans text-lg font-light capitalize"
                        variant={"outline"}
                        onClick={() =>
                          window.open(
                            `${connector.id === "braavos" ? braavos : argent}`,
                          )
                        }
                      >
                        <div className="flex items-center justify-center">
                          <WalletIcons id={connector.id} />
                          Install {connector.id}
                        </div>
                      </Button>
                    </div>
                  );
                }
              }
            })}
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};
