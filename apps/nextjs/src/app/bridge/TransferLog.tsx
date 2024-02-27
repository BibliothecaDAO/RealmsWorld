/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { DepositEvent, WithdrawalEvent } from "@/.graphclient";
import type { ChainTypeL2 } from "@starkware-industries/commons-js-enums";
import React, { useEffect, useState } from "react";
import {
  NETWORK_NAME,
  STARKSCAN_ETH_TX_URL,
  STARKSCAN_TX_URL,
} from "@/constants/env";
import { ChainType, tokens } from "@/constants/tokens";
import LordsIcon from "@/icons/lords.svg";
import {
  isOnChain,
  isRejected,
  NetworkType,
  TransactionHashPrefix,
  TransactionStatus,
  TransactionStatusFriendlyMessage,
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

import { Button } from "@realms-world/ui";
import { cn } from "@realms-world/utils";

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
  const [l2hash, setL2hash] = useState("");
  const { depositEvents, withdrawalEvents, createdTimestamp } = transfer;

  const {
    status,
    //l2Recipient,
    amount,
    finishedTxHash: l1hash,
  }: DepositEvent | WithdrawalEvent = depositEvents?.[0] ??
  withdrawalEvents?.[0] ??
  transfer;

  useEffect(() => {
    const action = isL1 ? 1 : 2;
    const type = depositEvents ? 1 : 2;
    setSign(type === action ? "-" : "+");
  }, [isL1, depositEvents]);

  useEffect(() => {
    const getl2hash = async () => {
      const hash = depositEvents?.[0].payload
        ? getTransactionHash(
            TransactionHashPrefix.L1_HANDLER,
            tokens.L1.LORDS.bridgeAddress?.[ChainType.L1[NETWORK_NAME]] ?? "",
            tokens.L2.LORDS.bridgeAddress?.[ChainType.L2[NETWORK_NAME]] ?? "",
            "0x02d757788a8d8d6f21d1cd40bce38a8222d70654214e96ff95d8086e684fbee5",
            depositEvents?.[0].payload,
            ("SN_" + NETWORK_NAME) as ChainTypeL2,
            depositEvents?.[0].nonce,
          )
        : transfer.hash;
      setL2hash(hash);
    };

    if (depositEvents?.[0].payload) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      getl2hash();
    }
  }, [depositEvents, transfer]);

  const typedStatus = status as TransactionStatus;

  const renderTransferStatus = () => {
    return (
      <div
        className={cn(
          "text-gray mb-1 text-sm",
          isRejected(typedStatus) && "text-red",
        )}
      >
        {!isOnChain(typedStatus)
          ? TransactionStatusFriendlyMessage[
              typedStatus ?? TransactionStatus.NOT_RECEIVED
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
        disabled={!l2hash}
        rel="noopener noreferrer"
        href={STARKSCAN_TX_URL(l2hash)}
      >
        <span>{`${NetworkType.L2} Tx`}</span>
        <ExternalLinkIcon className="ml-2 h-3 w-3" />
      </Button>
    );
  };

  return (
    <div className="m-1 flex flex-col rounded border p-2 sm:p-3">
      <div className="mb-1 flex justify-between">
        <div className="text-xs font-semibold text-gray-600">{`${
          transfer.timestamp
            ? getFullTime(transfer.timestamp)
            : getFullTime(createdTimestamp * 1000)
        }`}</div>
        {renderTransferStatus()}
      </div>
      <div className="flex w-full items-center justify-between gap-x-2 self-center">
        {sign == "-" ? (
          <MinusCircleIcon className="self-center fill-red-300 stroke-red-900" />
        ) : (
          <PlusCircleIcon className="self-center fill-green-300 stroke-green-900" />
        )}
        <div className="flex font-semibold sm:text-xl">
          <span className="max-w-[120px] overflow-hidden text-ellipsis">
            {transfer.amount ? amount : formatEther(amount ?? 0)}
          </span>
          <LordsIcon className="mx-1.5 h-5 w-5 self-center fill-white" />
        </div>
        <div className="flex-grow" />
        <div className="flex flex-col items-end justify-around">
          <div className="flex items-center space-x-2">
            {renderL1TxButton()}
            {renderL2TxButton()}
          </div>
        </div>
      </div>
    </div>
  );
};

const CompleteTransferButton = ({ onClick }: { onClick: any }) => {
  return (
    <Button
      variant={"outline"}
      className="border-green-300 text-xs text-green-400"
      size={"xs"}
      onClick={onClick}
    >
      Claim<span className="hidden sm:ml-1 sm:block">On L1</span>
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
