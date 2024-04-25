interface Wallet {
  id: string;
  realmsHeld: number;
  bridgedRealmsHeld: number;
  bridgedV2RealmsHeld: number;
}

interface QueryResponse {
  data: {
    wallets: Wallet[];
  };
}

const query = `query RealmNFTHolders($pageSize: Int, $skip: Int) {
    wallets(
      first: $pageSize
      skip: $skip
      where: {
        or: [
          { realmsHeld_gt: 0 },
          { bridgedRealmsHeld_gt: 0 },
          { bridgedV2RealmsHeld_gt: 0 }
        ]
      }
    ) {
      id
      realmsHeld
      bridgedRealmsHeld
      bridgedV2RealmsHeld
    }
  }
`;

export const getRealmNFTHolders = async (): Promise<Wallet[]> => {
  const pageSize: number = 1000;
  let allData: Wallet[] = [];
  let skip: number = 0;

  try {
    while (true) {
      const response = await fetch(
        "https://api.thegraph.com/subgraphs/name/" +
          process.env.NEXT_PUBLIC_REALMS_SUBGRAPH_NAME,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            query,
            variables: {
              pageSize,
              skip,
            },
          }),
        },
      );

      const responseData: QueryResponse = await response.json();
      
      if (!responseData.data.wallets || responseData.data.wallets.length === 0) {
        break;
      }

      allData = allData.concat(responseData.data.wallets);
      skip = skip + pageSize;
    }
    return allData;

  } catch (error) {
    console.error('Error al recuperar los datos:', error);
    throw error;
  }
};
