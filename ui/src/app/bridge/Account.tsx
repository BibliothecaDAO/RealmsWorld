import {
  evaluate,
  findIndexById,
} from "@starkware-industries/commons-js-utils";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { addAddressPadding } from "starknet";

/*import {
  useAccountTracking,
  useAccountTranslation,
  useCompleteTransferToL1,
  useEnvs
} from '../../../hooks';*/

//import { useTransfer } from "../../../providers/TransferProvider";
import { useTransferLog } from "@/app/providers/TransferLogProvider";
//import { useWallets } from "../../../providers/WalletsProvider";

import { TransferLog } from "@/app/components/TransferLog";
import { Button } from "../components/ui/button";
import { ETHERSCAN_ACCOUNT_URL, STARKSCAN_ACCOUNT_URL } from "@/constants/env";
import { useAccount } from "wagmi";
import { useAccount as useL2Account } from "@starknet-react/core";
import { ExternalLinkIcon } from "lucide-react";
import { useCompleteTransferToL1 } from "@/composables/useTransferToL1";
import * as ScrollArea from "@radix-ui/react-scroll-area";

export const Account = ({ isL1 }: { isL1: boolean }) => {
  const { address } = useAccount();
  const { address: l2address } = useL2Account();
  const { transfers /*, fetchNextPage, isLoading*/ } = useTransferLog(isL1);
  const completeTransferToL1 = useCompleteTransferToL1();

  const renderTransfers = () => {
    return transfers && transfers.length
      ? transfers.map((transfer: any, index: number) => (
        <TransferLog
          isL1={isL1}
          key={index}
          transfer={transfer}
          onCompleteTransferClick={() => onCompleteTransferClick(transfer)}
        />
      ))
      : null;
  };

  const onCompleteTransferClick = (transfer: any) => {
    completeTransferToL1(transfer);
  };

  const renderExplorers = () => {
    const explorersL1 = [
      { text: "Account", url: ETHERSCAN_ACCOUNT_URL(address) },
    ];
    const explorersL2 = [
      { text: "Account", url: STARKSCAN_ACCOUNT_URL(l2address) },
    ];
    const explorers = isL1 ? explorersL1 : explorersL2;

    return (
      <div className="mr-2">
        {explorers.map(({ text, url }) => (
          <Button
            className="justify-between normal-case"
            key={text}
            size={"xs"}
            variant={"outline"}
            href={url}
          >
            <span>{text} </span>
            <ExternalLinkIcon className="w-3 h-3 ml-2" />
          </Button>
        ))}
      </div>
    );
  };

  return (
    <div className="py-3">
      <h5 className="flex justify-between">
        {evaluate("{{network}} Account", { network: isL1 ? "L1" : "L2" })} {renderExplorers()}
      </h5>
      {renderExplorers()}
      <ScrollArea.Root className="ScrollAreaRoot">
        <ScrollArea.Viewport className="h-96">
          {renderTransfers()}
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className="ScrollAreaScrollbar"
          orientation="vertical"
        >
          <ScrollArea.Thumb className="ScrollAreaThumb" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner />
      </ScrollArea.Root>
    </div>
  );
};

Account.propTypes = {
  transferId: PropTypes.string,
};
