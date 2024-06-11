"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { ReactNode } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@realms-world/ui";

interface Claim {
  start_date: string;
  realms: number;
  lords_rewards: bigint;
  claim: string | null;
}

export const columns: ColumnDef<Claim>[] = [
  {
    accessorKey: "start_date",
    header: () => <span className="font-sans">Starting</span>,
  },
  {
    accessorKey: "realms",
    header: () => <span className="font-sans">Realms Staked</span>,
  },
  {
    accessorKey: "lords_rewards",
    header: () => <span className="font-sans">Lords Rewards</span>,
  },
  {
    accessorKey: "claim",
    header: () => <span className="font-sans">Claim</span>,
    cell: (cell) => {
      if (!cell.getValue()) {
        return <Button size={"xs"}>Claim</Button>;
      } else {
        return <span>Claimed: {cell.getValue() as ReactNode}</span>;
      }
    },
  },
];
interface DataTableProps<TData> {
  data: TData[];
  //columns: ColumnDef<TData, TValue>[];
}

export function ClaimsTable({ data }: DataTableProps<Claim>) {
  const table = useReactTable<Claim>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    //getRowId: (row) => row.start_date,
  });
  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
