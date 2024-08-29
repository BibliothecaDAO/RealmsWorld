import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts";

import { Claim } from "../../generated/schema";

export function loadOrCreateDeposit(
  id: string,
  l1Sender: Bytes,
  createdTimestamp: BigInt,
  l2Recipient: Bytes,
  claimId: BigInt,
): Claim {
  let deposit = Claim.load(id);

  if (!deposit) {
    deposit = new Claim(id);
    deposit.l1Sender = l1Sender;
    deposit.claimEvents = [];
    deposit.createdTimestamp = createdTimestamp;
    deposit.l2Recipient = l2Recipient;
    deposit.claimId = claimId.toI32();
    deposit.save();
  }

  return deposit;
}
