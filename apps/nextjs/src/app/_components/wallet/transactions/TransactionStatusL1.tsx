import { useWaitForTransactionReceipt } from "wagmi";

import { Badge } from "@realms-world/ui";

export function TransactionStatusL1({ hash }: { hash: string }) {
  const { data, isLoading } = useWaitForTransactionReceipt({
    hash: hash as `0x${string}`,
  });

  return (
    <Badge
      variant="outline"
      className="font-muted-foreground !border-emerald-500 text-xs uppercase"
    >
      {isLoading ? "Loading..." : data?.status}
    </Badge>
  );
}
