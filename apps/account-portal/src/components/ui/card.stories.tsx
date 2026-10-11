import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "./button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { SectionCard } from "./section-card";

const meta = {
  title: "UI/Card",
  component: Card,
  parameters: { layout: "padded" },
} satisfies Meta<typeof Card>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="max-w-md">
      <CardHeader>
        <div className="space-y-1">
          <CardTitle>Staking</CardTitle>
          <CardDescription>Lock LORDS to earn veLORDS rewards.</CardDescription>
        </div>
        <CardAction>
          <Button size="sm" variant="outline">
            Manage
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="text-sm">
        Your lock expires in 182 days.
      </CardContent>
      <CardFooter>
        <Button className="w-full">Stake LORDS</Button>
      </CardFooter>
    </Card>
  ),
};

export const Section: Story = {
  name: "SectionCard",
  render: () => (
    <SectionCard
      className="max-w-xl"
      title="Recent proposals"
      description="Latest Realms DAO proposals."
      action={
        <Button size="sm" variant="outline">
          View all
        </Button>
      }
    >
      <p className="text-muted-foreground text-sm">Section body content.</p>
    </SectionCard>
  ),
};
