import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";

const meta: Meta<typeof DropdownMenu> = {
  title: "Components/DropownMenu",
  component: DropdownMenu,
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof DropdownMenu>;

const sortDirection = [
  { title: "Asc", key: "sortDirection", value: "asc" },
  { title: "Dsc", key: "sortDirection", value: "dsc" },
];

export const Base: Story = {
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenuTrigger asChild>
        <Button size={"xs"} variant={"default"}>
          Direction
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {sortDirection.map((query, index) => {
          return (
            <DropdownMenuItem
              key={index}
              className="font-sans-serif text-bright-yellow"
            >
              {query.title}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  args: {},
};
