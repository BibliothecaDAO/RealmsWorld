import React, { useEffect, useState } from "react";
import type { DepositEvent, WithdrawalEvent } from "@/.graphclient";
import { Button } from "@/app/_components/ui/button";
import {
  NETWORK_NAME,
  STARKSCAN_ETH_TX_URL,
  STARKSCAN_TX_URL,
} from "@/constants/env";
import { ChainType, tokens } from "@/constants/tokens";
import LordsIcon from "@/icons/lords.svg";
import { cn } from "@/utils/utils";
import { useNetwork } from "@starknet-react/core";
import type { ChainTypeL2 } from "@starkware-industries/commons-js-enums";
import {
  isOnChain,
  isRejected,
  NetworkType,
  TransactionHashPrefix,
  TransactionStatus,
  TransactionStatusFriendlyMessage,
  TransactionStatusStep,
} from "@starkware-industries/commons-js-enums";
import {
  getFullTime,
  getTransactionHash,
} from "@starkware-industries/commons-js-utils";
import {
  ExternalLinkIcon,
  MinusCircleIcon,
  PlusCircleIcon,
} from "lucide-react";
import PropTypes from "prop-types";
import { formatEther } from "viem";

export const TransferLog = ({
  transfer,
  isL1,
  onCompleteTransferClick,
}: {
  transfer: any;
  isL1: boolean;
  onCompleteTransferClick: () => void;
}) => {
  const [sign, setSign] = useState("");
  const { chain } = useNetwork();
  const [l2hash, setL2hash] = useState("");
  const { l1Recipent, depositEvents, withdrawalEvents, createdTimestamp } =
    transfer;

  const {
    status,
    id,
    //l2Recipient,
    amount,
    createdTxHash,
    finishedTxHash: l1hash,
    finishedAtDate,
  }: DepositEvent | WithdrawalEvent = depositEvents?.[0] ||
  withdrawalEvents?.[0] ||
  transfer;

  const getl2hash = async () => {
    const hash = depositEvents?.[0].payload
      ? await getTransactionHash(
          TransactionHashPrefix.L1_HANDLER,
          tokens.L1.LORDS.bridgeAddress?.[ChainType.L1[NETWORK_NAME]],
          tokens.L2.LORDS.bridgeAddress?.[ChainType.L2[NETWORK_NAME]],
          "0x02d757788a8d8d6f21d1cd40bce38a8222d70654214e96ff95d8086e684fbee5",
          depositEvents?.[0].payload,
          ("SN_" + NETWORK_NAME) as ChainTypeL2,
          depositEvents?.[0].nonce,
        )
      : "";
    setL2hash(hash);
  };

  useEffect(() => {
    const action = isL1 ? 1 : 2;
    const type = depositEvents ? 1 : 2;
    setSign(type === action ? "-" : "+");
  }, [isL1, depositEvents]);

  useEffect(() => {
    getl2hash();
  }, [depositEvents?.[0].payload]);

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

  const needsActions = !l1hash && isL1 && isOnChain(typedStatus);

  const renderL1TxButton = () => {
    return needsActions ? (
      <CompleteTransferButton onClick={onCompleteTransferClick} />
    ) : (
      <Button
        className=" justify-between normal-case"
        size={"xs"}
        variant={"outline"}
        disabled={!l1hash}
        href={STARKSCAN_ETH_TX_URL(l1hash)}
      >
        <span>{`${NetworkType.L1} Tx`}</span>
        <ExternalLinkIcon className="ml-2 h-3 w-3" />
      </Button>
    );
  };

  const renderL2TxButton = () => {
    return (
      <Button
        className=" justify-between normal-case"
        size={"xs"}
        variant={"outline"}
        disabled={
          !depositEvents?.[0].payload ||
          !status ||
          TransactionStatusStep[typedStatus] <
            TransactionStatusStep[TransactionStatus.RECEIVED]
        }
        rel="noopener noreferrer"
        href={STARKSCAN_TX_URL(l2hash)}
      >
        <span>{`${NetworkType.L2} Tx`}</span>
        <ExternalLinkIcon className="ml-2 h-3 w-3" />
      </Button>
    );
  };

  return (
    <div className="relative my-1 flex justify-between rounded border border-white/20 p-4">
      <div className="flex self-center">
        {sign == "-" ? (
          <MinusCircleIcon className="mr-1 self-center fill-red-300 stroke-red-900" />
        ) : (
          <PlusCircleIcon className="mr-1 self-center fill-green-300 stroke-green-900" />
        )}{" "}
        <div className="ml-3">
          <div className="mb-2 text-xs font-semibold text-gray-600">{`${
            transfer.timestamp || getFullTime(createdTimestamp * 1000)
          }`}</div>
          <div className="flex text-2xl font-semibold">
            {transfer.amount ? amount : formatEther(amount || 0)}
            <LordsIcon className="ml-3 h-5 w-5 self-center fill-white" />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-around">
        {renderTransferStatus()}
        <div className="my-1 flex items-center space-x-2">
          {renderL1TxButton()}
          {renderL2TxButton()}
        </div>
      </div>
    </div>
  );
};

const CompleteTransferButton = ({ onClick }: { onClick: any }) => {
  return (
    <Button variant={"outline"} size={"xs"} onClick={onClick}>
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
