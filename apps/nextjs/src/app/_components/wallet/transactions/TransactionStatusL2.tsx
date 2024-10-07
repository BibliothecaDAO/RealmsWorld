import { useTransactionReceipt } from "@starknet-react/core";

import { Badge } from "@realms-world/ui/components/ui/badge";
import { padAddress } from "@realms-world/utils";

export function TransactionStatusL2({ hash }: { hash: string }) {
  const { data, error, isLoading, isError } = useTransactionReceipt({
    hash: padAddress(hash),
    watch: true,
    retry: true,
  });

  return (
    <Badge
      variant="outline"
      className="font-muted-foreground !border-emerald-500 text-xs"
    >
      {isLoading
        ? "Loading..."
        : isError
          ? error?.message
          : data?.status === "REJECTED"
            ? `${data.status}`
            : `${data?.execution_status}`}
    </Badge>
  );
}
