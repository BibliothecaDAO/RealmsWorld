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
  render: (args) => (
    <Sheet>
      <SheetTrigger>
        <Button className="self-center" size={"lg"} variant={"outline"}>
          Click Me
        </Button>
      </SheetTrigger>
      <SheetContent side={"right"}>
        <SheetTitle>This is a dialog title</SheetTitle>
        <SheetHeader>This is a dialog header</SheetHeader>
        <SheetDescription>This is a dialog description</SheetDescription>
        <SheetFooter>This is a dialog footer</SheetFooter>
      </SheetContent>
    </Sheet>
  ),
  args: {},
};

export const Left: Story = {
  render: (args) => (
    <Sheet>
      <SheetTrigger>
        <Button className="self-center" size={"lg"} variant={"outline"}>
          Click Me
        </Button>
      </SheetTrigger>

      <SheetContent side={"left"}>
        <SheetTitle>This is a dialog title</SheetTitle>
        <SheetHeader>This is a dialog header</SheetHeader>
        <SheetDescription>This is a dialog description</SheetDescription>
        <SheetFooter>his is a dialog footer</SheetFooter>
      </SheetContent>
    </Sheet>
  ),
  args: {},
};
