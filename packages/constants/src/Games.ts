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
  screenshotLength?: number;
}

export const games: Game[] = [
  {
    name: "Realms: Eternum",
    id: "realms-eternum",
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
    chains: [ChainId.SN_GOERLI],
    collections: [Collections.REALMS],
    tokens: [Tokens.LORDS],
    screenshotLength: 1,
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
    screenshotLength: 4,
  },
  {
    name: "Underdark",
    id: "underdark",
    developer: "Team Underworld",
    genres: ["Play to Die", "Roguelike", "Horror"],
    color: "#faffcb",
    status: "beta",
    description: "Play to Lose your Miiiind!",
    longform: "Underdark: Lair of the Slenderduck is a unique location in Realms.World, and a generative on-chain dungeon skin-crawler built on StarkNet. You have hubristically stumbled into the twisting tunnels beneath the manor at Old Kurnkornor, where you will lose your mind. With each step your limited light fades, and you descend further into madness. Collect Dark Tar to renew your light, avoid the twisted duck spawn, and find the stairs to escape the Slenderduck's gibbering embrace, even if only for a few more precious moments of sanity.",
    links: {
      homepage: "https://lootunder.world/underdark",
      testnet: "https://underdark.lootunder.world/",
      twitter: "https://x.com/LootUnderqorld",
    },
    operatingSystems: ["Web Browser"],
    lords: "TBD",
    chains: [ChainId.SLOT_TESTNET],
    collections: [],
    tokens: [Tokens.LORDS],
    screenshotLength: 6,
  },
  {
    name: "Loot Underworld",
    id: "loot-underworld",
    developer: "Team Underworld",
    genres: ["Play to Die", "Roguelike", "RPG"],
    color: "#fbf6c0",
    status: "alpha",
    description: "The Mysteries Below the Realms",
    longform: "Explore the endless mysteries of the The Underworld. A living autonomous (under)world of drama, story and danger, waiting to be explored and shaped by its inhabitants, and occupying the liminal space between and underneath. Underworld is an extension to Realms built on Starknet and Dojo, adding composable building blocks, and enabling a range of interoperable game experiences. The flagship game will be a retro narrative dungeon crawler.",
    links: {
      homepage: "https://lootunder.world",
      twitter: "https://x.com/LootUnderworld",
    },
    operatingSystems: ["Web Browser"],
    lords: "TBD",
    chains: [ChainId.SLOT_TESTNET],
    collections: [Collections.REALMS],
    tokens: [Tokens.LORDS],
    screenshotLength: 6,
  },
  {
    name: "Loot Auto Chess",
    id: "loot-auto-chess",
    developer: "HelheimLabs",
    genres: ["PvP", "Auto Battle"],
    color: "#f5f5f8",
    status: "In development",
    description: "Auto Chess Battle",
    longform:
      "Players can strategically select and upgrade heroes to form powerful combinations, manage their in-game economy wisely to optimize their team, and position their heroes effectively on the board to outlast their opponents in automated battles.",
    links: {},
    operatingSystems: ["Web Browser"],
    lords: "For ticket",
    chains: [],
    collections: [Collections.GOLDEN_TOKEN, Collections.BEASTS],
    tokens: [Tokens.LORDS],
    screenshotLength: 1,
  },
  {
    name: "Mississippi",
    id: "mississippi",
    developer: "Mississippi Team",
    genres: ["SLG", "PVP", "Roguelike"],
    color: "#6F391E",
    status: "beta",
    description: "Fully on-chain PVP roguelike game",
    longform:
      'Mississippi is a fully on-chain PVP roguelike game. We hope to create an expansive cavern space, containing abundant resources, which players need to explore and exploit as many resources from the cavern as possible within a fixed time limit. Besides, we will integrate with the Lootverse, such as by "extracting" equipment and resources from Loot Bags and Realms, which can give players specific attributes for each round.',
    links: {
      mainnet: "https://0xMssp.xyz/",
      testnet: "https://test.0xMssp.xyz/",
      discord: "https://discord.com/invite/rg9V8J49",
      twitter: "https://twitter.com/0xMississippi",
    },
    operatingSystems: ["Web Browser"],
    lords: "N/A",
    chains: [ChainId.MISSISSIPPI_TESTNET],
    collections: [Collections.REALMS],
    tokens: [Tokens.LORDS],
    screenshotLength: 4,
  },
  {
    name: "StarkLand",
    id: "stark-land",
    developer: "VivaLabs",
    genres: ["SLG", "PvP"],
    color: "#f5f5f5",
    status: "alpha",
    description: "Full on chain SLG",
    longform:
      "Realm holders can create their Realm World, where players can mine, war, explore in your world, also invade other World.",
    links: {
      homepage: "https://app.starkland.xyz/",
      twitter: "https://twitter.com/starkland_xyz",
      whitepaper: "https://starknopoly.gitbook.io/starkland/",
    },
    operatingSystems: ["Web Browser"],
    lords: "Trade for resources",
    chains: [ChainId.SN_MAIN],
    collections: [Collections.GOLDEN_TOKEN],
    tokens: [Tokens.LORDS],
    screenshotLength: 3,
  },
  {
    name: "GenLoot",
    id: "gen-loot",
    developer: "Crazy_Diamond",
    genres: ["Strategy Card Games", "RPG"],
    color: "#00FF63",
    status: "In development",
    description: "Full on chain Role-playing adventure card game",
    longform:
      "Combining the mechanics of Loot Survivor contracts with the interactive style of the Reigns game, GenLoot offers a novel fully on-chain gaming experience. Players can explore endless possibilities in this world built on blockchain smart contracts and decentralized storage, simply by swiping cards left or right",
    links: {},
    operatingSystems: ["Web Browser"],
    lords: "As a game ticket",
    chains: [ChainId.SN_MAIN],
    collections: [Collections.GOLDEN_TOKEN,Collections.REALMS],
    tokens: [Tokens.LORDS],
    screenshotLength: 3,
   },
   {
    name: "Rising Revenant",
    id: "rising-revenant",
    developer: "Grug's Lair",
    genres: ["Last Man Standing", "Strategy"],
    color: "#f5f5f5",
    status: "development",
    description: "Last man standing",
    longform:
      "Rising Revenant is a last man standing strategy game that is built on StarkNet and powered by Dojo. Rising Revenant offers an exhilarating mix of strategy, chance, and foresight, making it a captivating endeavor for gamers and crypto enthusiasts. Will you rise to the challenge and etch your name in the annals of this adventure?",
    links: {
      discord: "https://t.co/E9lZFnBzci",
      twitter: "https://twitter.com/RRisingRevenant",
      whitepaper: "https://github.com/GrugLikesRocks/Rising-Revenant",
    },
    operatingSystems: ["Web Browser"],
    lords: "Trade for resources",
    chains: [ChainId.SN_MAIN],
    collections: [Collections.GOLDEN_TOKEN],
    tokens: [Tokens.LORDS],
    screenshotLength: 3,
  },
  {
    name: "Arcane Assembler",
    id: "arcane-assembler",
    developer: "Arcane Assemblers",
    genres: ["Play to Die", "Card Game"],
    color: "#f5f5f5",
    status: "development",
    description: "Arcane Assembler",
    longform:
      "Arcane Assembly is a Play2Die card game where you must build the most powerful spell you can... without exploding first. Forage for ingredients, perform rituals, and summon helpers but manage your time wisely. Spells left unattended quickly become unstable. Compete with other mages from across the realm for bragging rights and rewards.",
    links: {
      homepage: "https://github.com/ArcaneAssemblers/spellcrafter",
      discord: "https://discord.gg/4S97gdsK",
      twitter: "https://twitter.com/ArcaneAssembler",
    },
    operatingSystems: ["Web Browser"],
    lords: "TBD",
    chains: [ChainId.SN_GOERLI],
    collections: [],
    tokens: [],
    screenshotLength: 4,
  },
  {
    name: "Call the Banners",
    id: "call-the-banners",
    developer: "Banners (for Adventurers)",
    genres: ["Social", "Strategy", "PvP"],
    color: "#f5f5f5",
    status: "development",
    description: "Medieval Castle Siege Game",
    longform:
      "Call the Banners is a game where mercenaries navigate blurred lines between loyalty and betrayal in a medieval siege. Choose a side, manage resources, and strategize to destroy the opposing castle, with victory bringing rewards. Which side will you lend your sword?",
    links: {
      discord: "https://discord.gg/8WybFeKn",
      twitter: "https://twitter.com/callthe_banners",
      homepage: "https://www.bannersnft.com/",
    },
    operatingSystems: ["Web Browser"],
    lords: "TBD",
    chains: [ChainId.SN_MAIN],
    collections: [],
    tokens: [Tokens.LORDS],
    screenshotLength: 1,
  }
];
