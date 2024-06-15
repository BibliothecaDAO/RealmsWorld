import { useWaitForTransaction } from "@starknet-react/core";

import { Badge } from "@realms-world/ui";

export function TransactionStatusL2({ hash }: { hash: string }) {
  const { data, error, isLoading, isError } = useWaitForTransaction({
    hash,
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
