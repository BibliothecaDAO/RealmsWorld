/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useContext, useMemo } from "react";
import { isDeposit } from "@/types/bridge";

import { TransferLogContext } from "./transfer-log-context";

export const useTransferLog = (isL1 = true) => {
  const { transfersQueryL1, transfersQueryL2 } = useContext(TransferLogContext);
  const query = isL1 ? transfersQueryL1 : transfersQueryL2;
  return useMemo(() => {
    return {
      ...query,
      transfers: isL1 ? flattenPages(query?.data) : query.data,
    };
  }, [isL1, query]);
};

export const useTransfers = () => {
  const {
    transfersQueryL1: { data: transfersL1, isFetching: isFetchingL1 },
    transfersQueryL2: { data: transfersL2, isFetching: isFetchingL2 },
    /*pendingWithdrawalsQuery: {
      data: withdrawals,
      isFetching: isFetchingWithdrawals,
    },*/
  } = useContext(TransferLogContext);

  const doneFetching = !!(
    (
      !isFetchingL1 &&
      !isFetchingL2 &&
      //!isFetchingWithdrawals &&
      transfersL1 &&
      transfersL2
    )
    //withdrawals
  );

  return useMemo(() => {
    const removeDuplicatesLogs = (logs: any) => {
      const unique = {};
      //@ts-expect-error imported
      return logs.filter((log) => !unique[log.id] && (unique[log.id] = true));
    };

    const sortLogsAccordingToTimestamp = (logs: any) => {
      //@ts-expect-error imported
      const extractTs = ({ type, l1TxTimestamp, l2TxTimestamp }) => {
        return isDeposit(type) ? l1TxTimestamp : l2TxTimestamp;
      };
      //@ts-expect-error imported
      return logs.sort((a, b) => extractTs(a) - extractTs(b));
    };
    console.log("done" + doneFetching);
    if (doneFetching) {
      console.log(transfersL1);
      const uniqueLogs = removeDuplicatesLogs([
        //...(withdrawals?.pages || []),
        ...flattenPages(transfersL1),
        ...flattenPages(transfersL2),
      ]);
      return sortLogsAccordingToTimestamp(uniqueLogs);
    }
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doneFetching]);
};

const flattenPages = (data: any) => {
  return data?.pages.length
    ? [
        ...(data?.pages?.[0]?.data?.withdrawals ?? []),
        ...(data?.pages?.[0]?.data?.deposits ?? []),
      ]
    : []; /*&& Array.isArray(data?.pages) && data?.pages.length ? data?.pages?.reduce((prev: any, curr: any) => { return [...prev, ...curr] }, []) : []*/
};
