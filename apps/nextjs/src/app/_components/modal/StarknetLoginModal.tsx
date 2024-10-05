"use client";
import { useEffect } from "react";
import { useUIStore } from "@/providers/UIStoreProvider";
import { useAccount, useConnect } from "@starknet-react/core";

import { Dialog, DialogContent, DialogHeader } from "@realms-world/ui/components/ui/dialog";
import { Button } from "@realms-world/ui/components/ui/button";
import WalletIcons from "../wallet/WalletIcons";
import { Loader2 } from "lucide-react";

export const StarknetLoginModal = () => {
  const { connectAsync, connectors } = useConnect();
  const {
    isStarknetLoginOpen,
    toggleStarknetLogin,
    toggleAccount,
    isAccountOpen,
  } = useUIStore((state) => state);
  const { isConnected, isConnecting } = useAccount();



  const wallets = [
    {
      id: "argentX",
      name: "Argent X",
      downloads: {
        chrome:
          "https://chrome.google.com/webstore/detail/argent-x-starknet-wallet/dlcobpjiigpikoobohmabehhmhfoodbb",
        firefox: "https://addons.mozilla.org/en-US/firefox/addon/argent-x",
        edge: "https://microsoftedge.microsoft.com/addons/detail/argent-x/ajcicjlkibolbeaaagejfhnofogocgcj",
      },
      website: "https://www.argent.xyz/argent-x/",
    },
    {
      id: "argentMobile",
      name: "Argent (mobile)",
      website: "https://www.argent.xyz/argent-x/",
    },
    {
      id: "argentWebWallet",
      name: "Email",
      website: "https://www.argent.xyz/argent-x/",
    },
    {
      id: "braavos",
      name: "Braavos",
      downloads: {
        chrome:
          "https://chrome.google.com/webstore/detail/braavos-wallet/jnlgamecbpmbajjfhmmmlhejkemejdma",
        firefox:
          "https://addons.mozilla.org/en-US/firefox/addon/braavos-wallet",
        edge: "https://microsoftedge.microsoft.com/addons/detail/braavos-wallet/hkkpjehhcnhgefhbdcgfkeegglpjchdc",
      },
      website: "https://braavos.app/",
    },
  ];
  function getBrowser(userAgent: string): string | undefined {
    if (userAgent.includes("Chrome")) {
      return "chrome";
    } else if (userAgent.includes("Firefox")) {
      return "firefox";
    } else {
      return undefined;
    }
  }
  const getConnectorDiscovery = (id: string) => {
    const walletData = wallets.find((wallet) => wallet.id === id);

    if (!walletData?.website) return "https://www.starknet-ecosystem.com"; // if no website is found, return the ecosystem website

    if (walletData.downloads && typeof navigator !== "undefined") {
      const browser = getBrowser(navigator.userAgent);
      return walletData.downloads[browser as keyof typeof walletData.downloads];
    }

    return walletData.website;
  };

  useEffect(() => {
    if (isConnected && isStarknetLoginOpen) {
      toggleStarknetLogin();
      if (!isAccountOpen) toggleAccount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  return (
    <Dialog open={isStarknetLoginOpen} onOpenChange={toggleStarknetLogin}>
      <DialogContent className="w-full min-w-[350px] !pt-8">
        {/*<motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.4,
          }}
          //className="fixed top-0 left-0 z-50 h-full w-72 bg-grey-11 md:w-[70vw]"
        >*/}
        <DialogHeader>
          <h6 className="-mt-3 mb-6 text-base">Connect Starknet Wallet</h6>
        </DialogHeader>
        <div className="flex flex-col space-y-2 self-center">
          {connectors.map((connector) => {
            const connectorInfo = wallets.find(
              (wallet) => wallet.id === connector.id,
            );
            return (
              <div className="mt-5 flex justify-center" key={connector.id}>
                <Button
                  className="w-full justify-between self-center px-4 py-6 font-sans text-lg font-light capitalize"
                  variant={"outline"}
                  onClick={() =>
                    connector.available
                      ? connectAsync({ connector })
                      : window.open(getConnectorDiscovery(connector.id))
                  }
                >
                  <div className="flex items-center justify-center">
                    {isConnecting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <WalletIcons id={connector.id} />}

                    {!connector.available ? "Install " : ""}
                    {connectorInfo?.name
                      ? `${connectorInfo.name}`
                      : "Login with Email"}
                  </div>
                </Button>
              </div>
            );
          })}
        </div>
        {/*</motion.div>*/}
      </DialogContent>
    </Dialog>
  );
};
