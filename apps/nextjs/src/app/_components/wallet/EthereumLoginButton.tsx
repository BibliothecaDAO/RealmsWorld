"use client";

import type { VariantProps } from "class-variance-authority";
import React from "react";
import EthereumLogo from "@/icons/ethereum.svg";
import { useUIStore } from "@/providers/UIStoreProvider";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useConnect } from "wagmi";
import { Button } from "@realms-world/ui/components/ui/button";
import type { buttonVariants } from "@realms-world/ui/components/ui/button";

export const EthereumLoginButton = ({
  // openAccount = false,
  variant,
  textClass,
  buttonClass,
  children,
}: {
  //openAccount?: boolean;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  textClass?: string;
  buttonClass?: string;
  children?: React.ReactNode;
}) => {
  const { isPending } = useConnect();
  /*const modal = useModal({
    onConnect() {
      !isAccountOpen && openAccount && toggleAccount();
    },
  });*/
  const { /*isAccountOpen,*/ toggleAccount } = useUIStore((state) => state);

  return (
    <ConnectButton.Custom>
      {({ openConnectModal, chain, account, mounted }) => {
        const connected = mounted && account && chain;
        return (
          <Button
            className={buttonClass}
            variant={variant ?? "outline"}
            size="sm"
            onClick={connected ? toggleAccount : openConnectModal}
          >
            <span className="flex items-center font-sans normal-case">
              <EthereumLogo className="w-6" />
              <span className={`pl-2 ${textClass ?? "sm:block"}`}>
                {connected ? (
                  account.displayName
                ) : (
                  <>
                    {children ?? "Ethereum"}
                    {isPending && (
                      <div className="absolute right-0">
                        <svg
                          aria-hidden="true"
                          className="h-5 w-5 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        ></svg>
                      </div>
                    )}
                  </>
                )}
              </span>
            </span>
          </Button>
        );
      }}
    </ConnectButton.Custom>
  );
};
