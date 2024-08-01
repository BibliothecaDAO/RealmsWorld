import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts";
import { Deposit } from "../../generated/schema";

export function loadOrCreateDeposit(id: string, l1Sender: Address, createdTimestamp: BigInt, l2Recipient: Bytes): Deposit {
  let deposit = Deposit.load(id);

  if (!deposit) {
    deposit = new Deposit(id);
    deposit.l1Sender = l1Sender
    deposit.depositEvents = [];
    deposit.createdTimestamp = createdTimestamp;
    deposit.l2Recipient= l2Recipient
    deposit.save();
  }

  return deposit;
}
