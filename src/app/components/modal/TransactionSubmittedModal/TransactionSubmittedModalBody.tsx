import PropTypes from "prop-types";
import React from "react";

import { XOctagon } from "lucide-react";

import { ActionType } from "@/composables/useTransferToL2";
import { Alert, AlertType } from "../../ui/alert";

const TransactionSubmittedModalBody = ({ transfer }: { transfer: any }) => {
  const { type, l2hash, l1hash } = transfer;
  const isTransferCompleted = l1hash && l2hash;

  const textMessage =
    type === ActionType.TRANSFER_TO_L2
      ? "Your transaction has been successfully sent to StarkNet!"
      : isTransferCompleted
      ? "Your transfer is completed on Ethereum!"
      : "Your transaction is now being processing on StarkNet.";

  const messageComponent =
    type === ActionType.TRANSFER_TO_L2 ? (
      <Alert
        message={
          "Completing a Ethereum → StarkNet transfer may take up to several hours depending on the congestion. It may take a while for your wallet balance to update."
        }
        title={"This is an Alpha version"}
        type={AlertType.WARNING}
      />
    ) : !isTransferCompleted ? (
      <Alert
        message={
          "The StarkNet → Ethereum transfer divided into two stages:\n• A waiting period of several hours is expected between the stages.\n• At the end of the first step, you will be required to sign in order to complete the transfer."
        }
        title={"This is an Alpha version"}
        type={AlertType.WARNING}
      />
    ) : null;

  return (
    <div className="flex flex-col align-center mb-6 px-2">
      <div className="w-1/2">{textMessage}</div>
      {messageComponent}
    </div>
  );
};

TransactionSubmittedModalBody.propTypes = {
  transfer: PropTypes.object,
};

export default TransactionSubmittedModalBody;
