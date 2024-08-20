"use client";

import type { ColumnDef } from "@tanstack/react-table";
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
  timestamp?: Date | null;
  //realms: number;
  amount: bigint | string;
}

export const columns: ColumnDef<Claim>[] = [
  {
    accessorKey: "timestamp",
    id: "timestamp",
    header: () => <span className="font-sans">Claimed On</span>,
    cell: (cell) => {
      return <span>{cell.getValue()?.toLocaleString()}</span>;
    },
  },
  /*{
    accessorKey: "realms",
    header: () => <span className="font-sans">Realms Staked</span>,
  },*/
  {
    accessorKey: "amount",
    id: "amount",
    header: () => <span className="font-sans">Lords Rewards</span>,
    cell: (cell) => {
      return <span>{Number(cell.getValue() as bigint).toLocaleString()}</span>;
    },
  },
  {
    accessorKey: "timestamp",
    id: "claim",
    header: () => <span className="font-sans">Claim</span>,
    cell: (cell) => {
      if (!cell.getValue()) {
        return <Button size={"xs"}>Claim</Button>;
      } else {
        return <span>Claimed</span>;
      }
    },
  },
];
interface DataTableProps<TData> {
  data?: TData[];
  //columns: ColumnDef<TData, TValue>[];
}

export function ClaimsTable({ data }: DataTableProps<Claim>) {
  const table = useReactTable<Claim>({
    data: data ?? [],
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
