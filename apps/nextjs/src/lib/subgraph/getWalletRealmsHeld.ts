const query = `query WalletsRealms(
  $addresses: [Bytes!]
) {
  wallets(where: { address_in: $addresses }) {
    realmsHeld
    bridgedRealmsHeld
    bridgedV2RealmsHeld
  }
}

  `;

export const getWalletRealmsHeld = async ({
  addresses,
}: {
  addresses: string[];
}) => {
  try {
    const res = await fetch(
      "https://api.thegraph.com/subgraphs/name/" +
        process.env.NEXT_PUBLIC_REALMS_SUBGRAPH_NAME,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables: { addresses },
        }),
      },
    );

    const data = await res.json();
    return data.data;
  } catch (error) {
    return error;
  }
};
