import { ETHERSCAN_ACCOUNT_URL, STARKSCAN_ACCOUNT_URL } from "@/constants/env";
import { useAccount as useL2Account, useStarkName } from "@starknet-react/core";
import { shortenAddress } from "@starkware-industries/commons-js-utils";
import { ExternalLinkIcon } from "lucide-react";
import { useAccount, useEnsName } from "wagmi";

import { Button } from "@realms-world/ui";

export const AccountLink = ({ isL1 = false }: { isL1: boolean }) => {
  const { address } = useAccount();
  const { address: l2address } = useL2Account();

  const { data: ensAddress } = useEnsName({ address });

  const { data } = useStarkName({ address: l2address });

  const explorersL1 = [
    { text: "Etherscan", url: ETHERSCAN_ACCOUNT_URL(address) },
  ];
  const explorersL2 = [
    { text: "Account", url: STARKSCAN_ACCOUNT_URL(l2address) },
  ];
  const explorers = isL1 ? explorersL1 : explorersL2;

  const displayEthAddress = ensAddress || shortenAddress(address || "");

  const displayStarkAddress = data || shortenAddress(l2address || "");

  return (
    <div className="mr-2">
      {explorers.map(({ text, url }) => (
        <Button
          className="justify-between normal-case"
          key={text}
          variant={"outline"}
          href={url}
          external
        >
          <span className="hidden sm:block">
            {isL1 ? displayEthAddress : displayStarkAddress}
          </span>
          <ExternalLinkIcon className="ml-4 h-3 w-3" />
        </Button>
      ))}
    </div>
  );
};
