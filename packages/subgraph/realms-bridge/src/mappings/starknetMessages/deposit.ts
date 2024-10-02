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
  L1BRIDGE_DEPOSIT_SIG,
  l1BridgeAddress,
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
  log.debug("got deposit event of {} ", [depositEvent.tokenIds.toString()]);
  log.debug("payload 0 is {}", [event.params.payload[0].toHex()]);
  log.debug("payload 1 is {}", [event.params.payload[1].toHex()]);
  log.debug("payload 2 is {}", [event.params.payload[2].toHex()]);
  log.debug("payload 3 is {}", [event.params.payload[3].toHex()]);

  const deposit = loadOrCreateDeposit(
    makeIdFromPayload(bridgeL1Address, event.params.payload),
    bigIntToAddressBytes(event.params.payload[2], ADDRESS_TYPE.ETHEREUM),
    event.block.timestamp,
    bigIntToAddressBytes(event.params.payload[3], ADDRESS_TYPE.STARKNET),
  );

  deposit.depositEvents = addUniq(deposit.depositEvents, depositEvent.id);
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

  let depositEvent = loadDepositEvent(deposit.depositEvents[0]);
  depositEvent.status = TransferStatus.ACCEPTED_ON_L2;
  depositEvent.finishedAtBlock = event.block.number;
  depositEvent.finishedAtDate = event.block.timestamp;
  depositEvent.finishedTxHash = event.transaction.hash;
  depositEvent.payload = event.params.payload;
  depositEvent.nonce = event.params.nonce;
  depositEvent.save();
}
