import type { Meta, StoryObj } from "@storybook/react";

import { Progress } from "./progress";

const meta: Meta<typeof Progress> = {
  title: "ui/Progress",
  component: Progress,
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Progress>;

export const Base: Story = {
  render: (args) => <Progress {...args} />,
  args: {
    value: 50,
  },
};

export const Complete: Story = {
  render: (args) => <Progress {...args} />,
  args: {
    value: 100,
  },
};

export const Zero: Story = {
  render: (args) => <Progress {...args} />,
  args: {},
};
