import type { Meta, StoryObj } from "@storybook/react";
import { cva } from "class-variance-authority";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@realms-world/utils";

import { Button } from "../button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  sheetVariants,
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
      <SheetTrigger asChild>
        <Button className="self-center" size={"lg"} variant={"outline"}>
          Click Me
        </Button>
      </SheetTrigger>

      <SheetContent className="bg-white" position={"right"} size={"lg"}>
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

export const LeftSmall: Story = {
  render: (args) => (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="self-center" size={"lg"} variant={"outline"}>
          Click Me
        </Button>
      </SheetTrigger>

      <SheetContent className="bg-white" position={"left"} size={"sm"}>
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

export const TopLarge: Story = {
  render: (args) => (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="self-center" size={"lg"} variant={"outline"}>
          Click Me
        </Button>
      </SheetTrigger>

      <SheetContent className="bg-white" position={"top"} size={"lg"}>
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

export const BottomXLarge: Story = {
  render: (args) => (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="self-center" size={"lg"} variant={"outline"}>
          Click Me
        </Button>
      </SheetTrigger>

      <SheetContent className="bg-white" position={"bottom"} size={"xl"}>
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

export const RightFull: Story = {
  render: (args) => (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="self-center" size={"lg"} variant={"outline"}>
          Click Me
        </Button>
      </SheetTrigger>

      <SheetContent className="bg-white" position={"right"} size={"full"}>
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
