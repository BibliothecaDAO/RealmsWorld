import React from "react";
import { useUIContext } from "@/app/providers/UIProvider";
import StarknetLogo from "@/icons/starknet.svg";
import { shortenHex } from "@/utils/utils";
import { useAccount as useL2Account } from "@starknet-react/core";
import type { VariantProps } from "class-variance-authority";

import type { buttonVariants } from "../ui/button";
import { Button } from "../ui/button";

export const StarknetLoginButton = ({
  openAccount = false,
  variant,
  textClass,
  buttonClass,
}: {
  openAccount?: boolean;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  textClass?: string;
  buttonClass?: string;
}) => {
  const { address, isConnected } = useL2Account();
  const { isAccountOpen, toggleAccount, toggleStarknetLogin } = useUIContext();

  const onConnectClick = () => {
    return !isConnected
      ? toggleStarknetLogin()
      : openAccount && toggleAccount();
  };

  return (
    <Button
      className={
        buttonClass +
        " outline-bright-yellow rounded-none px-1 outline outline-2 outline-offset-[3px]"
      }
      variant={variant ?? "outline"}
      size="lg"
      onClick={onConnectClick}
    >
      <span className="flex items-center font-sans normal-case">
        <StarknetLogo className="h-6 w-6" />

        {address && isConnected ? (
          <>{shortenHex(address, 8)}</>
        ) : (
          <span className={`hidden pl-2 ` + textClass ?? "sm:block"}>
            Starknet
          </span>
        )}
      </span>
    </Button>
  );
};
