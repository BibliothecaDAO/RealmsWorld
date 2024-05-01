import { NextResponse } from "next/server";

export const runtime = "edge";
const query = `
query (
  $first: Int!
  $skip: Int!
  $orderBy: Delegate_orderBy
  $orderDirection: OrderDirection
  $address: ID!
) {
  tokenHolders(
    first: $first
    skip: $skip
    orderBy: $orderBy
    orderDirection: $orderDirection
    where: { id: $address }
  ) {
    id
    tokenBalance
    delegate {
      id
    }
  }
}
`;

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);

  const address = searchParams.get("address")?.toLowerCase();
  const first = searchParams.get("first") ?? 5;
  const skip = searchParams.get("skip") ?? 0;

  const res = await fetch(
    `https://api.studio.thegraph.com/query/${process.env.NEXT_PUBLIC_DELEGATES_SUBGRAPH_NAME}/version/latest`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { address, first, skip },
      }),
    },
  );

  return NextResponse.json(await res.json());
}
