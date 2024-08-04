import type { Meta, StoryObj } from "@storybook/react";

import { Alert } from "../alert";

const meta: Meta<typeof Alert> = {
  title: "ui/Alert",
  component: Alert,
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Alert>;

export const Base: Story = {
  render: (args) => (
    <Alert {...args}>
      <p>This is a default alert</p>
    </Alert>
  ),
  args: {
    title: "Information",
    variant: "default",
  },
};

export const Warning: Story = {
  render: (args) => (
    <Alert {...args}>
      <p>This is a warning alert</p>
    </Alert>
  ),
  args: {
    title: "",
    variant: "warning",
  },
};

export const Destructive: Story = {
  render: (args) => (
    <Alert {...args}>
      <p>This is a destructive alert</p>
    </Alert>
  ),
  args: {
    title: "",
    variant: "destructive",
  },
};
