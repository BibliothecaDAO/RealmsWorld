import { ChainType } from "./tokens";

type ContractAddresses = {
  [chainType in keyof typeof ChainType]: Record<string, string>;
};

interface Token {
  name: string;
  contractAddresses: ContractAddresses;
}

export interface ERC721Tokens {
  realms: Token;
  beasts: Token;
  goldenToken: Token;
}
export const erc721Tokens: ERC721Tokens = {
  realms: {
    name: "Realms (for Adventurers)",
    contractAddresses: {
      L1: {
        [ChainType.L1.MAIN]: "0x7afe30cb3e53dba6801aa0ea647a0ecea7cbe18d",
        [ChainType.L1.GOERLI]: "0x3dc98f83a0f3ad77d44a68c6d15e08378de3df25",
      },
      L2: {},
    },
  },
  beasts: {
    name: "Beasts",
    contractAddresses: {
      L1: {},
      L2: {
        [ChainType.L2.MAIN]:
          "0x052d6edb54b24942d359b2b9d476d92b288b3a518322aa006f8eddd566df3de1",
        [ChainType.L2.GOERLI]:
          "0x028fb9113f1410566c6dff3cadef5bb08d93f825f5162617481afb49534b4b75",
      },
    },
  },
  goldenToken: {
    name: "LS Golden Token",
    contractAddresses: {
      L1: {},
      L2: {
        [ChainType.L2.MAIN]: "",
        [ChainType.L2.GOERLI]:
          "0x01702a257408fbdc70c7f8d21aa505bd4b140169cfbf60c9324d695dcc3734ac",
      },
    },
  },
};
/*export const loot = {
    mainnet: "0xff9c1b15b16263c61d017ee9f65c50e4ae0113d7",
    testnet: "0xff9c1b15b16263c61d017ee9f65c50e4ae0113d7",
    starknet: "0xff9c1b15b16263c61d017ee9f65c50e4ae0113d7",
}

export const gas = {
    mainnet: "0x8db687aceb92c66f013e1d614137238cc698fedb",
    testnet: "0x8db687aceb92c66f013e1d614137238cc698fedb",
    starknet: "0x8db687aceb92c66f013e1d614137238cc698fedb",
}

export const crypts = {
    mainnet: "0x86f7692569914b5060ef39aab99e62ec96a6ed45",
    testnet: "0x86f7692569914b5060ef39aab99e62ec96a6ed45",
    starknet: "0x86f7692569914b5060ef39aab99e62ec96a6ed45",
}


export const banners = {
    mainnet: "0x527a4206ac04c2017295cf32f1fc2f9e034a7c40",
    testnet: "0x527a4206ac04c2017295cf32f1fc2f9e034a7c40",
    starknet: "0x527a4206ac04c2017295cf32f1fc2f9e034a7c40",
}*/

/*export const allWhiteListed = [
    {
        contract: realms[ChainType.L1.MAIN],
    },
    {
        contract: realms.MAIN,
    },
    // {
    //     contract: loot.mainnet,
    // },
    // {
    //     contract: gas.mainnet,
    // },
    // {
    //     contract: crypts.mainnet,
    // },
    // {
    //     contract: banners.mainnet,
    // },
]
*/
export const customContractNames: Record<string, string> = {
  "0x7afe30cb3e53dba6801aa0ea647a0ecea7cbe18d": "Realms",
  "0xff9c1b15b16263c61d017ee9f65c50e4ae0113d7": "Loot",
  "0x86f7692569914b5060ef39aab99e62ec96a6ed45": "Crypts",
  "0x527a4206ac04c2017295cf32f1fc2f9e034a7c40": "Banners",
};

export const reservoirLootCollectionSetId =
  "1afb3695e2ce4bfa976acca874c213c4f582434830a4c2791cd8b3def5edb2b9";
