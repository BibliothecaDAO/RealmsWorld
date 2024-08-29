import { Address, BigDecimal, ethereum, log } from "@graphprotocol/graph-ts";

import { L1BRIDGE_DEPOSIT_SIG, l1LegacyRewardsAddress } from "./constants";

function getDepositDataFromTx(logs: ethereum.Log[]): Address {
  const depositLog = logs.findIndex((log) => {
    return (
      log.address == l1LegacyRewardsAddress &&
      log.topics[0].toHexString() == L1BRIDGE_DEPOSIT_SIG
    );
  });

  return ethereum.decode("address", logs[depositLog].topics[1])!.toAddress();
}
