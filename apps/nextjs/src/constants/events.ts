import type { Event } from "@/types";

export const events: Event[] = [
  {
    name: "Paved: Lord of the Board",
    description: "A Paved Tourney for 2500 Lords in prizes.",
    startDate: "2024-03-28",
    endDate: "2024-04-04",
    location: "Realms",
    image: "/events/paved2.png",
    website: "https://paved.gg",
    slug: "paved",
    type: "play"
  },
  {
    name: "Pixel Banners Mint",
    description: "Generative Pixel Banners on Starknet.",
    startDate: "2024-03-28",
    endDate: "2024-04-04",
    location: "Realms",
    image: "/events/banners.png",
    website: "https://banners.realms.world",
    slug: "banners-mint",
    type:  "mint"
  },
];
