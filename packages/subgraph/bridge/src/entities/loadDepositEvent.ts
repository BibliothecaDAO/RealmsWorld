import { log } from "@graphprotocol/graph-ts";
import { DepositEvent } from "../../generated/schema";

export function loadDepositEvent(id: string): DepositEvent {
  let depositEvent = DepositEvent.load(id);

  if (!depositEvent) {
    log.error("DepositEvent with id {} not found", [id]);
    throw new Error("DepositEvent not found");
  }

  return depositEvent;
}
