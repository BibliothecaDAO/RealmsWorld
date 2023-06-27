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

export const Account = ({ isL1 }: { isL1: boolean }) => {
  /*const [
    trackTxLinkClick,
    trackAccountLinkClick,
    trackViewTransfersLog,
    trackCompleteTransferClick,
    trackAddressCopied
  ] = useAccountTracking();*/
  //const { showSourceMenu } = useMenu();
  // const { account, resetWallet } = useWallets();
  //const { isL1, isL2, fromNetwork } = useTransfer();
  const { address } = useAccount();
  const { address: l2address } = useL2Account();
  const { transfers /*, fetchNextPage, isLoading*/ } = useTransferLog();
  const completeTransferToL1 = useCompleteTransferToL1();

  /*useEffect(() => {
    if (!account) {
      //showSourceMenu();
    }
  }, [account]);*/

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

  const handleLogout = () => {
    //console.log(`logout ${fromNetwork} wallet`);
    //showSourceMenu();
    //resetWallet();
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
            className="mr-2 justify-between normal-case"
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
    <div className="p-3">
      <h3 className="text-lg">
        {evaluate("{{network}} Account", { network: isL1 ? "L1" : "L2" })}
      </h3>
      {/*<AccountAddress address={isL2 ? addAddressPadding(account) : account} />*/}
      {renderExplorers()}
      {/*<TransferLogContainer
          transferIndex={findIndexById(transfers, transferId)}
  >*/}
      {renderTransfers()}
      {/*</TransferLogContainer>
        <LogoutButton onClick={handleLogout} />*/}
    </div>
  );
};

Account.propTypes = {
  transferId: PropTypes.string,
};
