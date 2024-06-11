import { log } from "@graphprotocol/graph-ts";
import {
  LogDeposit,
} from "../../../generated/LordsBridge/LordsBridge";
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
  TransferStatus,
} from "../../utils";
import { makeIdFromPayload } from "../../utils/makeIdFromPayload";

export function handleLogDeposit(event: LogDeposit): void {
  let bridgeL1Address = event.params.;
  /*let bridgeL2Address = bigIntToAddressBytes(
    event.params.toAddress,
    ADDRESS_TYPE.STARKNET
  );
*/
  const deposit = loadOrCreateDeposit(
    makeIdFromPayload(bridgeL1Address, event.params.payload)
  );
  deposit.fromAddress = 
  deposit.depositEvents = addUniq(
    deposit.depositEvents,
    depositEvent.id
  );
  deposit.save();
}
