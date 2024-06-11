"use client";

import React from "react";
import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import Starknet from "@/icons/starknet.svg";
import { shortenHex } from "@/utils/utils";
import { useAccount, useDisconnect, useStarkName } from "@starknet-react/core";
import { LogOut } from "lucide-react";

import { CHAIN_IDS_TO_NAMES } from "@realms-world/constants";
import { Button } from "@realms-world/ui";

import { CopyButton } from "../CopyButton";
import { ExplorerLink } from "./ExplorerLink";
import { StarknetLoginButton } from "./StarknetLoginButton";

export const StarkAccount = () => {
  const { disconnect } = useDisconnect();
  const { status, address } = useAccount();

  const { data } = useStarkName({ address });
  const displayStarkAddress = data ?? shortenHex(address ?? "", 8);

  const isConnected = status === "connected";

  if (isConnected && address) {
    return (
      <div className="flex w-full justify-between border-t p-2">
        <div className="flex py-1 text-lg">
          <Starknet className="mr-3 w-7" />
          <CopyButton text={address} displayText={displayStarkAddress} />
        </div>
        <div className="flex items-center space-x-2">
          <ExplorerLink />
          <Button variant="outline" size="xs" onClick={() => disconnect()}>
            <LogOut className="w-4 self-center" />
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="mb-3 w-full self-center pl-2">
      <StarknetLoginButton>
        Login to {CHAIN_IDS_TO_NAMES[SUPPORTED_L2_CHAIN_ID]}
      </StarknetLoginButton>
    </div>
  );
};

export default StarkAccount;
