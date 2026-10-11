import type { Meta, StoryObj } from "@storybook/react-vite";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

const meta = {
  title: "UI/Tabs",
  component: Tabs,
} satisfies Meta<typeof Tabs>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="stake" className="max-w-md">
      <TabsList>
        <TabsTrigger value="stake">Stake</TabsTrigger>
        <TabsTrigger value="rewards">Rewards</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
      </TabsList>
      <TabsContent value="stake" className="text-sm">
        Lock LORDS for up to four years.
      </TabsContent>
      <TabsContent value="rewards" className="text-sm">
        Claim weekly rewards.
      </TabsContent>
      <TabsContent value="activity" className="text-sm">
        Recent lock activity.
      </TabsContent>
    </Tabs>
  ),
};

export const Line: Story = {
  render: () => (
    <Tabs defaultValue="all">
      <TabsList variant="line">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="closed">Closed</TabsTrigger>
      </TabsList>
      <TabsContent value="all" className="text-sm">All proposals</TabsContent>
      <TabsContent value="active" className="text-sm">Active proposals</TabsContent>
      <TabsContent value="closed" className="text-sm">Closed proposals</TabsContent>
    </Tabs>
  ),
};
