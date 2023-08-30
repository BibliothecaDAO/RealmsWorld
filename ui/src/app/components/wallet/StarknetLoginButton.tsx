import React from "react";
import { Button } from "../ui/button";
import StarknetLogo from "@/icons/starknet.svg";
import { useUIContext } from "@/app/providers/UIProvider";
import { shortenHex } from "@/functions/utils";
import {
  useConnectors,
  useAccount as useL2Account,
  useNetwork,
} from "@starknet-react/core";

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
      <span className="normal-case font-sans flex items-center">
        <StarknetLogo className="mx-2 w-6 h-6" />

        {address && isConnected ? (
          <>{shortenHex(address, 8)}</>
        ) : (
          "Connect Starknet"
        )}
      </span>
    </Button>
  );
};
