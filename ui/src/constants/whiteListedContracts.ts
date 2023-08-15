export const realms = {
    MAIN: "0x7afe30cb3e53dba6801aa0ea647a0ecea7cbe18d",
    GOERLI: "0x3dc98f83a0f3ad77d44a68c6d15e08378de3df25",
    starknet: "0x7afe30cb3e53dba6801aa0ea647a0ecea7cbe18d",
}

export const loot = {
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
}

export const allWhiteListed = [
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

export const customContractNames: { [index: string]: string } = {
    "0x7afe30cb3e53dba6801aa0ea647a0ecea7cbe18d": "Realms",
    "0xff9c1b15b16263c61d017ee9f65c50e4ae0113d7": "Loot",
    "0x86f7692569914b5060ef39aab99e62ec96a6ed45": "Crypts",
    "0x527a4206ac04c2017295cf32f1fc2f9e034a7c40": "Banners"
}

export const reservoirLootCollectionSetId = '1afb3695e2ce4bfa976acca874c213c4f582434830a4c2791cd8b3def5edb2b9'