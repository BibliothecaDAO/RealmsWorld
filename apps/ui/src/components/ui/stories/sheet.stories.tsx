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

      <SheetContent className="bg-dark-green" side={"right"}>
        <SheetTitle>
          <h2>This is a dialog title</h2>
        </SheetTitle>
        <SheetHeader>
          <p>This is a dialog header</p>
        </SheetHeader>
        <SheetDescription>
          <p>This is a dialog description</p>
        </SheetDescription>
        <SheetFooter>
          <p>This is a dialog footer</p>
        </SheetFooter>
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

      <SheetContent className="bg-dark-green" side={"left"}>
        <SheetTitle>
          <h2>This is a dialog title</h2>
        </SheetTitle>
        <SheetHeader>
          <p>This is a dialog header</p>
        </SheetHeader>
        <SheetDescription>
          <p>This is a dialog description</p>
        </SheetDescription>
        <SheetFooter>
          <p>This is a dialog footer</p>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
  args: {},
};

export const Top: Story = {
  render: (args) => (
    <Sheet>
      <SheetTrigger>
        <Button className="self-center" size={"lg"} variant={"outline"}>
          Click Me
        </Button>
      </SheetTrigger>

      <SheetContent className="bg-dark-green" side={"top"}>
        <SheetTitle>
          <h2>This is a dialog title</h2>
        </SheetTitle>
        <SheetHeader>
          <p>This is a dialog header</p>
        </SheetHeader>
        <SheetDescription>
          <p>This is a dialog description</p>
        </SheetDescription>
        <SheetFooter>
          <p>This is a dialog footer</p>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
  args: {},
};

export const Bottom: Story = {
  render: (args) => (
    <Sheet>
      <SheetTrigger>
        <Button className="self-center" size={"lg"} variant={"outline"}>
          Click Me
        </Button>
      </SheetTrigger>

      <SheetContent className="bg-dark-green" side={"bottom"}>
        <SheetTitle>
          <h2>This is a dialog title</h2>
        </SheetTitle>
        <SheetHeader>
          <p>This is a dialog header</p>
        </SheetHeader>
        <SheetDescription>
          <p>This is a dialog description</p>
        </SheetDescription>
        <SheetFooter>
          <p>This is a dialog footer</p>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
  args: {},
};
