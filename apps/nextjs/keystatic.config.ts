import { collection, config, fields } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
  },
  ui: {
    brand: { name: "Realms.World" },
  },
  collections: {
    games: collection({
      label: "Games",
      slugField: "title",
      path: "src/content/games/*",
      format: { contentField: "content" },
      columns: ["title", "icon"],
      schema: {
        title: fields.slug({ name: { label: "Game Title" } }),
        color: fields.text({ label: "Color" }),
        status: fields.select({
          label: "Status",
          defaultValue: "development",
          options: [
            { label: "Development", value: "development" },
            { label: "Alpha", value: "alpha" },
            { label: "Beta", value: "beta" },
            { label: "Mainnet", value: "mainnet" },
          ],
        }),
        developer: fields.relationship({
          label: "Developer",
          collection: "studios",
        }),
        genres: fields.array(fields.text({ label: "Genre" }), {
          label: "Genres",
        }),
        description: fields.text({ label: "Description" }),
        content: fields.markdoc({ label: "Content" }),
        links: fields.object(
          {
            homepage: fields.url({ label: "Website" }),
            discord: fields.url({ label: "Discord" }),
            twitter: fields.text({ label: "Twitter" }),
            telegram: fields.url({ label: "Telegram" }),
            github: fields.url({ label: "Github" }),
          },
          { label: "Links" },
        ),
        operatingSystems: fields.array(fields.text({ label: "OS" }), {
          label: "Operating Systems",
        }),
        lords: fields.text({
          label: "Lords Usage",
          description: " How the Lords Token is used in the game",
        }),
        chains: fields.array(fields.text({ label: "Chain ID" }), {
          label: "Chains",
        }),
        collections: fields.array(fields.text({ label: "Collection" }), {
          label: "Collections",
        }),
        tokens: fields.array(fields.text({ label: "Token" }), {
          label: "Tokens",
        }),
        icon: fields.image({
          label: "Icon",
          directory: "public/content/games",
        }),
        coverImage: fields.image({
          label: "Image",
          directory: "public/content/games",
        }),
        screenshots: fields.array(
          fields.image({
            label: "Screenshot",
            directory: "public/content/games",
          }),
          { label: "Screenshots" },
        ),
        playable: fields.checkbox({ label: "Playable" }),
      },
    }),
    events: collection({
      label: "Events",
      slugField: "name",
      path: "src/content/events/*",
      format: { contentField: "content" },
      columns: ["name", "endDate"],
      schema: {
        name: fields.slug({ name: { label: "Name" } }),
        description: fields.text({ label: "Description" }),
        startDate: fields.datetime({ label: "Start" }),
        endDate: fields.datetime({ label: "End" }),
        content: fields.markdoc({ label: "Content" }),
        image: fields.image({
          label: "Image",
          directory: "public/content/events",
        }),
        website: fields.url({ label: "Website" }),
        type: fields.multiselect({
          label: "Type",
          options: [
            { label: "Play", value: "play" },
            { label: "Watch", value: "watch" },
            { label: "Learn", value: "learn" },
            { label: "Banter", value: "banter" },
          ],
        }),
      },
    }),
    studios: collection({
      label: "Studios",
      slugField: "title",
      path: "src/content/studios/*",
      format: { contentField: "content" },
      columns: ["title", "description"],
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "Description" }),
        content: fields.markdoc({ label: "Content" }),
        links: fields.object(
          {
            homepage: fields.url({ label: "Website" }),
            discord: fields.url({ label: "Discord" }),
            twitter: fields.text({ label: "Twitter" }),
            telegram: fields.url({ label: "Telegram" }),
            github: fields.url({ label: "Github" }),
          },
          { label: "Links" },
        ),
        logo: fields.image({
          label: "Logo",
          directory: "public/content/studios",
        }),
        image: fields.image({
          label: "Image",
          directory: "public/content/studios",
        }),
        games: fields.array(
          fields.relationship({
            label: "Games",
            collection: "games",
          }),
          {
            label: "Games",
            itemLabel: (props) => props.value,
          },
        ),
      },
    }),
  },
});
