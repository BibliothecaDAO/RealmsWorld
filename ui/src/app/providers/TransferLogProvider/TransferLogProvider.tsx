"use client";
import PropTypes from "prop-types";
import { ReactNode, useCallback, useState } from "react";

/*import {
  fetchL1Transfers,
  fetchL2Transfers,
  fetchPendingWithdrawals,
} from "@api";*/

import {
  GET_L2_APIBARA_ENDPOINT,
  GET_TRANSFERS_ENDPOINT,
} from "@/constants/env";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { TransferLogContext } from "./transfer-log-context";
import { useAccount as useL2Account } from "@starknet-react/core";
import { useAccount as useL1Account } from "wagmi";
import { WithdrawalsQuery, getBuiltGraphSDK } from "@/.graphclient";

const GET_PENDING_WITHDRAWALS_REFETCH_INTERVAL = 1000 * 30;
const GET_TRANSFERS_REFETCH_INTERVAL = 1000 * 60 * 3;

/*export const fetchPendingWithdrawals = async (accountL1): Promise<> =>
  await fetch("GET_PENDING_WITHDRAWALS_ENDPOINT");*/
interface TransferLogProviderProps {
  children: ReactNode;
}

export const TransferLogProvider: React.FC<TransferLogProviderProps> = ({
  children,
}) => {
  const sdk = getBuiltGraphSDK();

  const { address: accountL1 } = useL1Account();
  const { address: accountL2 } = useL2Account();
  const [nextL1, setNextL1] = useState("");
  const [nextL2, setNextL2] = useState("");

  const pendingWithdrawalsQuery = useInfiniteQuery({
    queryKey: ["PendingWithdrawals", accountL1],
    queryFn: async () => {},
    enabled: !!accountL1,
    refetchInterval: GET_PENDING_WITHDRAWALS_REFETCH_INTERVAL,
  });

  const transfersQueryL1 = useInfiniteQuery({
    queryKey: ["Deposits", GET_TRANSFERS_ENDPOINT, accountL1],
    queryFn: async ({ pageParam = "" }) => {
      return await sdk.Deposits({
        depositsWhere: { l1Sender: accountL1 },
        withdrawalsWhere: {l1Recipient: accountL1}
      });
    },
    enabled: !!accountL1,
    getNextPageParam: () => nextL1,
    refetchInterval: GET_TRANSFERS_REFETCH_INTERVAL,
  });

  const transfersQueryL2 = useQuery({
    queryKey: ["L2Withdrawals", GET_L2_APIBARA_ENDPOINT, accountL2],
    queryFn: async () => await sdk.L2Withdrawals(),
    enabled: !!accountL2,
    getNextPageParam: () => nextL2,
    refetchInterval: GET_TRANSFERS_REFETCH_INTERVAL,
  });

  const cloneLogsWithIds = useCallback(
    (logs: any) =>
      Array.isArray(logs)
        ? logs.map((log: any) => ({ ...log, id: log.l2TxHash }))
        : [],
    []
  );

  const context = {
    transfersQueryL1,
    transfersQueryL2,
    pendingWithdrawalsQuery,
  };

  return (
    <TransferLogContext.Provider value={context}>
      {children}
    </TransferLogContext.Provider>
  );
};

TransferLogProvider.displayName = "TransferLogProvider";
