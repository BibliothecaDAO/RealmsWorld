import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Tabs>;

export const Base: Story = {
  render: () => (
    <div className="bg-dark-green">
      <Tabs defaultValue={"click_me"} className="relative h-full min-h-0">
        <TabsList className="my-0 w-full justify-center py-2">
          <TabsTrigger value={"click_me"} key={1}>
            <Button variant="default">Click Me</Button>
          </TabsTrigger>
          <TabsTrigger value={"click_me_too"} key={2}>
            <Button variant="default">Click Me Too</Button>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={"click_me"} key={1} className="h-full">
          <div className="p-[40px] font-sans-serif text-bright-yellow">
            <p>Insert Content for the first tab here.</p>
          </div>
        </TabsContent>

        <TabsContent value={"click_me_too"} key={2} className="h-full">
          <div className="p-[40px] font-sans-serif text-bright-yellow">
            <p>Insert Content for the second tab here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  ),
  args: {},
};
