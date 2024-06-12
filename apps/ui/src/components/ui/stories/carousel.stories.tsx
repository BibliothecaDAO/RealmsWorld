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

const carouselImages = games.map((game: Game) => ({
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
    images: carouselImages,
    cover: true,
    options: { loop: true },
    autoPlay: true,
  },
};
