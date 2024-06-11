import { Bytes } from "@graphprotocol/graph-ts";
import { bridgesAddressesL1, bridgesAddressesL2 } from "../../generated/config";

export let ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export class TransferStatus {
  static PENDING: string = "PENDING";
  static FINISHED: string = "FINISHED";
  static ACCEPTED_ON_L1: string = "ACCEPTED_ON_L1";
  static ACCEPTED_ON_L2: string = "ACCEPTED_ON_L2";
}

export const l1BridgesAddresses: Bytes[] = bridgesAddressesL1.map<Bytes>(
  (x: string): Bytes => Bytes.fromByteArray(Bytes.fromHexString(x))
);

export const l2BridgesAddresses: Bytes[] = bridgesAddressesL2.map<Bytes>(
  (x: string): Bytes => Bytes.fromByteArray(Bytes.fromHexString(x))
);

export const L1BRIDGE_DEPOSIT_SIG = '0x9dbb0e7dda3e09710ce75b801addc87cf9d9c6c581641b3275fca409ad086c62';