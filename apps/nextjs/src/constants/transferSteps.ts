/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const TransferStep = {
  APPROVE: "Approve use funds",
  CONFIRM_TX: "Confirm transaction",
  WAIT_FOR_TX: "Wait for transaction to received",
  INITIATE_WITHDRAW: "Initiate transfer",
  WITHDRAW: "Send L2 > L1 transfer",
  DEPOSIT: "Send L1 > L2 transfer",
};

export const TransferToL2Steps = [
  TransferStep.APPROVE,
  TransferStep.CONFIRM_TX,
  TransferStep.DEPOSIT,
];

export const TransferToL1Steps = [
  TransferStep.CONFIRM_TX,
  TransferStep.INITIATE_WITHDRAW,
  TransferStep.WAIT_FOR_TX,
];

export const CompleteTransferToL1Steps = [
  TransferStep.CONFIRM_TX,
  TransferStep.WITHDRAW,
];

export const stepOf = (step: any, steps: any) => {
  return steps.indexOf(step);
};

export const TransferError = {
  TRANSACTION_ERROR: 0,
  MAX_TOTAL_BALANCE_ERROR: 1,
};

export const ActionType = {
  TRANSFER_TO_L2: 1,
  TRANSFER_TO_L1: 2,
};
