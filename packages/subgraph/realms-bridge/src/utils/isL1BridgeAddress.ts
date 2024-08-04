import { Address, Bytes, log } from "@graphprotocol/graph-ts";

import { l1BridgeAddress, l2BridgeAddress } from "./constants";

export function isBridgeDepositMessage(
  fromAddress: Address,
  toAddress: Bytes,
): boolean {
  log.debug("l1BridgeAddress {}", [l1BridgeAddress.toHexString()]);
  log.debug("fromAddress {}", [fromAddress.toHexString()]);
  log.debug("l2BridgeAddress {}", [l2BridgeAddress.toHexString()]);
  log.debug("toAddress {}", [toAddress.toHexString()]);

  return (
    l1BridgeAddress.equals(fromAddress) && l2BridgeAddress.equals(toAddress)
  );
}

export function isBridgeWithdrawalMessage(
  fromAddress: Bytes,
  toAddress: Address,
): boolean {
  return (
    l2BridgeAddress.equals(fromAddress) && l1BridgeAddress.equals(toAddress)
  );
}
