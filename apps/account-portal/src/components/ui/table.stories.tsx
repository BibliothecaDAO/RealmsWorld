import type { Meta, StoryObj } from "@storybook/react-vite";

import { Badge } from "./badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

const rows = [
  { tx: "0x04a1…9c2e", amount: "12,500", status: "Completed" },
  { tx: "0x07f3…11ab", amount: "3,200", status: "Pending" },
  { tx: "0x01bb…e0d4", amount: "860", status: "Completed" },
];

const meta = {
  title: "UI/Table",
  component: Table,
} satisfies Meta<typeof Table>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Transaction</TableHead>
          <TableHead className="text-right">LORDS</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.tx}>
            <TableCell className="font-mono">{row.tx}</TableCell>
            <TableCell className="realm-stat text-right">{row.amount}</TableCell>
            <TableCell>
              <Badge variant={row.status === "Pending" ? "outline" : "secondary"}>
                {row.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};
