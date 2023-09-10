import React from "react";
import { Button } from "@/app/_components/ui/button";
import { TransferLog } from "@/app/bridge/TransferLog";
import { useTransferLog } from "@/app/providers/TransferLogProvider";
import { ETHERSCAN_ACCOUNT_URL, STARKSCAN_ACCOUNT_URL } from "@/constants/env";
import { useCompleteTransferToL1 } from "@/hooks/useTransferToL1";
import { useAccount as useL2Account } from "@starknet-react/core";
import { evaluate } from "@starkware-industries/commons-js-utils";
import { ExternalLinkIcon } from "lucide-react";
import PropTypes from "prop-types";
import { useAccount } from "wagmi";

export const Account = ({ isL1 }: { isL1: boolean }) => {
  const { address } = useAccount();
  const { address: l2address } = useL2Account();
  const { transfers /*, fetchNextPage, isLoading*/ } = useTransferLog(isL1);
  const completeTransferToL1 = useCompleteTransferToL1();

  const renderTransfers = () => {
    return transfers?.length
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
            <ExternalLinkIcon className="ml-2 h-3 w-3" />
          </Button>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h5 className="flex justify-between ">
        {isL1 ? "Mainnet" : "Starknet"}
        {evaluate("", { network: isL1 ? "L1" : "L2" })} {renderExplorers()}
      </h5>
      <div className="h-full max-h-[700px] overflow-y-scroll rounded border border-white/20 p-2">
        {renderTransfers()}
      </div>
    </div>
  );
};

Account.propTypes = {
  transferId: PropTypes.string,
};
