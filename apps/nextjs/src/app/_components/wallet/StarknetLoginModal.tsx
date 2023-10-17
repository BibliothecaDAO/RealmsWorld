import { useEffect, useMemo, useState } from "react";
import { useUIContext } from "@/app/providers/UIProvider";
import { useAccount, useConnectors } from "@starknet-react/core";
import { motion } from "framer-motion";
//import { Mail } from "lucide-react";
import type { WalletProvider } from "get-starknet-core";
import getDiscoveryWallets from "get-starknet-core";

import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import WalletIcons from "./WalletIcons";

export const StarknetLoginModal = () => {
  const { connect, connectors } = useConnectors();
  const {
    isStarknetLoginOpen,
    toggleStarknetLogin,
    toggleAccount,
    isAccountOpen,
  } = useUIContext();
  const { isConnected } = useAccount();

  const [braavos, setBraavos] = useState<string>("");
  const combinations = [
    [0, 1, 2],
    [0, 2, 1],
    [1, 0, 2],
    [1, 2, 0],
    [2, 0, 1],
    [2, 1, 0],
  ];
  const rand = useMemo(() => Math.floor(Math.random() * 6), []);
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

    getWallets();
  }, []);

  useEffect(() => {
    if (isConnected && isStarknetLoginOpen) {
      toggleStarknetLogin();
      !isAccountOpen && toggleAccount();
    }
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
            {combinations[rand]?.map((index) => {
              const connector = connectors[index];
              if (connector?.available()) {
                return (
                  <div className="mt-5 flex justify-center" key={connector.id}>
                    <Button
                      className="w-full justify-between self-center px-4 py-6 font-sans text-lg font-light capitalize"
                      variant={"outline"}
                      onClick={() => connect(connector)}
                    >
                      <div className="flex items-center justify-center">
                        <WalletIcons id={connector.id} />
                        {connector.id === "braavos" ||
                        connector.id === "argentX"
                          ? `Connect ${connector.name}`
                          : "Login with Email"}
                      </div>
                    </Button>
                  </div>
                );
              } else {
                if (
                  connector?.id === "braavos" ||
                  connector?.id === "argentX"
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

            {/*connectors.map((connector) => {
              if (connector.available()) {
                return (
                  <Button
                    className="self-center w-full justify-between px-4 capitalize text-lg font-light py-6 font-sans"
                    variant={"outline"}
                    size={"lg"}
                    key={connector.id}
                    onClick={() => connect(connector)}
                  >
                    {connector.id.replace(/([A-Z])/g, " $1") ??
                      "Continue with email"}
                    {connector.icon ? (
                      <img className="w-6 mr-3" src={connector.icon} alt="" />
                    ) : (
                      <Mail className="mr-3 " />
                    )}
                  </Button>
                );
              }
            })*/}
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};
