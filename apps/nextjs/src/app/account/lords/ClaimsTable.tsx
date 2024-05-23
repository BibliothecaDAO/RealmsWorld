"use client";

import { Realm } from "@/types";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@realms-world/ui";

type Claim = {
  start_date: string;
  realms: number;
  lords_rewards: bigint;
  claim: string | null;
};

export const columns: ColumnDef<Claim>[] = [
  {
    accessorKey: "start_date",
    header: ({ column }) => <span className="font-sans">Starting</span>,
  },
  {
    accessorKey: "realms",
    header: ({ column }) => <span className="font-sans">Realms Staked</span>,
  },
  {
    accessorKey: "lords_rewards",
    header: ({ column }) => <span className="font-sans">Lords Rewards</span>,
  },
  {
    accessorKey: "claim",
    header: ({ column }) => <span className="font-sans">Claim</span>,
    cell: (cell) => {
      console.log(cell.getValue());
      if (!cell.getValue()) {
        return <Button size={"xs"}>Claim</Button>;
      } else {
        return <span>Claimed: {cell.getValue()}</span>;
      }
    },
  },
];
interface DataTableProps<TData, TValue> {
  data: Claim[];
}

export function ClaimsTable<TData, TValue>({
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id,
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows?.map((row) => (
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
