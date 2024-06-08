import type { Meta, StoryObj } from "@storybook/react";
import { Mail, Trash } from "lucide-react";

import { IconButton } from "./icon-button";

const meta: Meta<typeof IconButton> = {
  title: "ui/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof IconButton>;

export const Base: Story = {
  render: (args) => (
    <IconButton {...args}>
      <Mail color="white" />
    </IconButton>
  ),
  args: {
    className: "bg-indigo-500",
  },
};

export const Loading: Story = {
  render: (args) => (
    <IconButton {...args}>
      <Mail color="white" />
    </IconButton>
  ),
  args: {
    isLoading: true,
    color: "white",
    className: "bg-indigo-500",
  },
};

export const Disabled: Story = {
  render: (args) => (
    <IconButton {...args}>
      <Mail color="white" />
    </IconButton>
  ),
  args: {
    disabled: true,
    className: "bg-indigo-500",
  },
};

export const Large: Story = {
  render: (args) => (
    <IconButton {...args}>
      <Mail color="white" />
    </IconButton>
  ),
  args: {
    size: "large",
    className: "bg-indigo-500",
  },
};

export const XLarge: Story = {
  render: (args) => (
    <IconButton {...args}>
      <Mail color="white" />
    </IconButton>
  ),
  args: {
    size: "xlarge",
    className: "bg-indigo-500",
  },
};
