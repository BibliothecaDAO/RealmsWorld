"use client";

import type { ReactNode } from "react";
import { useCallback, useState } from "react";
/*import {
  fetchL1Transfers,
  fetchL2Transfers,
  fetchPendingWithdrawals,
} from "@api";*/

import { GET_TRANSFERS_ENDPOINT } from "@/constants/env";
import { getBridgeDeposits } from "@/lib/subgraph/getBridgeDeposits";
import { api } from "@/trpc/react";
import { padAddress } from "@/utils/utils";
import { useAccount as useL2Account } from "@starknet-react/core";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useAccount as useL1Account } from "wagmi";

import { TransferLogContext } from "./transfer-log-context";

const GET_PENDING_WITHDRAWALS_REFETCH_INTERVAL = 1000 * 30;
const GET_TRANSFERS_REFETCH_INTERVAL = 0; // 1000 * 15;

/*export const fetchPendingWithdrawals = async (accountL1): Promise<> =>
  await fetch("GET_PENDING_WITHDRAWALS_ENDPOINT");*/
interface TransferLogProviderProps {
  children: ReactNode;
}

export const TransferLogProvider: React.FC<TransferLogProviderProps> = ({
  children,
}) => {
  /*const sdk = getBuiltGraphSDK({
    subgraphName: process.env.NEXT_PUBLIC_SUBGRAPH_NAME,
    apibaraHandle: process.env.NEXT_PUBLIC_APIBARA_HANDLE,
  });*/
  const { address: accountL1 } = useL1Account();
  const { address: accountL2 } = useL2Account();
  const [nextL1, setNextL1] = useState("");
  const [nextL2, setNextL2] = useState("");

  /*const pendingWithdrawalsQuery = useInfiniteQuery({
    queryKey: ["PendingWithdrawals", accountL1],
    queryFn: () => {
      const [bridge] = api.bridge.all.useQuery({
        l1Account: padAddress(accountL1 ?? ""),
        l2Account: padAddress(accountL2 ?? ""),
      });
      return bridge;
    },
    enabled: !!accountL1,
    initialPageParam: "0",
    getNextPageParam: () => nextL1,
    refetchInterval: GET_PENDING_WITHDRAWALS_REFETCH_INTERVAL,
  });*/

  const transfersQueryL1 = useInfiniteQuery({
    queryKey: ["Deposits", GET_TRANSFERS_ENDPOINT, accountL1],
    queryFn: async ({ pageParam = "" }) => {
      return await getBridgeDeposits({
        depositsWhere: { l1Sender: accountL1 },
        withdrawalsWhere: { l1Recipient: accountL1 },
      });
    },
    enabled: !!accountL1,
    //initialPageParam: "0",
    getNextPageParam: () => nextL1,
    refetchInterval: GET_TRANSFERS_REFETCH_INTERVAL,
  });

  const transfersQueryL2 = api.bridge.all.useQuery(
    {
      l1Account: padAddress(accountL1),
      l2Account: padAddress(accountL2),
      //limit: 10,
    },
    {
      refetchInterval: GET_TRANSFERS_REFETCH_INTERVAL,
    },
    /*{
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      // initialCursor: 1, // <-- optional you can pass an initialCursor
    },*/
  );

  const cloneLogsWithIds = useCallback(
    (logs: any) =>
      Array.isArray(logs)
        ? logs.map((log: any) => ({ ...log, id: log.l2TxHash }))
        : [],
    [],
  );

  const context = {
    transfersQueryL1,
    transfersQueryL2,
    //pendingWithdrawalsQuery,
  };

  return (
    <TransferLogContext.Provider value={context}>
      {children}
    </TransferLogContext.Provider>
  );
};

TransferLogProvider.displayName = "TransferLogProvider";
