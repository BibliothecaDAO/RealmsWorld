/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from "@/env";

const query = `query Deposits(
  $depositsWhere: Deposit_filter
  $withdrawalsWhere: Withdrawal_filter
) {
  deposits(
    where: $depositsWhere
    orderBy: createdTimestamp
    orderDirection: desc
  ) {
    id
    l1Sender
    l2Recipient
    createdTimestamp
    depositEvents {
      id
      status
      amount
      createdTxHash
      finishedTxHash
      finishedAtDate
      payload
      nonce
    }
  }
  withdrawals(
    where: $withdrawalsWhere
    orderBy: createdTimestamp
    orderDirection: desc
  ) {
    id
    l2Sender
    l1Recipient
    createdTimestamp
    withdrawalEvents {
      id
      status
      l1Recipient
      amount
      createdTxHash
      finishedTxHash
      finishedAtDate
    }
  }
}
  `;

export const getBridgeWithdrawals = async ({
  depositsWhere,
  withdrawalsWhere /*first,
  skip,*/,
}: {
  depositsWhere: any;
  withdrawalsWhere: any;
  /*first: number;
  skip: number;*/
}) => {
  try {
    const res = await fetch(env.NEXT_PUBLIC_SUBGRAPH_NAME, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        query,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        variables: { depositsWhere, withdrawalsWhere },
      }),
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = await res.json();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return data;
  } catch (error) {
    return error;
  }
};
