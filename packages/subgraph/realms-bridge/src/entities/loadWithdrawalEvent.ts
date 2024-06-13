import { log } from "@graphprotocol/graph-ts";
import { WithdrawalEvent } from "../../generated/schema";

export function loadWithdrawalEvent(id: string): WithdrawalEvent {
  let withdrawalEvent = WithdrawalEvent.load(id);

  if (!withdrawalEvent) {
    log.error("WithdrawalEvent with id {} not found", [id]);
    throw new Error("WithdrawalEvent not found");
  }

  return withdrawalEvent;
}
