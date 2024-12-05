"use client";

import type ControllerConnector from "@cartridge/connector/controller";
import type { buttonVariants } from "@realms-world/ui/components/ui/button";
import type { VariantProps } from "class-variance-authority";
import React from "react";
import StarknetLogo from "@/icons/starknet.svg";
import { useUIStore } from "@/providers/UIStoreProvider";
import { shortenHex } from "@/utils/utils";
import { Button } from "@realms-world/ui/components/ui/button";
import { useAccount } from "@starknet-react/core";
import { Loader, User } from "lucide-react";

export const StarknetLoginButton = ({
  openAccount = false,
  variant,
  textClass,
  buttonClass,
  children,
  newTransactionCount,
}: {
  openAccount?: boolean;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  textClass?: string;
  buttonClass?: string;
  children?: React.ReactNode;
  newTransactionCount?: number;
}) => {
  const { address, isConnected, isConnecting, connector } = useAccount();
  const { toggleAccount, toggleStarknetLogin } = useUIStore((state) => state);

  const onConnectClick = () => {
    if (!isConnected) {
      return toggleStarknetLogin();
    }

    if (connector?.id === "controller") {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      (connector as unknown as ControllerConnector).controller.openProfile(
        "inventory",
      );
    } else if (openAccount) {
      toggleAccount();
    }
  };

  return (
    <>
      <Button
        className={buttonClass}
        variant={variant ?? "outline"}
        size="sm"
        onClick={onConnectClick}
        disabled={isConnecting}
      >
        <span className="flex items-center font-sans normal-case">
          <StarknetLogo className="h-6 w-6" />
          <span className={`pl-2 ${textClass ?? "sm:block"}`}>
            {isConnecting && <Loader className="animate-spin" />}
            {address ? (
              <>{shortenHex(address, 8)}</>
            ) : (
              <>{children ?? "Starknet"}</>
            )}
          </span>
        </span>
        {isConnected && newTransactionCount && newTransactionCount > 0 ? (
          <span
            className={
              "absolute -right-1.5 -top-1.5 w-[20px] rounded-full bg-green-600 text-black"
            }
          >
            {newTransactionCount}
          </span>
        ) : null}
      </Button>
      {connector?.id === "controller" ? (
        <Button size="sm" onClick={() => openAccount && toggleAccount()}>
          <User />
        </Button>
      ) : null}
    </>
  );
};
