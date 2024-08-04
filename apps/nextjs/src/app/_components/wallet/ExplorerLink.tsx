import Link from "next/link";
import {
  ETHERSCAN_ACCOUNT_URL,
  ETHERSCAN_TX_URL,
  STARKSCAN_ACCOUNT_URL,
  STARKSCAN_TX_URL,
  SUPPORTED_L1_CHAIN_ID,
} from "@/constants/env";
import { ExternalLinkIcon } from "lucide-react";

import type { ChainId } from "@realms-world/constants";
import { Button } from "@realms-world/ui";

export const ExplorerLink = ({
  chainId,
  text,
  type = "tx",
  hash,
}: {
  chainId: ChainId;
  text?: string;
  type?: "account" | "tx";
  hash: string;
}) => {
  const isL1 = chainId === SUPPORTED_L1_CHAIN_ID;

  const explorerURL = isL1
    ? type === "tx"
      ? ETHERSCAN_TX_URL(hash)
      : ETHERSCAN_ACCOUNT_URL(hash)
    : type === "tx"
      ? STARKSCAN_TX_URL(hash)
      : STARKSCAN_ACCOUNT_URL(hash);

  return (
    <Button key={text} variant={"outline"} size={"xs"} asChild>
      <Link href={explorerURL} target="_blank">
        {text ?? isL1 ? "Etherscan" : "Starkscan"}
        <ExternalLinkIcon className="h-4" />
      </Link>
    </Button>
  );
};
