/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { useMemo } from "react";

const evaluate = (template: any, model: any) => {
  try {
    let reg_1;
    let res_1 = template;
    Object.keys(model).forEach(function (key) {
      let value =
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        model[key] !== undefined && model[key] !== null ? model[key] : "";
      if (typeof value === "string" && value.indexOf('"') > -1) {
        value = value.replace(/"/g, '\\"');
      }
      reg_1 = new RegExp("{{".concat(key, "}}"), "g");
      res_1 = res_1.replace(reg_1, value);
    });
    return res_1;
  } catch (ex) {
    return "";
  }
};
const transferProgressStrings = {
  approval: {
    type: "Approval required",
    message: "Requesting permission to access your Lords funds.",
  },
  deposit: {
    type: "Transfer in progress",
    message: "Transferring confirmation... Lords to StarkNet...",
  },
  initiateWithdraw: {
    type: "Initiate transfer",
    message: "Initiating transfer of {{amount}} Lords from StarkNet...",
  },
  withdraw: {
    type: "Transfer in progress",
    message: "Transferring {{amount}} Lords to Ethereum...",
  },
  waitForConfirm: {
    type: "{{walletName}} confirmation...",
    message:
      "Do not refresh or close the page while waiting for the operation to be completed.",
  },
  confirmTxt: "Confirm this transaction in your wallet",
  errorTitle: "Transaction error",
  limitationErrorTitle: "Limitation error",
};
export const useTransferProgress = () => {
  return useMemo(
    () => ({
      approval: (symbol: string, activeStep: number) => {
        const { approval } = transferProgressStrings;
        const message = approval.message;
        return {
          type: approval.type,
          message,
          activeStep,
        };
      },
      deposit: (amount: string, symbol: string, activeStep: number) => {
        const { deposit } = transferProgressStrings;
        const message = evaluate(deposit.message, { amount, symbol });
        return {
          type: deposit.type,
          message,
          activeStep,
        };
      },
      initiateWithdraw: (
        amount: number,
        symbol: string,
        activeStep: number,
      ) => {
        const { initiateWithdraw } = transferProgressStrings;
        const message = evaluate(initiateWithdraw.message, { amount, symbol });
        return {
          type: initiateWithdraw.type,
          message,
          activeStep,
        };
      },
      waitForConfirm: (walletName: string, activeStep: number) => {
        const { waitForConfirm } = transferProgressStrings;
        const type = evaluate(waitForConfirm.type, { walletName });
        const message = evaluate(waitForConfirm.message, { walletName });
        return {
          type,
          message,
          activeStep,
        };
      },
      withdraw: (amount: number, symbol: string, activeStep: number) => {
        const { withdraw } = transferProgressStrings;
        const message = evaluate(withdraw.message, { amount, symbol });
        return {
          type: withdraw.type,
          message,
          activeStep,
        };
      },
      error: (err: any) => {
        /*if (type === TransferError.MAX_TOTAL_BALANCE_ERROR) {
                  const {limitationErrorTitle, maxTotalBalanceErrorMsg} = transferProgressStrings;
                  return {
                    type: limitationErrorTitle,
                    message: evaluate(maxTotalBalanceErrorMsg, data)
                  };
                }*/
        const { errorTitle } = transferProgressStrings;
        return {
          type: errorTitle,
          message: err.message,
        };
      },
    }),
    [],
  );
};
