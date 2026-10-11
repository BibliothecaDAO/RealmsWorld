import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

const meta = {
  title: "UI/Select",
  component: Select,
} satisfies Meta<typeof Select>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Select defaultValue="12">
      <SelectTrigger className="w-48" aria-label="Lock duration">
        <SelectValue placeholder="Lock duration" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">1 month</SelectItem>
        <SelectItem value="6">6 months</SelectItem>
        <SelectItem value="12">1 year</SelectItem>
        <SelectItem value="48">4 years</SelectItem>
      </SelectContent>
    </Select>
  ),
};
