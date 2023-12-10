"use client";

import { createContext } from "react";
import type { DepositsQuery } from "@/.graphclient";
import type { RouterOutputs } from "@/utils/api";
import type { UseInfiniteQueryResult } from "@tanstack/react-query";
import type { TRPCClientErrorLike } from "@trpc/react-query";
import type { UseTRPCQueryResult } from "@trpc/react-query/shared";

import type { AppRouter } from "@realms-world/api";

interface TransferLogContextValue {
  transfersQueryL1: UseInfiniteQueryResult<DepositsQuery>;
  transfersQueryL2: UseTRPCQueryResult<
    RouterOutputs["bridge"]["all"],
    TRPCClientErrorLike<AppRouter>
  >;
  //pendingWithdrawalsQuery: any;
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
  /*pendingWithdrawalsQuery: {
    // @ts-ignore
    refetch: () => {},
  },*/
});
