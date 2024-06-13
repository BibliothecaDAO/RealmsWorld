import { BigInt } from "@graphprotocol/graph-ts";

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
  let tokenIds: BigInt[] = [];
  for (let i = 0; i < event.params.payload[4].toI32(); i += 2) {
    tokenIds.push(convertUint256ToBigInt(ids[i], ids[i + 1]));
  }

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
