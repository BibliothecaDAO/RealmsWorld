import React from "react";
import Link from "next/link";
import {
  ETHERSCAN_TX_URL,
  STARKSCAN_ETH_TX_URL,
  STARKSCAN_TX_URL,
  VOYAGER_TX_URL,
} from "@/constants/env";
import { ActionType } from "@/constants/transferSteps";
import EtherscanLogo from "@/icons/etherscan.svg";
import StarkScanLogo from "@/icons/starkscan.svg";
import VoyagerLogo from "@/icons/voyager.svg";
import { evaluate } from "@starkware-industries/commons-js-utils";

import { Button } from "@realms-world/ui/components/ui/button";

interface Transfer {
  type: (typeof ActionType)[keyof typeof ActionType];
  l2hash?: string;
  l1hash?: string;
}
interface ButtonProps {
  className?: string;
  onClick?: () => void;
}
interface TransactionSubmittedModalButtonProps {
  transfer: Transfer;
  buttonProps?: ButtonProps;
}
const TransactionSubmittedModalButton = ({
  transfer,
  buttonProps,
}: TransactionSubmittedModalButtonProps) => {
  const { type, l2hash, l1hash } = transfer;
  const isTransferCompleted = l1hash && l2hash;

  let explorers;

  if (type === ActionType.TRANSFER_TO_L2 || isTransferCompleted) {
    explorers = [
      {
        name: "Etherscan",
        url: ETHERSCAN_TX_URL(l1hash),
        logo: <EtherscanLogo className="h-5 w-5" />,
      },
      {
        name: "StarkScan",
        url: STARKSCAN_ETH_TX_URL(l1hash),
        logo: <StarkScanLogo className="h-5 w-5" />,
      },
    ];
  }

  if (type === ActionType.TRANSFER_TO_L1 && !isTransferCompleted) {
    explorers = [
      {
        name: "Voyager",
        url: VOYAGER_TX_URL(l2hash),
        logo: <VoyagerLogo />,
      },
      {
        name: "StarkScan",
        url: STARKSCAN_TX_URL(l2hash),
        logo: <StarkScanLogo />,
      },
    ];
  }

  return explorers?.map((explorer) => (
    <Button
      key={explorer.name}
      className="w-full normal-case"
      variant={"outline"}
      size={"lg"}
      asChild
      {...buttonProps}
    >
      <Link href={explorer.url} target="_blank">
        {evaluate("View on {{explorer}}", { explorer: explorer.name })}
      </Link>
    </Button>
  ));
};

export default TransactionSubmittedModalButton;
