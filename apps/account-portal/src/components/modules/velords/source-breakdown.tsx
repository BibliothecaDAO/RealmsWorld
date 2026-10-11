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
import { getVelordsSourceLabel } from "@/lib/velords-sources";
import { formatNumber, shortenAddress } from "@/utils/utils";
import { formatUnits } from "viem";

export interface SourceBreakdownItem {
  sender: string;
  totalWei: string;
  txCount: number;
  sharePercent: string;
}

export function VelordsSourceBreakdown({
  data,
  isLoading,
}: {
  data: SourceBreakdownItem[];
  isLoading?: boolean;
}) {
  return (
    <SectionCard
      title="Reward sources"
      description="Where this period's LORDS rewards came from."
    >
      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 4 }, (_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      ) : data.length === 0 ? (
        <p className="text-muted-foreground py-6 text-center text-sm">
          No rewards source data for this period.
        </p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Source</TableHead>
              <TableHead className="text-right">LORDS</TableHead>
              <TableHead className="text-right">Share</TableHead>
              <TableHead className="text-right">Txs</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.sender}>
                <TableCell>
                  <div className="font-medium">
                    {getVelordsSourceLabel(item.sender)}
                  </div>
                  <div className="text-muted-foreground font-mono text-xs">
                    {shortenAddress(item.sender)}
                  </div>
                </TableCell>
                <TableCell className="realm-stat text-right">
                  {formatNumber(Number(formatUnits(BigInt(item.totalWei), 18)))}
                </TableCell>
                <TableCell className="realm-stat text-right">
                  {item.sharePercent}%
                </TableCell>
                <TableCell className="realm-stat text-right">
                  {item.txCount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </SectionCard>
  );
}
