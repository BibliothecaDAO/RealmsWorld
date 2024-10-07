import { env } from "env";

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

export const getRealms = async ({
  address,
  addressId,
  first,
  skip,
}: {
  address: string;
  addressId: string;
  first: number;
  skip: number;
}) => {
  try {
    const res = await fetch(env.NEXT_PUBLIC_SUBGRAPH_NAME, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { address, addressId, first, skip },
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
