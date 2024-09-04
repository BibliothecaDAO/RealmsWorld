import { Bytes, ethereum, log } from "@graphprotocol/graph-ts";

import {
  ConsumedMessageToL2,
  LogMessageToL2,
} from "../../../generated/StarknetMessaging/StarknetMessaging";
import {
  createDepositEvent,
  loadDeposit,
  loadDepositEvent,
  loadOrCreateDeposit,
} from "../../entities";
import {
  ADDRESS_TYPE,
  addUniq,
  bigIntToAddressBytes,
  isBridgeDepositMessage,
  TransferStatus,
} from "../../utils";
import { makeIdFromPayload } from "../../utils/makeIdFromPayload";

export function handleLogMessageToL2(event: LogMessageToL2): void {
  let bridgeL1Address = event.params.fromAddress;
  let bridgeL2Address = bigIntToAddressBytes(
    event.params.toAddress,
    ADDRESS_TYPE.STARKNET,
  );

  if (!isBridgeDepositMessage(bridgeL1Address, bridgeL2Address)) {
    return;
  }

  const depositEvent = createDepositEvent(event);

  log.debug("deposit log topic is {}", [event.params.payload[0].toHexString()]);
  log.debug("deposit1 log topic is {}", [
    event.params.payload[1].toHexString(),
  ]);
  log.debug("deposi2 log topic is {}", [event.params.payload[2].toHexString()]);

  const deposit = loadOrCreateDeposit(
    makeIdFromPayload(bridgeL1Address, event.params.payload),
    bigIntToAddressBytes(event.params.payload[0], ADDRESS_TYPE.ETHEREUM),
    event.block.timestamp,
    bigIntToAddressBytes(event.params.payload[1], ADDRESS_TYPE.STARKNET),
    event.params.payload[2],
  );

  deposit.claimEvents = addUniq(deposit.claimEvents, depositEvent.id);
  deposit.save();
}

export function handleConsumedMessageToL2(event: ConsumedMessageToL2): void {
  let bridgeL1Address = event.params.fromAddress;
  let bridgeL2Address = bigIntToAddressBytes(
    event.params.toAddress,
    ADDRESS_TYPE.STARKNET,
  );

  if (!isBridgeDepositMessage(bridgeL1Address, bridgeL2Address)) {
    return;
  }

  let deposit = loadDeposit(
    makeIdFromPayload(bridgeL1Address, event.params.payload),
  );

  let depositEvent = loadDepositEvent(deposit.claimEvents[0]);
  depositEvent.status = TransferStatus.ACCEPTED_ON_L2;
  depositEvent.finishedAtBlock = event.block.number;
  depositEvent.finishedAtDate = event.block.timestamp;
  depositEvent.finishedTxHash = event.transaction.hash;
  depositEvent.payload = event.params.payload;
  depositEvent.nonce = event.params.nonce;
  depositEvent.save();
}
