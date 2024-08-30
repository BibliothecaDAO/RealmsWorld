import { Address, BigInt } from "@graphprotocol/graph-ts";

export function makeIdFromPayload(
  bridgeL1Address: Address,
  payload: BigInt[]
): string {
  return [bridgeL1Address.toHex()]
    .concat(
      payload.map<string>((p) => p.toHex())
    )
    .join("-");
}
