/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { generateId } from "@starkware-industries/commons-js-utils";

export const actions = {
  SET_TRANSFERS: "TransfersLog/SET_TRANSFERS",
  ADD_TRANSFER: "TransfersLog/ADD_TRANSFER",
  UPDATE_TRANSFERS: "TransfersLog/UPDATE_TRANSFERS",
  RESET_TRANSFERS: "TransfersLog/RESET_TRANSFERS",
};

export const initialState = [];

export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case actions.SET_TRANSFERS:
      return action.transfers;

    case actions.ADD_TRANSFER: {
      const { newTransfer } = action;
      return [
        { id: generateId(), timestamp: new Date().getTime(), ...newTransfer },
        ...state,
      ];
    }

    case actions.UPDATE_TRANSFERS: {
      const { updatedTransfers } = action;
      const transfers = [...state];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      updatedTransfers.forEach((updatedTransfer: any) => {
        const index = transfers.findIndex((t) => t.id === updatedTransfer.id);
        if (index > -1) {
          transfers[index] = updatedTransfer;
        }
      });
      return transfers;
    }

    case actions.RESET_TRANSFERS: {
      return initialState;
    }

    default:
      return state;
  }
};
