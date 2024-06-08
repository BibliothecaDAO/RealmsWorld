import type { Meta, StoryObj } from "@storybook/react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../accordion";
import { Button } from "../button";
import { Input } from "../input";

const meta: Meta<typeof Accordion> = {
  title: "Components/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Accordion>;
export const AttributeDropdownFullWidthButtons: Story = {
  render: (args) => (
    <div className="bg-dark-green font-sans-serif text-bright-yellow">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="bg-primary px-2 py-2 text-sm">
            {"Status (2)"}
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-1">
              <div className=" p-1">
                <Button
                  key={1}
                  size={"sm"}
                  variant="outline"
                  className="font-body my-1 mr-1 w-full"
                >
                  Buy Now Only
                </Button>
                <Button
                  key={1}
                  size={"sm"}
                  variant="outline"
                  className="font-body my-1 mr-1 w-full"
                >
                  All
                </Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
  args: {},
};

export const AttributeDropdownWithInput: Story = {
  render: (args) => (
    <div className="bg-dark-green font-sans-serif text-bright-yellow">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="bg-primary px-2 py-2 text-sm">
            {"Cities ()"}
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-1">
              <div className=" p-1">
                <div className="flex space-x-2 px-2">
                  <Input
                    type="number"
                    id="number1"
                    value={0}
                    min={0}
                    max={10}
                    placeholder="Enter a number"
                    className="block w-full rounded-md border bg-dark-green p-2 focus:outline-none focus:ring-2 focus:ring-bright-yellow/70"
                  />
                  <Button variant={"default"}>clear</Button>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
  args: {},
};
