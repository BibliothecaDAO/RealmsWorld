import { BigInt, Bytes } from "@graphprotocol/graph-ts";

import { Withdrawal } from "../../generated/schema";

export function loadOrCreateWithdrawal(
  id: string,
  hash: BigInt,
  l1Recipient: Bytes,
  l2Sender: Bytes,
  timestamp: BigInt,
): Withdrawal {
  let withdrawal = Withdrawal.load(id);

  if (!withdrawal) {
    withdrawal = new Withdrawal(id);
    withdrawal.req_hash = hash;
    withdrawal.l1Recipient = l1Recipient;
    withdrawal.l2Sender = l2Sender;
    withdrawal.withdrawalEvents = [];
    withdrawal.createdTimestamp = timestamp;
    withdrawal.save();
  }

  return withdrawal;
}
