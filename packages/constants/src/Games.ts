import { ChainId } from "./Chains";
import { Collections } from "./Collections";
import { Tokens } from "./Tokens";

interface Link {
  mainnet?: string;
  testnet?: string;
  discord?: string;
  twitter?: string;
  whitepaper?: string;
  homepage?: string;
}
export interface Game {
  name: string; // Display name of the game
  id: string; // Game ID (used for URL must be kebab-case)
  color: string;
  status: string;
  developer: string;
  genres?: string[];
  description: string;
  longform: string;
  links: Link;
  operatingSystems?: string[];
  lords?: string; // How the Lords Token is used in the game
  chains: ChainId[];
  collections?: Collections[];
  tokens?: Tokens[];
}

export const games: Game[] = [
  {
    name: "Realms: Eternum",
    id: "realms-adventurers",
    developer: "BiblioDAO",
    genres: ["Economic Strategy", "PvP", "Raiding"],
    color: "#f5f5f5",
    status: "alpha",
    description: "Conquer the Realms",
    longform:
      "Eternum is a strategy game that is built on StarkNet. It is a game of management and conquest, where players must build and defend their Realm to thrive. The game is governed by a set of rules that are enforced by the game's smart contracts.",
    links: {
      homepage: "https://eternum.realms.world/",
      discord: "https://discord.gg/uQnjZhZPfu",
      twitter: "https://twitter.com/LootRealms",
      whitepaper: "https://scroll.bibliothecadao.xyz/",
    },
    operatingSystems: ["Web Browser"],
    lords: "Trade for resources",
    chains: [ChainId.SN_MAIN],
    collections: [Collections.REALMS],
    tokens: [Tokens.LORDS],
  },
  {
    name: "Loot Survivor",
    id: "loot-survivor",
    developer: "BiblioDAO",
    genres: ["Play to Die", "Roguelike"],
    color: "#f5f5f5",
    status: "beta",
    description: "Play to Die",
    longform:
      "Survivors is the first Loot adventure game exploring the Play2Die mechanic. It is a game of onchain survival where you must defeat beasts and collect gear in the fight to stay alive and make it to the top of the leaderboard.",
    links: {
      mainnet: "https://survivor.realms.world/",
      testnet: "https://beta-survivor.realms.world/",
      discord: "https://discord.gg/realmsworld",
      twitter: "https://twitter.com/LootRealms",
    },
    operatingSystems: ["Web Browser"],
    lords: "25 Per Adventurer",
    chains: [ChainId.SN_MAIN],
    collections: [Collections.GOLDEN_TOKEN],
    tokens: [Tokens.LORDS],
  },
];
