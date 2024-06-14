import type { Meta, StoryObj } from "@storybook/react";
import type { ColumnDef, SortingState } from "@tanstack/react-table";
import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../table";

const meta: Meta<typeof Table> = {
  title: "ui/Table",
  component: Table,
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Table>;

export const Base: Story = {
  render: (args) => (
    <Table>
      <TableHeader>
        {
          <TableRow>
            <TableHead>Header</TableHead>
            <TableHead>Header1</TableHead>
          </TableRow>
        }
      </TableHeader>

      <TableBody>
        <TableRow>
          <TableCell>Cell</TableCell>
          <TableCell>Cell</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Cell</TableCell>
          <TableCell>Cell</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Cell</TableCell>
          <TableCell>Cell</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Cell</TableCell>
          <TableCell>Cell</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Cell</TableCell>
          <TableCell>Cell</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Cell</TableCell>
          <TableCell>Cell</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  args: {},
};
