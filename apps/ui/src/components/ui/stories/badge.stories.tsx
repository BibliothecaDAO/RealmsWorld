import type { Meta, StoryObj } from "@storybook/react";

import { Badge } from "../badge";

const meta: Meta<typeof Badge> = {
  title: "ui/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const Base: Story = {
  render: (args) => <Badge {...args}>Loot Survivor</Badge>,
  args: {
    className: "font-sans",
    variant: "default",
  },
};

export const Outline: Story = {
  render: (args) => <Badge {...args}>Loot Survivor</Badge>,
  args: {
    className: "font-sans",
    variant: "outline",
  },
};

export const Development: Story = {
  render: (args) => (
    <Badge {...args}>
      <span
        className={`mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-red-500`}
      ></span>
      Development
    </Badge>
  ),
  args: {
    className: "bg-bright-yellow text-theme-gray font-sans",
  },
};

export const Beta: Story = {
  render: (args) => (
    <Badge {...args}>
      <span
        className={`mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-green-500`}
      ></span>
      Beta
    </Badge>
  ),
  args: {
    className: "bg-bright-yellow text-theme-gray font-sans",
  },
};

export const Alpha: Story = {
  render: (args) => (
    <div className="font-sans">
      <Badge {...args}>
        <span
          className={`mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-green-500`}
        ></span>
        Alpha
      </Badge>
    </div>
  ),
  args: {
    className: "bg-bright-yellow text-theme-gray font-sans",
  },
};

export const Mainnet: Story = {
  render: (args) => (
    <Badge {...args}>
      <span
        className={`mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-green-500`}
      ></span>
      Mainnet
    </Badge>
  ),
  args: {
    className: "bg-bright-yellow text-theme-gray font-sans",
  },
};

export const Default: Story = {
  render: (args) => (
    <Badge {...args}>
      <span
        className={`mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-gray-500`}
      ></span>
      Mainnet
    </Badge>
  ),
  args: {
    className: "bg-bright-yellow text-theme-gray font-sans",
  },
};

export const DarkGreenBackgroundOutline: Story = {
  render: (args) => (
    <Badge {...args}>
      <span
        className={`mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-green-500`}
      ></span>
      Mainnet
    </Badge>
  ),
  args: {
    className: "bg-dark-green text-bright-yellow font-sans",
    variant: "outline",
  },
};
