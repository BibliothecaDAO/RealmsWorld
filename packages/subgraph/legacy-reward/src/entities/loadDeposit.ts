import { log } from "@graphprotocol/graph-ts";

import { Claim } from "../../generated/schema";

export function loadDeposit(id: string): Claim {
  let deposit = Claim.load(id);

  if (!deposit) {
    log.error("UnfinishedDeposit with id {} not found", [id]);
    throw new Error("UnfinishedDeposit not found");
  }

  return deposit;
}
