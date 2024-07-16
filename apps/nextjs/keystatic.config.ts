// keystatic.config.ts
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
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        content: fields.markdoc({ label: "Content" }),
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
        image: fields.image({
          label: "Image",
          directory: "public/content/studios",
        }),
      },
    }),
  },
});
