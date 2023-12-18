"use client";

import React from "react";
import { TransferLog } from "@/app/bridge/TransferLog";
import { useTransferLog } from "@/app/providers/TransferLogProvider";
import { useCompleteTransferToL1 } from "@/hooks/useTransferToL1";
import { api } from "@/trpc/react";
import { padAddress } from "@/utils/utils";
import { useAccount as useL2Account } from "@starknet-react/core";
//import { evaluate } from "@starkware-industries/commons-js-utils";
import PropTypes from "prop-types";
import { useAccount } from "wagmi";

export const Account = ({ isL1 }: { isL1: boolean }) => {
  const { address } = useAccount();
  const { address: l2address } = useL2Account();
  const { transfers /*, fetchNextPage, isLoading*/ } = useTransferLog(isL1);
  const completeTransferToL1 = useCompleteTransferToL1();
  /*const [bridge] = api.bridge.all.useSuspenseQuery({
    l1Account: padAddress(address ?? ""),
    l2Account: padAddress(l2address ?? ""),
  });
  console.log(bridge);*/
  console.log(transfers);

  const onCompleteTransferClick = (transfer: any) => {
    completeTransferToL1(transfer);
  };
  return (
    <>
      {transfers?.length
        ? transfers.map((transfer: any, index: number) => (
            <TransferLog
              isL1={isL1}
              key={index}
              transfer={transfer}
              onCompleteTransferClick={() => onCompleteTransferClick(transfer)}
            />
          ))
        : null}
    </>
  );
};

Account.propTypes = {
  transferId: PropTypes.string,
};
