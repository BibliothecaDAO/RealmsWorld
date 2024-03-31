import { defineConfig } from "vocs";

export default defineConfig({
  title: "Realms World L3 Network",
  iconUrl: "/RealmsWorld.svg",
  logoUrl: "/RealmsWorld.svg",
  topNav: [
    { text: "Dojo", link: "https://dojoengine.org" },
    {
      text: "Realms World",
      link: "https://realms.world",
    },
  ],
  font: {
    google: "Poppins",
  },
  theme: {
    variables: {
      color: {
        textAccent: {
          light: "#071E3F",
          dark: "#ffa9cc",
        },
      },
    },
  },
  socials: [
    {
      icon: "github",

      link: "https://github.com/BibliothecaDAO/realms-world-development",
    },
    {
      icon: "x",

      link: "https://twitter.com/lootrealms",
    },
    {
      icon: "discord",
      link: "https://discord.gg/realmsworld",
    },
  ],
  editLink: {
    pattern:
      "https://github.com/BibliothecaDAO/realms-world-development/blob/main/dojo-book/docs/pages/:path",
    text: "Edit on GitHub",
  },
  ogImageUrl:
    "https://vocs.dev/api/og?logo=%logo&title=%title&description=%description",
  description: "A world-specific L3 network for Realms World.",
  sponsors: [
    {
      name: "Built with",
      height: 60,
      items: [
        [
          {
            name: "Realms World",
            link: "https://realms.world",
            image: "/RealmsWorld.svg",
          },
        ],
        [
          {
            name: "Starknet",
            link: "https://starknet.io/",
            image: "/Starknet.svg",
          },
        ],
      ],
    },
  ],
  sidebar: [
    {
      text: "Developing",
      collapsed: true,
      items: [
        {
          text: "Getting Started",
          link: "/getting-started",
        },
        {
          text: "Client",
          link: "/client-development",
        },
        {
          text: "Marketplace",
          link: "/marketplace",
        },
        {
          text: "Subgraph",
          link: "/subgraph",
        },
        {
          text: "Starknet Indexer",
          link: "/starknet-indexer",
        },
      ],
    },
    {
      text: "Content",
      collapsed: true,
      items: [
        {
          text: "Adding Games",
          link: "/games",
        },
        {
          text: "Adding Blogs",
          link: "/posts",
        },
        {
          text: "Adding Events",
          link: "/events",
        },
      ],
    },
  ],
});
