import { log } from "@graphprotocol/graph-ts";
import { Withdrawal } from "../../generated/schema";

export function loadWithdrawal(id: string): Withdrawal {
  let withdrawal = Withdrawal.load(id);

  if (!withdrawal) {
    log.error("UnfinishedWithdrawal with id {} not found", [id]);
    throw new Error("UnfinishedWithdrawal not found");
  }

  return withdrawal;
}
