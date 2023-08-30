import React from "react";
import { ConnectKitButton, useModal } from "connectkit";
import { Button } from "../ui/button";
import EthereumLogo from "@/icons/ethereum.svg";
import { useConnect } from "wagmi";
import { useUIContext } from "@/app/providers/UIProvider";

export const EthereumLoginButton = ({
  openAccount = false,
}: {
  openAccount?: boolean;
}) => {
  const { connectors, isLoading } = useConnect();
  const modal = useModal({
    onConnect() {
      !isAccountOpen && openAccount && toggleAccount();
    },
  });
  const { isAccountOpen, toggleAccount } = useUIContext();

  if (!connectors) {
    return null;
  }

  return (
    <ConnectKitButton.Custom>
      {({ show, isConnected, isConnecting, truncatedAddress, ensName }) => (
        <Button className="px-3" variant="outline" size="lg" onClick={show}>
          <span className="normal-case font-sans flex items-center">
            <EthereumLogo className="w-8 mr-2 -ml-1" />
            {isConnected ? (
              ensName ?? truncatedAddress
            ) : (
              <>
                <span>Connect Ethereum Wallet</span>
                {isConnecting ||
                  (isLoading && (
                    <div className="right-0 absolute mr-8">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      ></svg>
                    </div>
                  ))}
              </>
            )}
          </span>
        </Button>
      )}
    </ConnectKitButton.Custom>
  );
};
