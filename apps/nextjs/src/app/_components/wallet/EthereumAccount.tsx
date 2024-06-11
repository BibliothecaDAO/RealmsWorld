"use client";

import { SUPPORTED_L1_CHAIN_ID } from "@/constants/env";
import EthereumLogo from "@/icons/ethereum.svg";
import { shortenHex } from "@/utils/utils";
import { LogOut } from "lucide-react";
import { useAccount, useConnect, useDisconnect, useEnsName } from "wagmi";

import { CHAIN_IDS_TO_NAMES } from "@realms-world/constants";
import { Button } from "@realms-world/ui";

import { CopyButton } from "../CopyButton";
import { EthereumLoginButton } from "./EthereumLoginButton";
import { ExplorerLink } from "./ExplorerLink";

function EthereumAccount() {
  const { address, isConnected } = useAccount();
  const { error } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: ensAddress } = useEnsName({ address });

  const displayEthAddress = ensAddress ?? shortenHex(address ?? "", 8);

  if (isConnected) {
    return (
      <div className="flex w-full justify-between border-t p-2">
        <div className="flex py-1 text-lg">
          <EthereumLogo className="mr-3 w-7" />
          <CopyButton text={address} displayText={displayEthAddress} />
        </div>
        <div className="flex items-center space-x-2">
          <ExplorerLink isL1 />
          <Button variant="outline" size="xs" onClick={() => disconnect()}>
            <LogOut className="w-4 self-center" />
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="mb-3 ml-2 w-full self-center">
      <EthereumLoginButton>
        Login to {CHAIN_IDS_TO_NAMES[SUPPORTED_L1_CHAIN_ID]}
      </EthereumLoginButton>
      {error && <div>{error.message}</div>}
    </div>
  );
}

export default EthereumAccount;
