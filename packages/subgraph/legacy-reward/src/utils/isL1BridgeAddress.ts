import { Address, Bytes, log } from "@graphprotocol/graph-ts";

import { l1LegacyRewardsAddress, l2LegacyRewardsAddress } from "./constants";

export function isBridgeDepositMessage(
  fromAddress: Address,
  toAddress: Bytes,
): boolean {
  log.debug("l1BridgeAddress {}", [l1LegacyRewardsAddress.toHexString()]);
  log.debug("fromAddress {}", [fromAddress.toHexString()]);
  log.debug("l2BridgeAddress {}", [l2LegacyRewardsAddress.toHexString()]);
  log.debug("toAddress {}", [toAddress.toHexString()]);

  return (
    l1LegacyRewardsAddress.equals(fromAddress) &&
    l2LegacyRewardsAddress.equals(toAddress)
  );
}
