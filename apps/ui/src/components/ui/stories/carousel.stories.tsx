import type { Meta, StoryObj } from "@storybook/react";

import type { Game } from "@realms-world/constants";
import { games } from "@realms-world/constants";

import { Carousel } from "../carousel";

const meta: Meta<typeof Carousel> = {
  title: "Components/Carousel",
  component: Carousel,
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Carousel>;

const baseCarouselImages = games.map((game: Game) => ({
  alt: game.name,
  src: `https://realms.world/_next/image?url=/games/${game.id}/cover.webp&w=3840&q=75`,
  description: game.description,
  href: `/games/${game.id}`,
  title: game.name,
}));

export const Base: Story = {
  render: (args) => (
    <Carousel
      {...args}
      className="left-0 top-0 h-[700px] font-sans-serif sm:w-full"
    />
  ),
  args: {
    images: baseCarouselImages,
    cover: true,
    options: { loop: true },
    autoPlay: true,
  },
};

export const CarouselWithPreviewImages: Story = {
  render: (args) => (
    <Carousel
      {...args}
      className="h-96 w-full sm:max-h-[750px] sm:min-h-[750px]"
    />
  ),
  args: {
    images: [
      {
        alt: "pistols",
        src: `https://realms.world/games/pistols/screenshots/4.png`,
      },
      {
        alt: "pistols",
        src: `https://realms.world/games/pistols/screenshots/5.png`,
      },
      {
        alt: "pistols",
        src: `https://realms.world/games/pistols/screenshots/6.png`,
      },
    ],
    cover: true,
    options: { loop: true },
    autoPlay: true,
    showPreview: true,
  },
};
