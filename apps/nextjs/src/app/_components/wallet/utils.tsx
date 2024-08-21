import Link from "next/link";
import { ETHERSCAN_ACCOUNT_URL, STARKSCAN_ACCOUNT_URL } from "@/constants/env";
import { shortenHex } from "@/utils/utils";
import { useAccount as useL2Account } from "@starknet-react/core";
import { ExternalLinkIcon } from "lucide-react";
import { useAccount } from "wagmi";

import { Button } from "@realms-world/ui";

export const RenderExplorers = ({ isL1 = true }) => {
  const { address } = useAccount();
  const { address: l2address } = useL2Account();

  const explorersL1 = [{ text: address, url: ETHERSCAN_ACCOUNT_URL(address as string) }];
  const explorersL2 = [
    { text: l2address, url: STARKSCAN_ACCOUNT_URL(l2address as string) },
  ];
  const explorers = isL1 ? explorersL1 : explorersL2;

  return (
    <div>
      {explorers.map(({ text, url }, index) => (
        <Button
          className="mr-2 justify-between normal-case"
          key={index}
          size={"xs"}
          variant={"outline"}
        >
          <Link target="_blank" href={url}>
            <span>{shortenHex(text ?? "", 8)} </span>
            <ExternalLinkIcon className="ml-2 h-3 w-3" />
          </Link>
        </Button>
      ))}
    </div>
  );
};
