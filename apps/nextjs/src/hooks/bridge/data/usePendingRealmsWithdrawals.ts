import type { RealmsWithdrawal } from "@/types/subgraph";
import { env } from "@/env";
import { useQuery } from "@tanstack/react-query";

const query = `query Withdrawals(
    $l1Address: String
  ) {
    withdrawals(
      where: {
        l1Recipient: $l1Address
      }
      orderBy: createdTimestamp
      orderDirection: desc
    ) {
      id
      req_hash
      l2Sender
      l1Recipient
      createdTimestamp
      withdrawalEvents {
        id
        status
        l1Recipient
        tokenIds
        createdTxHash
        finishedTxHash
        finishedAtDate
      }
    }
  }
  `;

export const usePendingRealmsWithdrawals = ({
  address,
}: {
  address?: string;
}) => {
  return useQuery({
    queryKey: ["pendingRealmsWithdrawals" + address],
    queryFn: async () =>
      await fetch(env.NEXT_PUBLIC_REALMS_BRIDGE_SUBGRAPH_NAME, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables: { l1Address: address?.toLowerCase() },
        }),
      })
        .then((res) => res.json())
        .then((res: { data?: { withdrawals: RealmsWithdrawal[] } }) => {
          console.log(res);
          return res.data?.withdrawals;
        }),
    enabled: !!address,
  });
};
