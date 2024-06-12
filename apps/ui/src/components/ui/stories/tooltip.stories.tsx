import type { Meta, StoryObj } from "@storybook/react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Base: Story = {
  render: (args) => (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip {...args}>
            <TooltipTrigger>
              <span className="font-sans-serif text-lg text-black">
                Creator Royalties
              </span>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p className="font-sans-serif">
                A fee on every order that goes to the collection creator.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  ),
  args: {},
};

export const Left: Story = {
  render: (args) => (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip {...args}>
            <TooltipTrigger>
              <span className="font-sans-serif text-lg text-black">
                Creator Royalties
              </span>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p className="font-sans-serif">
                A fee on every order that goes to the collection creator.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  ),
  args: {},
};

export const Top: Story = {
  render: (args) => (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip {...args}>
            <TooltipTrigger>
              <span className="font-sans-serif text-lg text-black">
                Creator Royalties
              </span>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p className="font-sans-serif">
                A fee on every order that goes to the collection creator.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  ),
  args: {},
};

export const Botton: Story = {
  render: (args) => (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip {...args}>
            <TooltipTrigger>
              <span className="font-sans-serif text-lg text-black">
                Creator Royalties
              </span>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p className="font-sans-serif">
                A fee on every order that goes to the collection creator.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  ),
  args: {},
};
