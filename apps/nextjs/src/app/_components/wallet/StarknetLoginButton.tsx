import React from "react";
import { useUIContext } from "@/app/providers/UIProvider";
import StarknetLogo from "@/icons/starknet.svgr";
import { shortenHex } from "@/utils/utils";
import {
  useConnectors,
  useAccount as useL2Account,
} from "@starknet-react/core";

import { Button } from "../ui/button";

export const StarknetLoginButton = ({
  openAccount = false,
}: {
  openAccount?: boolean;
}) => {
  const { address, isConnected } = useL2Account();
  const { isAccountOpen, toggleAccount, toggleStarknetLogin } = useUIContext();
  const { available, connect } = useConnectors();

  if (!available) {
    return null;
  }

  const onConnectClick = () => {
    return isConnected ? toggleAccount() : toggleStarknetLogin();
  };

  return (
    <Button
      className="px-3"
      variant="outline"
      size="lg"
      onClick={onConnectClick}
    >
      <span className="flex items-center font-sans normal-case">
        <StarknetLogo className="mx-2 h-6 w-6" />

        {address && isConnected ? (
          <>{shortenHex(address, 8)}</>
        ) : (
          "Connect Starknet"
        )}
      </span>
    </Button>
  );
};
