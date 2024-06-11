import { BigInt } from "@graphprotocol/graph-ts";

export function convertUint256ToBigInt(low: BigInt, high: BigInt): BigInt {
  return high.leftShift(128).plus(low);
}
