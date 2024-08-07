import { Address, log } from "@graphprotocol/graph-ts";

import {
  ConsumedMessageToL1,
  LogMessageToL1,
} from "../../../generated/StarknetMessaging/StarknetMessaging";
import {
  createWithdrawalEvent,
  loadOrCreateWithdrawal,
  loadWithdrawal,
  loadWithdrawalEvent,
} from "../../entities";
import {
  ADDRESS_TYPE,
  addUniq,
  bigIntToAddressBytes,
  convertUint256ToBigInt,
  isBridgeWithdrawalMessage,
  TransferStatus,
} from "../../utils";
import { makeIdFromPayload } from "../../utils/makeIdFromPayload";

export function handleLogMessageToL1(event: LogMessageToL1): void {
  let bridgeL1Address = event.params.toAddress;
  let bridgeL2Address = bigIntToAddressBytes(
    event.params.fromAddress,
    ADDRESS_TYPE.STARKNET,
  );

  if (!isBridgeWithdrawalMessage(bridgeL2Address, bridgeL1Address)) {
    return;
  }

  const withdrawalEvent = createWithdrawalEvent(event);

  const withdrawal = loadOrCreateWithdrawal(
    makeIdFromPayload(bridgeL1Address, event.params.payload),
    convertUint256ToBigInt(event.params.payload[0], event.params.payload[1]),
    bigIntToAddressBytes(event.params.payload[2], ADDRESS_TYPE.ETHEREUM),
    bigIntToAddressBytes(event.params.payload[3], ADDRESS_TYPE.STARKNET),
    event.block.timestamp,
  );

  withdrawal.withdrawalEvents = addUniq(
    withdrawal.withdrawalEvents,
    withdrawalEvent.id,
  );
  withdrawal.save();
}

export function handleConsumedMessageToL1(event: ConsumedMessageToL1): void {
  let bridgeL1Address = event.params.toAddress;
  let bridgeL2Address = bigIntToAddressBytes(
    event.params.fromAddress,
    ADDRESS_TYPE.STARKNET,
  );

  if (!isBridgeWithdrawalMessage(bridgeL2Address, bridgeL1Address)) {
    return;
  }

  let withdrawal = loadWithdrawal(
    makeIdFromPayload(bridgeL1Address, event.params.payload),
  );

  let withdrawalEvent = loadWithdrawalEvent(withdrawal.withdrawalEvents[0]);
  withdrawalEvent.status = TransferStatus.FINISHED;
  withdrawalEvent.finishedAtBlock = event.block.number;
  withdrawalEvent.finishedAtDate = event.block.timestamp;
  withdrawalEvent.finishedTxHash = event.transaction.hash;
  withdrawalEvent.save();
  withdrawal.save();
}
