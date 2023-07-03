import {
  evaluate,
} from "@starkware-industries/commons-js-utils";
import PropTypes from "prop-types";
import React from "react";
import { useTransferLog } from "@/app/providers/TransferLogProvider";
import { TransferLog } from "@/app/components/TransferLog";
import { Button } from "../components/ui/button";
import { ETHERSCAN_ACCOUNT_URL, STARKSCAN_ACCOUNT_URL } from "@/constants/env";
import { useAccount } from "wagmi";
import { useAccount as useL2Account } from "@starknet-react/core";
import { ExternalLinkIcon } from "lucide-react";
import { useCompleteTransferToL1 } from "@/composables/useTransferToL1";

export const Account = ({ isL1 }: { isL1: boolean }) => {
  const { address } = useAccount();
  const { address: l2address } = useL2Account();
  const { transfers /*, fetchNextPage, isLoading*/ } = useTransferLog(isL1);
  const completeTransferToL1 = useCompleteTransferToL1();

  const renderTransfers = () => {
    return transfers && transfers.length
      ? transfers.map((transfer: any, index: number) => (
        <TransferLog
          isL1={isL1}
          key={index}
          transfer={transfer}
          onCompleteTransferClick={() => onCompleteTransferClick(transfer)}
        />
      ))
      : null;
  };

  const onCompleteTransferClick = (transfer: any) => {
    completeTransferToL1(transfer);
  };

  const renderExplorers = () => {
    const explorersL1 = [
      { text: "Account", url: ETHERSCAN_ACCOUNT_URL(address) },
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
          >
            <span>{text} </span>
            <ExternalLinkIcon className="w-3 h-3 ml-2" />
          </Button>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h5 className="flex justify-between ">
        {isL1 ? "Mainnet" : "Starknet"}  {evaluate("", { network: isL1 ? "L1" : "L2" })} {renderExplorers()}
      </h5>
      <div className="overflow-y-scroll max-h-[700px] h-full p-2 border border-white/20 rounded">
        {renderTransfers()}
      </div>
    </div>
  );
};

Account.propTypes = {
  transferId: PropTypes.string,
};
