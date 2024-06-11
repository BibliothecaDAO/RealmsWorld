import { log } from "@graphprotocol/graph-ts";
import { Deposit } from "../../generated/schema";

export function loadDeposit(id: string): Deposit {
  let deposit = Deposit.load(id);

  if (!deposit) {
    log.error("UnfinishedDeposit with id {} not found", [id]);
    throw new Error("UnfinishedDeposit not found");
  }

  return deposit;
}
