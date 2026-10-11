import type { Meta, StoryObj } from "@storybook/react-vite";
import { Coins } from "lucide-react";

import { MetricCard } from "./metric-card";

const meta = {
  title: "UI/MetricCard",
  component: MetricCard,
  args: { label: "Staked veLORDS", value: "124,500", hint: "Unlocks in 182 days" },
  decorators: [
    (Story) => (
      <div className="max-w-xs">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MetricCard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithIcon: Story = { args: { icon: <Coins /> } };
export const Positive: Story = {
  args: { label: "APY", value: "+18.4%", hint: undefined, valueClassName: "text-trade-up" },
};
