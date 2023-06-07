import { openInNewTab, evaluate } from "@starkware-industries/commons-js-utils";
import PropTypes from "prop-types";
import React from "react";

import EtherscanLogo from "@/icons/etherscan.svg";
import StarkScanLogo from "@/icons/starkscan.svg";
import VoyagerLogo from "@/icons/voyager.svg";
import {
  ETHERSCAN_TX_URL,
  VOYAGER_TX_URL,
  STARKSCAN_TX_URL,
  STARKSCAN_ETH_TX_URL,
  ETHERSCAN_URL,
} from "@/constants/env";
/*import {
  useColors,
  useConstants,
  useEnvs,
  useTransactionSubmittedModalTranslation
} from '@/composables/';*/

//import {Circle} from '../../Circle/Circle';
import { ActionType } from "@/composables/useTransferToL2";
import { Button } from "../../ui/button";

const TransactionSubmittedModalButton = ({
  transfer,
  buttonProps,
}: {
  transfer: any;
  buttonProps: any;
}) => {
  //const { colorIndigo, colorWhite, colorGainsboro } = useColors();
  const { type, l2hash, l1hash } = transfer;
  const isTransferCompleted = l1hash && l2hash;

  let explorers;

  if (type === ActionType.TRANSFER_TO_L2 || isTransferCompleted) {
    explorers = [
      {
        name: "Etherscan",
        url: ETHERSCAN_TX_URL(l1hash),
        logo: <EtherscanLogo className="w-5 h-5" />,
      },
      {
        name: "StarkScan",
        url: STARKSCAN_ETH_TX_URL(l1hash),
        logo: <StarkScanLogo className="w-5 h-5" />,
      },
    ];
  }

  if (type === ActionType.TRANSFER_TO_L1 && !isTransferCompleted) {
    explorers = [
      {
        name: "Voyager",
        url: VOYAGER_TX_URL(l2hash),
        logo: <VoyagerLogo />,
      },
      {
        name: "StarkScan",
        url: STARKSCAN_TX_URL(l2hash),
        logo: <StarkScanLogo />,
      },
    ];
  }

  const onClick = (url: string) => {
    openInNewTab(url);
  };

  return explorers?.map((explorer) => (
    <Button
      key={explorer.name}
      height={48}
      width={"100%"}
      onClick={() => onClick(explorer.url)}
      {...buttonProps}
    >
      {explorer.logo}
      {evaluate("View on {{explorer}}", { explorer: explorer.name })}
    </Button>
  ));
};

TransactionSubmittedModalButton.propTypes = {
  transfer: PropTypes.object,
  buttonProps: PropTypes.object,
};

export default TransactionSubmittedModalButton;
