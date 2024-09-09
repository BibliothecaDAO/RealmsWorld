import { BigInt, log } from "@graphprotocol/graph-ts";

import { ClaimEvent } from "../../generated/schema";
import { LogMessageToL2 } from "../../generated/StarknetMessaging/StarknetMessaging";
import {
  ADDRESS_TYPE,
  bigIntToAddressBytes,
  convertUint256ToBigInt,
  getUniqId,
  TransferStatus,
} from "../utils";

export function createDepositEvent(event: LogMessageToL2): ClaimEvent {
  let depositEvent = new ClaimEvent(getUniqId(event));

  depositEvent.rewardsAddressL1 = event.params.fromAddress;
  depositEvent.rewardsAddressL2 = bigIntToAddressBytes(
    event.params.toAddress,
    ADDRESS_TYPE.STARKNET,
  );
  depositEvent.status = TransferStatus.PENDING;

  depositEvent.createdAtBlock = event.block.number;
  depositEvent.createdTxHash = event.transaction.hash;

  depositEvent.finishedAtBlock = null;
  depositEvent.finishedAtDate = null;
  depositEvent.finishedTxHash = null;

  log.debug("before save is {}", [
    bigIntToAddressBytes(
      event.params.toAddress,
      ADDRESS_TYPE.STARKNET,
    ).toHexString(),
  ]);

  depositEvent.save();
  log.debug("after save", []);

  return depositEvent;
}
