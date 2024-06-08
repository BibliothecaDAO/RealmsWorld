import type { Meta, StoryObj } from "@storybook/react";

import { Alert } from "../alert";

const meta: Meta<typeof Alert> = {
  title: "ui/Alert",
  // @ts-expect-error
  component: Alert,
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Alert>;

export const Base: Story = {
  render: (args) => <Alert {...args} />,
  args: {
    title: "Information",
    message: "This is an info alert",
    variant: "info",
  },
};

export const Success: Story = {
  render: (args) => <Alert {...args} />,
  args: {
    title: "",
    message: "This is a success alert",
    variant: "success",
  },
};

export const Warning: Story = {
  render: (args) => <Alert {...args} />,
  args: {
    title: "",
    message: "This is a warning alert",
    variant: "warning",
  },
};

export const Error: Story = {
  render: (args) => <Alert {...args} />,
  args: {
    title: "",
    message: "This is an error alert",
    variant: "error",
  },
};
