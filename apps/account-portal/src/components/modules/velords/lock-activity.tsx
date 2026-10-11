import { SectionCard } from "@/components/ui/section-card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface WeeklyLockActivityRow {
  week: string;
  updates: number;
  uniqueWallets: number;
}

export function VelordsLockActivity({
  data,
  isLoading,
}: {
  data: WeeklyLockActivityRow[];
  isLoading?: boolean;
}) {
  return (
    <SectionCard
      title="Lock activity"
      description="Weekly lock updates and unique wallets."
    >
      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 4 }, (_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      ) : data.length === 0 ? (
        <p className="text-muted-foreground py-6 text-center text-sm">
          No lock activity for this period.
        </p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Week</TableHead>
              <TableHead className="text-right">Updates</TableHead>
              <TableHead className="text-right">Wallets</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.week}>
                <TableCell className="realm-stat whitespace-nowrap">
                  {row.week}
                </TableCell>
                <TableCell className="realm-stat text-right">
                  {row.updates}
                </TableCell>
                <TableCell className="realm-stat text-right">
                  {row.uniqueWallets}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </SectionCard>
  );
}
