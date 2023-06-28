import { log, ethereum } from "@graphprotocol/graph-ts";
import {
  ConsumedMessageToL2,
  LogMessageToL2,
} from "../../../generated/StarknetMessaging/StarknetMessaging";
import {
  createDepositEvent,
  loadDepositEvent,
  loadOrCreateDeposit,
  loadDeposit,
} from "../../entities";
import {
  ADDRESS_TYPE,
  addUniq,
  bigIntToAddressBytes,
  isBridgeDepositMessage,
  L1BRIDGE_DEPOSIT_SIG,
  l1BridgesAddresses,
  TransferStatus,
} from "../../utils";
import { makeIdFromPayload } from "../../utils/makeIdFromPayload";

export function handleLogMessageToL2(event: LogMessageToL2): void {
  let bridgeL1Address = event.params.fromAddress;
  let bridgeL2Address = bigIntToAddressBytes(
    event.params.toAddress,
    ADDRESS_TYPE.STARKNET
  );

  if (!isBridgeDepositMessage(bridgeL1Address, bridgeL2Address)) {
    return;
  }

  const depositEvent = createDepositEvent(event);

  

  const depositLog = event.receipt!.logs.findIndex((log) =>{ return log.address == l1BridgesAddresses[0] && log.topics[0].toHexString() == L1BRIDGE_DEPOSIT_SIG})
  log.debug("deposit log topic is {}", [event.receipt!.logs[depositLog].topics[1].toHexString()])
  const deposit = loadOrCreateDeposit(
    makeIdFromPayload(bridgeL1Address, event.params.payload),
    ethereum.decode('address', event.receipt!.logs[depositLog].topics[1])!.toAddress(),
    event.block.timestamp,
    bigIntToAddressBytes(
      event.params.payload[0],
      ADDRESS_TYPE.STARKNET
    )
  );

  deposit.depositEvents = addUniq(
    deposit.depositEvents,
    depositEvent.id
  );
  deposit.save();
}

export function handleConsumedMessageToL2(event: ConsumedMessageToL2): void {
  let bridgeL1Address = event.params.fromAddress;
  let bridgeL2Address = bigIntToAddressBytes(
    event.params.toAddress,
    ADDRESS_TYPE.STARKNET
  );

  if (!isBridgeDepositMessage(bridgeL1Address, bridgeL2Address)) {
    return;
  }

  let deposit = loadDeposit(
    makeIdFromPayload(bridgeL1Address, event.params.payload)
  );

  let depositEvent = loadDepositEvent(deposit.depositEvents[0]);
  depositEvent.status = TransferStatus.ACCEPTED_ON_L2;
  depositEvent.finishedAtBlock = event.block.number;
  depositEvent.finishedAtDate = event.block.timestamp;
  depositEvent.finishedTxHash = event.transaction.hash;
  depositEvent.save();
  }
