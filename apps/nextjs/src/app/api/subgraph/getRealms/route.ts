import { NextResponse } from "next/server";
import { env } from "env";

export const runtime = "edge";
const query = `query UsersRealms(
  $address: String!
  $addressId: ID!
  # $resources: [Int]
  # $orders: [String]
  $first: Int
  $skip: Int # $orderBy: String # $orderDirection: String
) {
  realms(
    first: $first
    skip: $skip
    where: { currentOwner_contains: $address }
  ) {
    id
    name
    order
  }
  bridgedRealms: realms(
    first: $first
    skip: $skip
    where: { bridgedOwner: $address }
  ) {
    id
    name
  }
  bridgedV2Realms: realms(
    first: $first
    skip: $skip
    where: { bridgedV2Owner: $address }
  ) {
    id
    name
  }
  wallet(id: $addressId) {
    realmsHeld
    bridgedRealmsHeld
    bridgedV2RealmsHeld
  }
}
`;
export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);

  const address = searchParams.get("address")?.toLowerCase();
  const addressId = searchParams.get("address")?.toLowerCase();
  const first = searchParams.get("first");
  const skip = searchParams.get("skip");

  const res = await fetch(env.NEXT_PUBLIC_REALMS_SUBGRAPH_NAME, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { address, addressId, first, skip },
    }),
  });

  return NextResponse.json(await res.json());
}
