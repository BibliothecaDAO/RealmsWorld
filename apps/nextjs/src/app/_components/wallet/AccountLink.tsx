import { ETHERSCAN_ACCOUNT_URL, STARKSCAN_ACCOUNT_URL } from "@/constants/env";
import { useAccount as useL2Account } from "@starknet-react/core";
import { ExternalLinkIcon } from "lucide-react";
import { useAccount } from "wagmi";

import { Button } from "../ui/button";

export const AccountLink = ({ isL1 }: { isL1: boolean }) => {
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
    <div className="mr-2">
      {explorers.map(({ text, url }) => (
        <Button
          className="justify-between normal-case"
          key={text}
          size={"xs"}
          variant={"outline"}
          href={url}
          external
        >
          <span className="hidden sm:block">{text} </span>
          <ExternalLinkIcon className="ml-2 h-3 w-3" />
        </Button>
      ))}
    </div>
  );
};
