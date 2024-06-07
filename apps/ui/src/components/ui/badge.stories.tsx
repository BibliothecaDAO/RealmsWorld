import type { Meta, StoryObj } from "@storybook/react";

import { Badge, StatusDot } from "./badge";

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
      {StatusDot("development")}
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
      {StatusDot("beta")}
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
        {StatusDot("alpha")}
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
      {StatusDot("mainnet")}
      Mainnet
    </Badge>
  ),
  args: {
    className: "bg-bright-yellow text-theme-gray font-sans",
  },
};
