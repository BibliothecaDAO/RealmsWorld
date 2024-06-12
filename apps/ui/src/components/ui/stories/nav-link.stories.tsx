import type { Meta, StoryObj } from "@storybook/react";

import { NavLink } from "../nav-link";

const meta: Meta<typeof NavLink> = {
  title: "ui/NavLink",
  component: NavLink,
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof NavLink>;

export const Base: Story = {
  render: (args) => <NavLink {...args}>Link</NavLink>,
  args: {
    href: "#",
    exact: true,
  },
};

export const Destructive: Story = {
  render: (args) => <NavLink {...args}>Link</NavLink>,
  args: {
    variant: "destructive",
    href: "#",
    exact: true,
  },
};

export const Outline: Story = {
  render: (args) => <NavLink {...args}>Link</NavLink>,
  args: {
    variant: "outline",
    href: "#",
    exact: true,
  },
};

export const Secondary: Story = {
  render: (args) => <NavLink {...args}>Link</NavLink>,
  args: {
    variant: "secondary",
    href: "#",
    exact: true,
  },
};

export const Ghost: Story = {
  render: (args) => <NavLink {...args}>Link</NavLink>,
  args: {
    variant: "ghost",
    href: "#",
    exact: true,
  },
};

export const Link: Story = {
  render: (args) => <NavLink {...args}>Link</NavLink>,
  args: {
    variant: "link",
    href: "#",
    exact: true,
  },
};

export const XSmall: Story = {
  render: (args) => <NavLink {...args}>Link</NavLink>,
  args: {
    size: "xs",
    href: "#",
    exact: true,
  },
};
export const Small: Story = {
  render: (args) => <NavLink {...args}>Link</NavLink>,
  args: {
    size: "sm",
    href: "#",
    exact: true,
  },
};

export const Large: Story = {
  render: (args) => <NavLink {...args}>Link</NavLink>,
  args: {
    size: "lg",
    href: "#",
    exact: true,
  },
};
