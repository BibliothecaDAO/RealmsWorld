import Link from "next/link";
import { ETHERSCAN_ACCOUNT_URL, STARKSCAN_ACCOUNT_URL } from "@/constants/env";
import { useAccount as useL2Account } from "@starknet-react/core";
import { ExternalLinkIcon } from "lucide-react";
import { useAccount } from "wagmi";

import { Button } from "@realms-world/ui";

export const ExplorerLink = ({ isL1 = false }: { isL1?: boolean }) => {
  const { address } = useAccount();
  const { address: l2address } = useL2Account();

  const explorersL1 = [
    { text: "Etherscan", url: ETHERSCAN_ACCOUNT_URL(address) },
  ];
  const explorersL2 = [
    { text: "Account", url: STARKSCAN_ACCOUNT_URL(l2address) },
  ];
  const explorers = isL1 ? explorersL1 : explorersL2;

  return (
    <>
      {explorers.map(({ text, url }) => (
        <Button key={text} variant={"outline"} size={"xs"} asChild>
          <Link href={url} target="_blank">
            <ExternalLinkIcon className="h-4" />
          </Link>
        </Button>
      ))}
    </>
  );
};
