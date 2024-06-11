"use client";

import type { VariantProps } from "class-variance-authority";
import React from "react";
import StarknetLogo from "@/icons/starknet.svg";
import { useUIStore } from "@/providers/UIStoreProvider";
import { shortenHex } from "@/utils/utils";
import { useAccount as useL2Account } from "@starknet-react/core";

import type { buttonVariants } from "@realms-world/ui";
import { Button } from "@realms-world/ui";

export const StarknetLoginButton = ({
  openAccount = false,
  variant,
  textClass,
  buttonClass,
  children,
}: {
  openAccount?: boolean;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  textClass?: string;
  buttonClass?: string;
  children?: React.ReactNode;
}) => {
  const { address, isConnected } = useL2Account();
  const { toggleAccount, toggleStarknetLogin } = useUIStore((state) => state);

  const onConnectClick = () => {
    return !isConnected
      ? toggleStarknetLogin()
      : openAccount && toggleAccount();
  };

  return (
    <Button
      className={buttonClass}
      variant={variant ?? "outline"}
      size="sm"
      onClick={onConnectClick}
    >
      <span className="flex items-center font-sans normal-case">
        <StarknetLogo className="h-6 w-6" />
        <span className={`pl-2 ${textClass ?? "sm:block"}`}>
          {address && isConnected ? (
            <>{shortenHex(address, 8)}</>
          ) : (
            children ?? "Starknet"
          )}
        </span>
      </span>
    </Button>
  );
};
