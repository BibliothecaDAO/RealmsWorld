import { ChainId } from "./Chains";
import { Collections } from "./Collections";
import { Studios } from "./Studios";
import { Tokens } from "./Tokens";

interface Link {
  mainnet?: string;
  testnet?: string;
  discord?: string;
  twitter?: string;
  whitepaper?: string;
  homepage?: string;
}

type Status = "alpha" | "beta" | "development" | "mainnet";

export interface Game {
  name: string; // Display name of the game
  id: string; // Game ID (used for URL must be kebab-case)
  color: string;
  status: Status;
  developer: Studios;
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
    developer: Studios.BIBLIO_DAO,
    genres: ["Economic Strategy", "PvP", "Raiding", "Economy"],
    color: "#f5f5f5",
    status: "development",
    description: "The Economic Seed of the Realms World",
    longform:
      "Eternum represents the culmination of two years of dedicated effort, aimed at crafting a world that transcends the bounds of its creators. It's not just a game; it's a sophisticated fusion of economic and social frameworks, forming the backbone of a burgeoning digital society. Eternum is designed to evolve and grow, offering a dynamic experience far removed from the conventional notion of a 'finished game' like Civilization 6. Think of it as a living, breathing digital ecosystem, constantly evolving and inviting endless exploration.",
    links: {
      homepage: "https://eternum.realms.world/",
      discord: "https://discord.gg/uQnjZhZPfu",
      twitter: "https://twitter.com/LootRealms",
    },
    operatingSystems: ["Web Browser"],
    lords: "Trade for resources",
    chains: [ChainId.REALMS_L3],
    collections: [Collections.REALMS],
    tokens: [Tokens.LORDS],
    screenshotLength: 2,
  },
  {
    name: "Paved",
    id: "paved",
    developer: Studios.PAVED_STUDIO,
    genres: ["tile-matching", "puzzle", "strategy"],
    color: "#f5f5f5",
    status: "beta",
    description: "Pave your way to victory",
    longform:
      "In PAVED, players compete for high scores and rewards by laying tiles to form an expanding medieval landscape. Inspired by the board game Carcassonne, solo and multiplayer modes offer unique, strategic experiences that test both planning and decisiveness. Think you’ve got what it takes? Pave your way to victory in a fully onchain strategy game like no other.",
    links: {
      homepage: "https://sepolia.paved.gg/",
      discord: "https://discord.gg/uQnjZhZPfu",
      twitter: "https://twitter.com/pavedgame",
    },
    operatingSystems: ["Web Browser"],
    lords: "Trade for resources",
    chains: [ChainId.REALMS_L3],
    collections: [Collections.GOLDEN_TOKEN],
    tokens: [Tokens.LORDS],
    screenshotLength: 2,
  },
  {
    name: "Loot Survivor",
    id: "loot-survivor",
    developer: Studios.BIBLIO_DAO,
    genres: ["Play to Die", "Roguelike"],
    color: "#f5f5f5",
    status: "mainnet",
    description: "Play to Die",
    longform:
      "Survivors is the first Loot adventure game exploring the Play2Die mechanic. It is a game of onchain survival where you must defeat beasts and collect gear in the fight to stay alive and make it to the top of the leaderboard.",
    links: {
      homepage: "https://survivor.realms.world/",
      mainnet: "https://survivor.realms.world/",
      testnet: "https://beta-survivor.realms.world/",
      discord: "https://discord.gg/realmsworld",
      twitter: "https://twitter.com/LootRealms",
    },
    operatingSystems: ["Web Browser"],
    lords: "25 Per Adventurer",
    chains: [ChainId.SN_MAIN, ChainId.REALMS_L3],
    collections: [Collections.GOLDEN_TOKEN, Collections.BEASTS],
    tokens: [Tokens.LORDS],
    screenshotLength: 4,
  },
  {
    name: "Pistols at Ten Blocks",
    id: "pistols",
    developer: Studios.UNDERWARE,
    genres: ["Social", "Casual", "Strategy", "PVP"],
    color: "#faffcb",
    status: "beta",
    description: "Defend thine honour in a duel",
    longform:
      '"Thou art an offence to all that is decent, dog. I challenge you... to a duel!". In Pistols at Ten Blocks, you face off against your opponent for honour or profit, in a pistol duel at "10" paces. Will you duel with honour, or turn early and shoot the wretched cur in the back? Earn yourself glory on the leaderboard, or a shallow grave behind the Fool & Flintlock tavern.',
    links: {
      homepage: "https://lootunder.world/pistols",
      testnet: "https://pistols.lootunder.world/",
      twitter: "https://x.com/underware_gg",
    },
    operatingSystems: ["Web Browser"],
    lords: "10% of wager, min of 4 per game",
    chains: [ChainId.SLOT_TESTNET, ChainId.REALMS_L3],
    collections: [Collections.GOLDEN_TOKEN],
    tokens: [Tokens.LORDS],
    screenshotLength: 6,
  },
  {
    name: "zConqueror",
    id: "zconqueror",
    developer: Studios.ZKORP,
    genres: ["Strategy", "PvP", "Casual"],
    color: "#f5f5f5",
    status: "beta",
    description: "Conquer the world",
    longform:
      "zConqueror is a strategy game based on Risk, focusing on conquest and realm defense. Players compete to dominate the map and win rewards. You can compete up to 6 players",
    links: {
      twitter: "https://twitter.com/zKorp_",
      homepage: "https://app.zconqueror.xyz/",
    },
    chains: [ChainId.SLOT_TESTNET, ChainId.REALMS_L3],
    operatingSystems: ["Web Browser"],
    tokens: [Tokens.LORDS],
    screenshotLength: 4,
  },
  {
    name: "Underdark",
    id: "underdark",
    developer: Studios.UNDERWARE,
    genres: ["Play to Die", "Roguelike", "Horror", "PVE"],
    color: "#faffcb",
    status: "alpha",
    description: "Play to Lose your Miiiind!",
    longform:
      "Underdark: Lair of the Slenderduck is a unique location in The Underworld & Realms.World, and a generative onchain dungeon skin-crawler built on Dojo & StarkNet. You have hubristically stumbled into the twisting tunnels beneath the manor at Old Kurnkornor, where you will lose your mind. With each step your limited light fades, and you descend further into madness. Collect Dark Tar to renew your light, avoid the twisted duck spawn, and find the stairs to escape the Slenderduck's gibbering embrace, even if only for a few more precious moments of sanity.",
    links: {
      homepage: "https://lootunder.world/underdark",
      testnet: "https://underdark.lootunder.world/",
      twitter: "https://x.com/LootUnderworld",
    },
    operatingSystems: ["Web Browser"],
    lords: "TBD",
    chains: [ChainId.SLOT_TESTNET, ChainId.REALMS_L3],
    collections: [],
    tokens: [Tokens.LORDS],
    screenshotLength: 6,
  },
  {
    name: "Loot Underworld",
    id: "loot-underworld",
    developer: Studios.UNDERWARE,
    genres: ["Play to Die", "Roguelike", "RPG", "Dungeon Crawler"],
    color: "#fbf6c0",
    status: "development",
    description: "The Mysteries Below the Realms",
    longform:
      "Explore the endless mysteries of The Underworld. A living autonomous (under)world of drama, story and danger, waiting to be explored and shaped by its inhabitants, and occupying the liminal space between and underneath. Underworld is an extension to Eternum & Realms, built on Starknet and Dojo, adding composable building blocks, and enabling a range of interoperable game experiences. The flagship game will be a retro narrative dungeon crawler.",
    links: {
      homepage: "https://lootunder.world",
      twitter: "https://x.com/LootUnderworld",
    },
    operatingSystems: ["Web Browser"],
    lords: "TBD",
    chains: [ChainId.SLOT_TESTNET, ChainId.REALMS_L3],
    collections: [Collections.REALMS, Collections.BEASTS],
    tokens: [Tokens.LORDS],
    screenshotLength: 6,
  },
  {
    name: "Mississippi",
    id: "mississippi",
    developer: Studios.MISSISSIPPI_TEAM,
    genres: ["SLG", "PVP", "Roguelike"],
    color: "#6F391E",
    status: "development",
    description: "Fully on-chain PVP roguelike game",
    longform:
      'Mississippi is a fully on-chain PvP roguelike game. We aim to create an expansive cavern space filled with abundant resources. Players are tasked with exploring the cavern and exploiting as many resources as possible within a fixed time limit. Additionally, we plan to integrate with the Lootverse, allowing for the "extraction" of equipment and resources from Loot Bags and Realms. This integration will provide players with specific attributes for each round.',
    links: {
      mainnet: "https://0xMssp.xyz/",
      testnet: "https://test.0xMssp.xyz/",
      discord: "https://discord.com/invite/rg9V8J49",
      twitter: "https://twitter.com/0xMississippi",
    },
    operatingSystems: ["Web Browser"],
    lords: "N/A",
    chains: [ChainId.MISSISSIPPI_TESTNET, ChainId.REALMS_L3],
    collections: [],
    tokens: [Tokens.LORDS],
    screenshotLength: 4,
  },
   {
    name: "Kingdom-of-Lords",
    id: "Kingdom-of-Lords",
    developer: Studios.MISSISSIPPI_TEAM,
    genres: ["SLG", "PVP", "MMO Strategy Game"],
    color: "#6F391E",
    status: "beta",
    description: "Fully on-chain MMO Strategy Game",
    longform:
      'The kindom of Lords is a fully on-chain SLG game designed specifically for the Starknet\n\nIn the world of "Kingdom&Lords", you embark on an epic journey, where strategy and wisdom go hand in hand, and alliances are forged to conquer new territories. Build your village, develop agriculture and economy, muster a mighty army, and erect invincible walls. \n\nBut "Kingdom of Lords" is more than this, its a realm of social strategy where no hero stands alone, only with brave and wise allies. Every decision you make can alter the course of battle, and your alliance is your unbreakable shield. Send envoys, make allies with heroes from all corners of the world, and fight side by side with players globally to witness the rise of a dynasty.',
    links: {
      mainnet: "https://kingdom.0xmssp.xyz/",
      discord: "https://discord.gg/XKqfEcHaUh",
      twitter: "https://twitter.com/0xMississippi",
    },
    operatingSystems: ["Web Browser"],
    lords: "As the main token of the game",
    chains: [ ChainId.REALMS_L3],
    collections: [],
    tokens: [Tokens.LORDS],
    screenshotLength: 3,
  },
  {
    name: "GenLoot",
    id: "gen-loot",
    developer: Studios.CRAZY_DIAMOND,
    genres: ["Strategy Card Games", "RPG"],
    color: "#00FF63",
    status: "development",
    description: "Full on chain Role-playing adventure card game",
    longform:
      "Combining the mechanics of Loot Survivor contracts with the interactive style of the Reigns game, GenLoot offers a novel fully on-chain gaming experience. Players can explore endless possibilities in this world built on blockchain smart contracts and decentralized storage, simply by swiping cards left or right.",
    links: {},
    operatingSystems: ["Web Browser"],
    lords: "As a game ticket",
    chains: [ChainId.SN_MAIN],
    collections: [Collections.GOLDEN_TOKEN, Collections.REALMS],
    tokens: [Tokens.LORDS],
    screenshotLength: 3,
  },
  {
    name: "Rising Revenant",
    id: "rising-revenant",
    developer: Studios.GRUGS_LAIR,
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
    chains: [ChainId.SN_MAIN, ChainId.REALMS_L3],
    collections: [Collections.GOLDEN_TOKEN],
    tokens: [Tokens.LORDS],
    screenshotLength: 3,
  },
  {
    name: "Arcane Assembler",
    id: "arcane-assembler",
    developer: Studios.ARCANE_ASSEMBLERS,
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
    chains: [ChainId.SN_SEPOLIA, ChainId.REALMS_L3],
    collections: [],
    tokens: [],
    screenshotLength: 4,
  },
  {
    name: "Call the Banners",
    id: "call-the-banners",
    developer: Studios.BANNERS_FOR_ADVENTURERS,
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
  },
  {
    name: "Force Prime Heroes",
    id: "force-prime-heroes",
    developer: Studios.FORCE_PRIME_STUDIO,
    genres: ["strategy", "RPG"],
    color: "#f5f5f5",
    status: "alpha",
    description: "Classic Turn Based Strategy",
    longform:
        "Force Prime Heroes is a fully on-chain game inspired by the Heroes of Might and Magic series. You need to explore the map with your hero, grow your army, defeat enemies and kill the Bone Dragon to win. Find your best strategy and become a true hero of on-chain worlds!",
    links: {
      homepage: "https://forceprime.io",
      discord: "https://discord.gg/8SFzxSgbq3",
      twitter: "https://twitter.com/ForcePrime_io",
    },
    operatingSystems: ["Web Browser"],
    chains: [ChainId.SN_DEVNET],
    collections: [],
    tokens: [],
    screenshotLength: 4,
  }
];
