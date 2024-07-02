import type { Meta, StoryObj } from "@storybook/react";

import { Label } from "../label";
import { Switch } from "../switch";

const meta: Meta<typeof Switch> = {
  title: "ui/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Switch>;

export const Base: Story = {
  render: (args) => (
    <div className="bg-dark-green p-[40px]">
      <Switch {...args} />
    </div>
  ),

  args: {},
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="p--1 flex bg-dark-green p-[40px]">
      <Label htmlFor="labelSwitch" className="mr-[10px] pt-[5px]">
        Attribute
      </Label>
      <Switch {...args} />
    </div>
  ),
  args: {
    className: "t-[2px]",
    id: "labelSwitch",
  },
};

export const Disabled: Story = {
  render: (args) => (
    <div className="p--1 flex justify-between rounded bg-dark-green p-[40px]">
      <Switch {...args} />
    </div>
  ),
  args: {
    disabled: true,
  },
};
