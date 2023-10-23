import React from "react";
import { useUIContext } from "@/app/providers/UIProvider";
import EthereumLogo from "@/icons/ethereum.svgr";
import type { VariantProps } from "class-variance-authority";
import { ConnectKitButton, useModal } from "connectkit";
import { useConnect } from "wagmi";

import type { buttonVariants } from "../ui/button";
import { Button } from "../ui/button";

export const EthereumLoginButton = ({
  openAccount = false,
  variant,
}: {
  openAccount?: boolean;
  variant?: VariantProps<typeof buttonVariants>["variant"];
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
        <Button
          className="px-3"
          variant={variant ?? "outline"}
          size="lg"
          onClick={() => (isConnected ? toggleAccount() : show?.())}
        >
          <span className="flex items-center font-sans normal-case">
            <EthereumLogo className="-ml-1 mr-2 w-6" />
            {isConnected ? (
              ensName ?? truncatedAddress
            ) : (
              <>
                <span>Connect Ethereum</span>
                {isConnecting ||
                  (isLoading && (
                    <div className="absolute right-0 mr-8">
                      <svg
                        aria-hidden="true"
                        className="mr-2 h-5 w-5 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
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
