import {
  isOnChain,
  isRejected,
  NetworkType,
  TransactionStatus,
  TransactionStatusFriendlyMessage,
  TransactionStatusStep,
} from "@starkware-industries/commons-js-enums";
import { getFullTime } from "@starkware-industries/commons-js-utils";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

//import { useColors, useEnvs, useTransferLogTranslation } from "../../../hooks";
//import { useTransfer } from "@/app/providers/TransferProvider";
import { STARKSCAN_TX_URL, STARKSCAN_ETH_TX_URL } from "@/constants/env";
import { Button } from "./ui/button";
import LordsIcon from "@/icons/lords.svg";
import { cn } from "../lib/utils";
import { ActionType } from "@/constants/transferSteps";
import { ExternalLinkIcon } from "lucide-react";
import { DepositEvent } from "@/.graphclient";
import { formatEther } from "viem";

/*interface Transfer {
  status: TransactionStatus;
  symbol: string;
  timestamp: number;
  name: string;
  depositEvents
  amount: string;
  l1hash: string;
  l2hash: string;
  type: number;
}*/

export const TransferLog = ({
  transfer,
  isL1,
  onCompleteTransferClick,
}: {
  transfer: any;
  isL1: boolean;
  onCompleteTransferClick: () => void;
}) => {
  const { l1Recipent, depositEvents } = transfer;
  const {
    status,
    id,
    l2Recipient,
    amount,
    createdTxHash: l1hash,
    finishedTxHash,
    finishedAtDate: timestamp,
  }: DepositEvent = depositEvents?.[0];
  const l2hash = "0xtest";
  const [sign, setSign] = useState("");
  //const { action, isL1 } = useTransfer();
  const action = isL1 ? 1 : 2;
  useEffect(() => {
    setSign(transfer.type === action ? "-" : "+");
  }, [action]);
  const d = new Date(parseInt(timestamp));
  console.log(timestamp, d.getFullYear());

  const typedStatus = status as TransactionStatus;

  const renderTransferStatus = () => {
    return (
      <div
        className={cn("text-gray h-6", isRejected(typedStatus) && "text-red")}
      >
        {!isOnChain(typedStatus)
          ? TransactionStatusFriendlyMessage[
              typedStatus || TransactionStatus.NOT_RECEIVED
            ]
          : ""}
      </div>
    );
  };

  const renderL1TxButton = () => {
    return !l1hash && isL1 && isOnChain(typedStatus) ? (
      <CompleteTransferButton onClick={onCompleteTransferClick} />
    ) : (
      <Button
        className="mr-2 justify-between normal-case"
        size={"xs"}
        variant={"outline"}
        disabled={!l1hash}
        external
        href={STARKSCAN_ETH_TX_URL(l1hash)}
      >
        <span>{`${NetworkType.L1} Tx`}</span>
        <ExternalLinkIcon className="w-3 h-3 ml-2" />
      </Button>
    );
  };

  const renderL2TxButton = () => {
    return (
      <Button
        className="mr-2 justify-between normal-case"
        size={"xs"}
        variant={"outline"}
        disabled={
          !l2hash ||
          !status ||
          TransactionStatusStep[typedStatus] <
            TransactionStatusStep[TransactionStatus.RECEIVED]
        }
        rel="noopener noreferrer"
        external
        href={STARKSCAN_TX_URL(l2hash)}
      >
        <span>{`${NetworkType.L2} Tx`}</span>
        <ExternalLinkIcon className="w-3 h-3 ml-2" />
      </Button>
    );
  };

  return (
    <>
      <div className="flex justify-between py-4 px-2 relative">
        <div className="flex">
          <LordsIcon className="fill-white w-6 h-6 mr-3" />
          <div>
            <div className="text-lg font-semibold">Lords</div>
            <div className="text-gray-400">{`${getFullTime(
              timestamp * 1000
            )}`}</div>
          </div>
        </div>
        <div className="flex flex-col items-end justify-around">
          <div className="text-lg font-semibold">
            {sign} {formatEther(amount)} LORDS
          </div>
          {renderTransferStatus()}
          <div className="flex justify-around items-center my-2">
            {renderL1TxButton()}
            {renderL2TxButton()}
          </div>
        </div>
      </div>
    </>
  );
};

const CompleteTransferButton = ({ onClick }: { onClick: any }) => {
  return (
    <Button
      variant={"outline"}
      className="border-orange text-orange"
      size={"lg"}
      onClick={onClick}
    >
      Complete Transfer
    </Button>
  );
};

CompleteTransferButton.propTypes = {
  onClick: PropTypes.func,
};

TransferLog.propTypes = {
  transfer: PropTypes.object,
  onCompleteTransferClick: PropTypes.func,
  onTxClick: PropTypes.func,
};
