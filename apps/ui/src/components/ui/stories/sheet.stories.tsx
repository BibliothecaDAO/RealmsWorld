import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../sheet";

const meta: Meta<typeof Sheet> = {
  title: "Components/Sheet",
  component: Sheet,
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Sheet>;

export const Base: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger>
        <Button className="self-center" size={"lg"} variant={"outline"}>
          Click Me
        </Button>
      </SheetTrigger>
      <SheetContent side={"right"}>
        <SheetTitle>This is a sheet title</SheetTitle>
        <SheetHeader>This is a sheet header</SheetHeader>
        <SheetDescription>This is a sheet description</SheetDescription>
        <SheetFooter>This is a sheet footer</SheetFooter>
      </SheetContent>
    </Sheet>
  ),
  args: {},
};

export const Left: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger>
        <Button className="self-center" size={"lg"} variant={"outline"}>
          Click Me
        </Button>
      </SheetTrigger>

      <SheetContent side={"left"}>
        <SheetTitle>This is a sheet title</SheetTitle>
        <SheetHeader>This is a sheet header</SheetHeader>
        <SheetDescription>This is a sheet description</SheetDescription>
        <SheetFooter>This is a sheet footer</SheetFooter>
      </SheetContent>
    </Sheet>
  ),
  args: {},
};
