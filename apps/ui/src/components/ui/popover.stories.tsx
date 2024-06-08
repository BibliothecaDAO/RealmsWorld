import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

const meta: Meta<typeof Popover> = {
  title: "Components/Popover",
  component: Popover,
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Popover>;

export const Base: Story = {
  render: (args) => (
    <Popover>
      <PopoverTrigger>
        <Button>Open</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-3 py-2">
          <p>
            This is content inside of a popover component. More components can
            go in here.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
  args: {},
};
