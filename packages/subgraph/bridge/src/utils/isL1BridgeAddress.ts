import { Address, Bytes } from "@graphprotocol/graph-ts";

import { l1BridgesAddresses, l2BridgesAddresses } from "./constants";

export function isBridgeDepositMessage(
  fromAddress: Address,
  toAddress: Bytes
): boolean {
  let equals = false;

  for (let i = 0; i < l1BridgesAddresses.length; i++) {
    equals =
      equals ||
      (l1BridgesAddresses[i].equals(fromAddress) &&
        l2BridgesAddresses[i].equals(toAddress));
  }

  return equals;
}

export function isBridgeWithdrawalMessage(
  fromAddress: Bytes,
  toAddress: Address
): boolean {
  let equals = false;

  for (let i = 0; i < l1BridgesAddresses.length; i++) {
    equals =
      equals ||
      (l2BridgesAddresses[i].equals(fromAddress) &&
        l1BridgesAddresses[i].equals(toAddress));
  }

  return equals;
}
