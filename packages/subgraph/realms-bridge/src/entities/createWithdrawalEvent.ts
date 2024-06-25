import { BigInt, log } from "@graphprotocol/graph-ts";

import { WithdrawalEvent } from "../../generated/schema";
import { LogMessageToL1 } from "../../generated/StarknetMessaging/StarknetMessaging";
import {
  ADDRESS_TYPE,
  bigIntToAddressBytes,
  convertUint256ToBigInt,
  getUniqId,
  TransferStatus,
} from "../utils";

export function createWithdrawalEvent(event: LogMessageToL1): WithdrawalEvent {
  let withdrawalEvent = new WithdrawalEvent(getUniqId(event));

  let l1Recipient = event.params.payload[2];
  let ids = event.params.payload.slice(5);
  log.debug("withdraw tokenIds are following {} with length {}", [
    ids.toString(),
    event.params.payload[4].toI32().toString(),
  ]);

  let tokenIds = new Array<BigInt>(0);
  for (let i = 0; i < event.params.payload[4].toI32() * 2; i += 2) {
    tokenIds.push(convertUint256ToBigInt(ids[i], ids[i + 1]));
  }
  log.debug("conveted are following {}", [tokenIds.toString()]);

  withdrawalEvent.req_hash = convertUint256ToBigInt(
    event.params.payload[0],
    event.params.payload[1],
  );
  withdrawalEvent.l1Recipient = bigIntToAddressBytes(
    l1Recipient,
    ADDRESS_TYPE.ETHEREUM,
  );
  withdrawalEvent.bridgeAddressL1 = event.params.toAddress;
  withdrawalEvent.bridgeAddressL2 = bigIntToAddressBytes(
    event.params.fromAddress,
    ADDRESS_TYPE.STARKNET,
  );
  withdrawalEvent.tokenIds = tokenIds;
  withdrawalEvent.status = TransferStatus.ACCEPTED_ON_L1;

  withdrawalEvent.createdAtBlock = event.block.number;
  withdrawalEvent.createdTxHash = event.transaction.hash;
  withdrawalEvent.finishedAtBlock = null;
  withdrawalEvent.finishedAtDate = null;
  withdrawalEvent.finishedTxHash = null;

  withdrawalEvent.save();

  return withdrawalEvent;
}
