import { useTransactionReceipt } from "@starknet-react/core";

import { Badge } from "@realms-world/ui";

export function TransactionStatusL2({ hash }: { hash: string }) {
  const { data, error, isLoading, isError } = useTransactionReceipt({
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
          // @ts-expect-error TODO: check types with apibara
          : data?.status === "REJECTED"
            // @ts-expect-error TODO: check types with apibara
            ? `${data.status}`
            // @ts-expect-error TODO: check types with apibara
            : `${data?.execution_status}`}
    </Badge>
  );
}
