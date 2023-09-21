"use client";

import { createContext } from "react";
import {
  Deposit,
  DepositsQuery,
  L2WithdrawalsQuery,
  Withdrawal,
  WithdrawalsQuery,
} from "@/.graphclient";
import { RouterOutputs } from "@/utils/api";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { TRPCClientErrorLike } from "@trpc/react-query";
import { UseTRPCQueryResult } from "@trpc/react-query/shared";

import { AppRouter } from "@realms-world/api";

interface TransferLogContextValue {
  transfersQueryL1: UseInfiniteQueryResult<DepositsQuery>;
  transfersQueryL2: UseTRPCQueryResult<
    RouterOutputs["bridge"]["all"],
    TRPCClientErrorLike<AppRouter>
  >;
  pendingWithdrawalsQuery: any;
}

export const TransferLogContext = createContext<TransferLogContextValue>({
  transfersQueryL1: {
    // @ts-ignore
    refetch: () => {},
  },
  transfersQueryL2: {
    // @ts-ignore
    refetch: () => {},
  },
  pendingWithdrawalsQuery: {
    // @ts-ignore
    refetch: () => {},
  },
});
