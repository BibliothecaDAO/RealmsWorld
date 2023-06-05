"use client";
import {
  ChainTypeL2,
  EventName,
  EventNameL1,
  isCompleted,
  isConsumed,
  SelectorName,
  TransactionHashPrefix,
} from "@starkware-industries/commons-js-enums";

import {
  getPastEvents,
  getStorageItem,
  getTransactionHash,
  promiseHandler,
  setStorageItem,
} from "@starkware-industries/commons-js-utils";
import PropTypes from "prop-types";
import React, { useEffect, useReducer } from "react";
import { hash } from "starknet";
import useDeepCompareEffect from "use-deep-compare-effect";
import { getContract } from "wagmi/actions";
//import { useAccountChange, useEnvs } from "../../hooks";
//import { useBlockHash } from "../BlockHashProvider";
//import { useTokens } from "../TokensProvider";
//import { useAccountHash, useL2Wallet } from "../WalletsProvider";
import { TransfersLogContext } from "./transfers-log-context";
import { actions, initialState, reducer } from "./transfers-log-reducer";
import {
  useBlockNumber,
  useTransaction as useL2Transaction,
  useNetwork,
  useStarknet,
} from "@starknet-react/core";
import L1_MESSAGING_ABI from "@/abi/L1/StarknetMessaging.json";
import { useAccountChange } from "@/composables/useAccountChange";
import { useWalletsProviderContext } from "../WalletsProvider";

export const TransfersLogProvider = ({ children }) => {
  const { library } = useStarknet();
  const [transfers, dispatch] = useReducer(reducer, initialState);
  //const { updateTokenBalance } = useTokens();
  const { chain } = useNetwork();

  const {
    data: blockHash,
    isLoading,
    isError,
  } = useBlockNumber({
    refetchInterval: 20000, //Refetch blocks every 20s
  });
  const { accountHash } = useWalletsProviderContext();
  const LOCAL_STORAGE_TRANSFERS_LOG_KEY =
    process.env.NEXT_PUBLIC_LOCAL_STORAGE_TRANSFERS_LOG_KEY || "";
  const starknetContract = getContract({
    address: process.env.NEXT_PUBLIC_STARKNET_CONTRACT_ADDRESS as `0x${string}`,
    abi: L1_MESSAGING_ABI,
  });

  useAccountChange((accountHash) => {
    if (accountHash) {
      const storedTransfers = getTransfersFromStorage();
      console.log("Extract transfers from local storage", storedTransfers);
      setTransfers(storedTransfers);
    } else {
      resetTransfers();
    }
  });

  useDeepCompareEffect(() => {
    if (transfers.length > 0) {
      console.log(
        "Transfers changed, save updated transfers to local storage",
        transfers
      );
      saveTransfersToStorage(transfers);
    }
  }, [transfers]);

  useEffect(() => {
    const checkTransfers = async () => {
      console.log("Block hash updated. Checking transfers...", { blockHash });
      if (!blockHash) {
        return;
      }

      const newTransfers = [];
      for (const transfer of transfers) {
        const { l2hash } = transfer;
        const newTransfer = await (l2hash
          ? checkTransaction(transfer)
          : calcL2TransactionHash(transfer));
        if (newTransfer) {
          newTransfers.push(newTransfer);
        }
      }
      if (newTransfers.length) {
        console.log("Following transfers updated", newTransfers);
        updateTransfers(newTransfers);
      }
    };

    blockHash && checkTransfers();
  }, [blockHash]);

  const checkTransaction = async (transfer) => {
    if (!(isCompleted(transfer.status) || transfer.lastChecked === blockHash)) {
      console.log(`Checking tx status ${transfer.l2hash}`);
      /*const [{ tx_status }, error] = await promiseHandler(
        getStarknet().provider.getTransactionStatus(transfer.l2hash)
      );*/
      const tx = await library.getTransaction(transfer.l2hash);

      console.log(tx);
      if (tx) {
        if (transfer.status !== tx.status) {
          console.log(`Status changed from ${transfer.status}->${tx.status}`);
          if (isConsumed(tx.status)) {
            //updateTokenBalance(transfer.symbol);
          }
        } else {
          console.log(`Status is still ${tx.status}`);
        }
        return {
          ...transfer,
          status: tx /*status here*/,
          lastChecked: blockHash,
        };
      }
    }
  };

  const getMessageToL2 = async (depositEvent) => {
    console.log("Getting L2 message for deposit event", { depositEvent });
    const { blockNumber, transactionHash } = depositEvent;
    const [pastEvents, error] = await promiseHandler(
      getPastEvents({
        contract: starknetContract,
        eventName: EventName.L1.LOG_MESSAGE_TO_L2 as EventNameL1,
        filter: {
          fromAddress: depositEvent.address,
          selector: hash.getSelectorFromName(SelectorName.HANDLE_DEPOSIT),
        },
        options: {
          fromBlock: blockNumber - 1,
          toBlock: "latest",
        },
      })
    );
    if (error) {
      return null;
    }
    return pastEvents.find((e) => e.transactionHash === transactionHash);
  };

  const calcL2TransactionHash = async (transfer) => {
    const messageToL2Event = await getMessageToL2(transfer.event);
    if (messageToL2Event) {
      console.log("Found L2 message. calculating L2 transaction hash...", {
        messageToL2Event,
      });
      const { toAddress, fromAddress, selector, payload, nonce } =
        messageToL2Event.returnValues;
      delete transfer.event;
      return {
        ...transfer,
        l2hash: getTransactionHash(
          TransactionHashPrefix.L1_HANDLER,
          fromAddress,
          toAddress,
          selector,
          payload,
          chain?.id as ChainTypeL2,
          nonce
        ),
      };
    }
    return transfer;
  };

  const getTransfersFromStorage = () => {
    console.log(LOCAL_STORAGE_TRANSFERS_LOG_KEY);
    const storedTransfers =
      getStorageItem(LOCAL_STORAGE_TRANSFERS_LOG_KEY) || {};
    return storedTransfers[accountHash] || [];
  };

  const saveTransfersToStorage = (transfers) => {
    const storedTransfers =
      getStorageItem(LOCAL_STORAGE_TRANSFERS_LOG_KEY) || {};
    const updatedTransfers = {
      ...storedTransfers,
      [accountHash]: transfers,
    };
    setStorageItem(LOCAL_STORAGE_TRANSFERS_LOG_KEY, updatedTransfers);
  };

  const updateTransfers = (updatedTransfers) => {
    dispatch({
      type: actions.UPDATE_TRANSFERS,
      updatedTransfers: Array.isArray(updatedTransfers)
        ? updatedTransfers
        : [updatedTransfers],
    });
  };

  const addTransfer = (newTransfer) => {
    dispatch({
      type: actions.ADD_TRANSFER,
      newTransfer,
    });
  };

  const setTransfers = (transfers) => {
    dispatch({
      type: actions.SET_TRANSFERS,
      transfers,
    });
  };

  const resetTransfers = () => {
    dispatch({
      type: actions.RESET_TRANSFERS,
    });
  };

  const context = {
    transfers,
    addTransfer,
    updateTransfers,
  };

  return (
    <TransfersLogContext.Provider value={context}>
      {children}
    </TransfersLogContext.Provider>
  );
};

TransfersLogProvider.displayName = "TransfersLogProvider";

TransfersLogProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
