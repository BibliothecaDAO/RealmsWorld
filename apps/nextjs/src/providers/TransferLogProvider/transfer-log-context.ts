/* eslint-disable @typescript-eslint/no-empty-function */
"use client";

import type { DepositsQuery } from "@/.graphclient";
import type { UseInfiniteQueryResult } from "@tanstack/react-query";
import type { TRPCClientErrorLike } from "@trpc/react-query";
import type { UseTRPCQueryResult } from "@trpc/react-query/shared";
import { createContext } from "react";

import type { AppRouter, RouterOutputs } from "@realms-world/api";

interface TransferLogContextValue {
  transfersQueryL1: UseInfiniteQueryResult<DepositsQuery["deposits"]>;
  transfersQueryL2: UseTRPCQueryResult<
    RouterOutputs["bridge"]["all"],
    TRPCClientErrorLike<AppRouter>
  >;
  //pendingWithdrawalsQuery: any;
}

export const TransferLogContext = createContext<TransferLogContextValue>({
  transfersQueryL1: {
    // @ts-expect-error incorrect fetch type
    refetch: () => {},
  },
  transfersQueryL2: {
    // @ts-expect-error incorrect fetch type
    refetch: () => {},
  },
  /*pendingWithdrawalsQuery: {
    // @ts-ignore
    refetch: () => {},
  },*/
});
