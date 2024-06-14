import { BigInt, log } from "@graphprotocol/graph-ts";

import { DepositEvent } from "../../generated/schema";
import { LogMessageToL2 } from "../../generated/StarknetMessaging/StarknetMessaging";
import {
  ADDRESS_TYPE,
  bigIntToAddressBytes,
  convertUint256ToBigInt,
  getUniqId,
  TransferStatus,
} from "../utils";

export function createDepositEvent(event: LogMessageToL2): DepositEvent {
  let depositEvent = new DepositEvent(getUniqId(event));

  let ids = event.params.payload.slice(5);
  let tokenIds = new Array<BigInt>(0);
  log.debug("tokenIds are following {}", [ids.toString()]);
  for (let i = 0; i < event.params.payload[4].toI32(); i += 2) {
    log.debug("converted is {}", [
      convertUint256ToBigInt(ids[i], ids[i + 1]).toString(),
    ]);
    tokenIds.push(convertUint256ToBigInt(ids[i], ids[i + 1]));
  }
  log.debug("tokenIds are is {}", [tokenIds.toString()]);
  depositEvent.bridgeAddressL1 = event.params.fromAddress;
  depositEvent.bridgeAddressL2 = bigIntToAddressBytes(
    event.params.toAddress,
    ADDRESS_TYPE.STARKNET,
  );
  depositEvent.tokenIds = tokenIds;
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
