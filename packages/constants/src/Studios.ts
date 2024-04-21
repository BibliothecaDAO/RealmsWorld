import type { Collections } from "./Collections";
import type { Game} from "./Games";
import { games } from "./Games";

interface Link {
  discord?: string;
  twitter?: string;
  telegram?: string;
  github?: string
  homepage?: string;
}
export enum Studios {
  BIBLIO_DAO = "biblio-dao",
  PAVED_STUDIO = "paved-studios",
  UNDERWARE = "underware",
  ZKORP = "zkorp",
  MISSISSIPPI_TEAM = "mississippi-team",
  CRAZY_DIAMOND = "crazy-diamond",
  GRUGS_LAIR = "grugs-lair",
  ARCANE_ASSEMBLERS = "arcane-assemblers",
  BANNERS_FOR_ADVENTURERS = "banners",
}

export interface StudioInterface {
  name: string; // Display name of the Studio
  id: string; // Studio ID (used for URL must be kebab-case)
  logoFormat: "png" | "svg" | 'jpg' | 'webp' | null; 
  description: string;
  longform: string;
  links: Link;
  collections?: Collections[];
  screenshotLength?: number;
}

export const studios: { [key in Studios]?: StudioInterface } = {
  [Studios.BIBLIO_DAO]: {
    name: "BiblioDAO",
    id: "biblio-dao",
    description: "Guardians of Realms.World",
    longform:
      "The BiblioDAO is steered by 8000 unique Realms NFTs, entrusted to a diverse community of players, developers, and stakeholders. Together, they guide the evolution and expansion of the Realms Autonomous World.",
    logoFormat: "svg",
    links: {
      homepage: "https://realms.world/",
      discord: "https://discord.gg/uQnjZhZPfu",
      twitter: "LootRealms",
      telegram: "https://t.me/+UpfCtj7qEO9hZjU1",
      github: "https://github.com/BibliothecaDAO/"
    },
  },
  [Studios.PAVED_STUDIO]: {
    name: "Paved Studios",
    id: "paved-studios",
    description: "",
    longform: "",
    logoFormat: "png",
    links: {
      homepage: "https://paved.gg/",
      twitter: 'pavedgame',
      discord: "",
      telegram: "",
      github: ""
    },
  },
  [Studios.UNDERWARE]: {
    name: "Underware",
    id: "underware",
    description: "Realmsverse Game Studio & Knights of the Realm",
    longform: "Underware is a fully on-chain game studio of veteran technologists, committed to building on and contributing to the Realms Network. We are extending the Realmsverse with an expansive autonomous (under)world, and building various related games and novel mechanics, including an narrative dungeon crawler.\n\n We consider ourselves long-term aligned with the Realmsverse, with a focus upon crafting meaningful, engaging, and open technology & game experiences at the frontier of autonomous worlds.",
    logoFormat: 'jpg',
    links: {
      homepage: "https://underware.gg/",
      twitter: "underware_gg",
      github: "funDAOmental"
    },
    screenshotLength: 2,
  },
  [Studios.GRUGS_LAIR]: {
    name: "Grug's Lair",
    id: "grugs-lair",
    description: "",
    longform: "",
    logoFormat: "png",
    links: {
      homepage: "https://www.grugslair.xyz/",
      twitter: 'GrugsLair'
    },
  },
  [Studios.ZKORP]: {
    name: "zKorp",
    id: "zkorp",
    description: "",
    longform: "",
    logoFormat: "jpg",
    links: {
      twitter: "zKorp_",
    },
    screenshotLength: 2,
  },
  [Studios.BANNERS_FOR_ADVENTURERS]: {
    name: "Banners (for Adventurers)",
    id: "banners",
    description: "",
    longform: "",
    logoFormat: null,
    links: {
      homepage: "",
      discord: "https://discord.gg/NkHnWCPc6D",
      telegram: "",
      github: "",
      twitter: "BannersNft"
    },
  },
  [Studios.MISSISSIPPI_TEAM]: {
    name: "Mississippi Team",
    id: "mississippi-team",
    description: "",
    longform: "",
    logoFormat: 'svg',
    links: {
      discord: "https://discord.gg/XKqfEcHaUh",
      twitter: "0xMississippi",
      homepage: "https://0xmssp.xyz/"
    },
  },
  [Studios.CRAZY_DIAMOND]: {
    name: "Crazy Diamond",
    id: "crazy-diamond",
    description: "",
    longform: "",
    logoFormat: null,
    links: {
      homepage: "",
    },
  },
  [Studios.ARCANE_ASSEMBLERS]: {
    name: "Arcane Assemblers",
    id: "arcane-assemblers",
    description: "",
    longform: "",
    logoFormat: null,
    links: {
      twitter: "ArcaneAssembler",
      github: "ArcaneAssemblers"
    },
  },
  // Continue for each developer listed in the games array
};
export function getGamesByStudio(studio: Studios): Game[] {
  return games.filter((game) => game.developer === studio);
}
