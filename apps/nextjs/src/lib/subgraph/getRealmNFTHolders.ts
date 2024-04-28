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
  const pageSize = 1000;
  let allData: Wallet[] = [];
  let skip = 0;

  try {
    let continueFetching = true;
    
    do {
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

      const responseData: QueryResponse = await response.json() as QueryResponse;
      
      if (!responseData.data.wallets || responseData.data.wallets.length === 0) {
        continueFetching = false;
      }

      allData = allData.concat(responseData.data.wallets);
      skip = skip + pageSize;
    } while (continueFetching);
    return allData;

  } catch (error) {
    console.error('Error catching the data:', error);
    throw error;
  }
};
