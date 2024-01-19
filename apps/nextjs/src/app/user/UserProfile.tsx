"use client";

import { useStarkDisplayName } from "@/hooks/useStarkName";
import EthereumLogo from "@/icons/ethereum.svg";
import Starknet from "@/icons/starknet.svg";
import { shortenHex } from "@/utils/utils";
import { useAccount as useL2Account } from "@starknet-react/core";
import { useAccount as useL1Account } from "wagmi";

export const UserProfile = ({
  l1Address,
  l2Address,
}: {
  l1Address?: string;
  l2Address?: string;
}) => {
  const { address: l1Account } = useL1Account();
  const { address: l2Account } = useL2Account();

  const l1Shown = l1Address ?? l1Account;
  const l2Shown = l2Address ?? l2Account;

  const starkName = useStarkDisplayName(l2Shown);
  return (
    <h5>
      {l2Shown && (
        <div className="flex">
          <Starknet className="mr-2 w-6" /> {starkName}
        </div>
      )}
      {l1Shown && (
        <div className="flex">
          <EthereumLogo className="ml-[2px] mr-2 w-[22px]" />
          {shortenHex(l1Shown)}
        </div>
      )}
    </h5>
  );
};
