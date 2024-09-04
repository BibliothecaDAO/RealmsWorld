import { log } from "@graphprotocol/graph-ts";

import { ClaimEvent } from "../../generated/schema";

export function loadDepositEvent(id: string): ClaimEvent {
  let depositEvent = ClaimEvent.load(id);

  if (!depositEvent) {
    log.error("DepositEvent with id {} not found", [id]);
    throw new Error("DepositEvent not found");
  }

  return depositEvent;
}
