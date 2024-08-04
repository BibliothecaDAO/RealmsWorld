import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts";

import { Transfer, Wallet } from "../generated/schema";

export class WalletInterface {
  fromWallet: Wallet;
  toWallet: Wallet;
}
export class ResourceInterface {
  name: string;
  realms: i32;
  id: i32;
}

export function isZeroAddress(string: string): boolean {
  return string == "0x0000000000000000000000000000000000000000";
}

export function getWallets(
  from: Address,
  to: Address,
  event: ethereum.Event,
): WalletInterface {
  let fromAddress = from;
  let toAddress = to;

  let fromId = fromAddress.toHex();
  let fromWallet = Wallet.load(fromId);
  if (!fromWallet) {
    fromWallet = new Wallet(fromId);
    fromWallet.address = fromAddress;
    fromWallet.joined = event.block.timestamp;
    fromWallet.totalRealms = BigInt.fromI32(0);
    fromWallet.realmsHeld = BigInt.fromI32(0);
    fromWallet.bridgedRealmsHeld = BigInt.fromI32(0);
    fromWallet.bridgedV2RealmsHeld = BigInt.fromI32(0);
  }

  let toId = toAddress.toHex();
  let toWallet = Wallet.load(toId);
  if (!toWallet) {
    toWallet = new Wallet(toId);
    toWallet.address = toAddress;
    toWallet.joined = event.block.timestamp;
    toWallet.totalRealms = BigInt.fromI32(0);
    toWallet.realmsHeld = BigInt.fromI32(0);
    toWallet.bridgedRealmsHeld = BigInt.fromI32(0);
    toWallet.bridgedV2RealmsHeld = BigInt.fromI32(0);
  }

  return {
    fromWallet,
    toWallet,
  };
}
export function getTransfer(
  event: ethereum.Event,
  wallet: WalletInterface,
): Transfer {
  let transfer = new Transfer(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString(),
  );

  transfer.from = wallet.fromWallet.id;
  transfer.to = wallet.toWallet.id;
  transfer.txHash = event.transaction.hash;
  transfer.timestamp = event.block.timestamp;

  return transfer;
}

export function checkRealmRarity(
  traits: Array<i32>,
  resources: Array<i32>,
  wonder: i32,
): string {
  const regions = ((traits[0] / 7) * 3) as f32;
  const cities = ((traits[1] / 21) * 3) as f32;
  const harbors = ((traits[2] / 35) * 3) as f32;
  const rivers = ((traits[3] / 60) * 3) as f32;

  let resourceScore = 0 as f32;
  for (let i = 0; i < resources.length; i++) {
    resourceScore +=
      1 / ((resourceList[resources[i] - 1].realms as f32) / 8000);
  }
  if (wonder > 0) {
    resourceScore += 8000;
  }

  return (regions + cities + harbors + rivers + resourceScore).toString();
}

export const traitsList = ["Cities", "Harbors", "Regions", "Rivers"];

export const resourceList: ResourceInterface[] = [
  { name: "Wood", realms: 5015, id: 1 },
  { name: "Stone", realms: 3941, id: 2 },
  { name: "Coal", realms: 3833, id: 3 },
  { name: "Copper", realms: 2643, id: 4 },
  { name: "Obsidian", realms: 2216, id: 5 },
  { name: "Silver", realms: 1741, id: 6 },
  { name: "Ironwood", realms: 1179, id: 7 },
  { name: "Cold Iron", realms: 957, id: 8 },
  { name: "Gold", realms: 914, id: 9 },
  { name: "Hartwood", realms: 594, id: 10 },
  { name: "Diamonds", realms: 300, id: 11 },
  { name: "Sapphire", realms: 247, id: 12 },
  { name: "Ruby", realms: 239, id: 13 },
  { name: "Deep Crystal", realms: 239, id: 14 },
  { name: "Ignium", realms: 172, id: 15 },
  { name: "Ethereal Silica", realms: 162, id: 16 },
  { name: "True Ice", realms: 139, id: 17 },
  { name: "Twilight Quartz", realms: 111, id: 18 },
  { name: "Alchemical Silver", realms: 93, id: 19 },
  { name: "Adamantine", realms: 55, id: 20 },
  { name: "Mithral", realms: 37, id: 21 },
  { name: "Dragonhide", realms: 23, id: 22 },
];
const wonderList = [
  "Cathedral Of Agony",
  "Sanctum Of Purpose",
  "The Ancestral Willow",
  "The Crying Oak",
  "The Immortal Hot Spring",
  "Pantheon Of Chaos",
  "The Solemn Catacombs",
  "The Exalted Geyser",
  "The Devout Summit",
  "The Mother Grove",
  "Synagogue Of Collapse",
  "Sanctuary Of The Ancients",
  "The Weeping Willow",
  "The Exalted Maple",
  "Altar Of The Void",
  "The Pure Stone",
  "The Celestial Vertex",
  "The Eternal Orchard",
  "The Amaranthine Rock",
  "The Pearl Summit",
  "Mosque Of Mercy",
  "The Mirror Grotto",
  "The Glowing Geyser",
  "Altar Of Perfection",
  "The Cerulean Chamber",
  "The Mythic Trees",
  "The Perpetual Ridge",
  "The Fading Yew",
  "The Origin Oasis",
  "The Sanctified Fjord",
  "The Pale Pillar",
  "Sanctum Of The Oracle",
  "The Ethereal Isle",
  "The Omen Graves",
  "The Pale Vertex",
  "The Glowing Pinnacle",
  "The Azure Lake",
  "The Argent Catacombs",
  "The Dark Mountain",
  "Sky Mast",
  "Infinity Spire",
  "The Exalted Basin",
  "The Ancestral Trees",
  "The Perpetual Fjord",
  "The Ancient Lagoon",
  "The Pearl River",
  "The Cerulean Reliquary",
  "Altar Of Divine Will",
  "Pagoda Of Fortune",
  "The Oracle Pool",
];
