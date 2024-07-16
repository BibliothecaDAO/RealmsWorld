/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { TransferLog } from "@/app/(app)/bridge/TransferLog";
import { useCompleteTransferToL1 } from "@/hooks/useTransferToL1";
import { useTransferLog } from "@/providers/TransferLogProvider";

export const Account = ({ isL1 }: { isL1: boolean }) => {
  const { transfers /*, fetchNextPage, isLoading*/ } = useTransferLog(isL1);
  const completeTransferToL1 = useCompleteTransferToL1();

  const onCompleteTransferClick = (transfer: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-floating-promises
    completeTransferToL1(transfer);
  };
  return (
    <>
      {transfers?.length
        ? transfers.map((transfer: any, index: number) => (
          <TransferLog
            isL1={isL1}
            key={index}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            transfer={transfer}
            onCompleteTransferClick={() => onCompleteTransferClick(transfer)}
          />
        ))
        : null}
    </>
  );
};
