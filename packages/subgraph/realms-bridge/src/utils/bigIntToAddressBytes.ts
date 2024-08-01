import { BigInt, Bytes } from "@graphprotocol/graph-ts";

const STARK_ADDRESS_LENGTH = 64;
const ETHEREUM_ADDRESS_LENGTH = 40;

export enum ADDRESS_TYPE {
  STARKNET,
  ETHEREUM,
}

export function bigIntToAddressBytes(
  address: BigInt,
  type: ADDRESS_TYPE
): Bytes {
  let unprefixedHex = address.toHexString().slice(2);
  let addressLength =
    type === ADDRESS_TYPE.ETHEREUM
      ? ETHEREUM_ADDRESS_LENGTH
      : STARK_ADDRESS_LENGTH;

  return Bytes.fromHexString(
    "0x" + "0".repeat(addressLength - unprefixedHex.length) + unprefixedHex
  ) as Bytes;
}
