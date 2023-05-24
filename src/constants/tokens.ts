const ChainType = {
    L1: {
        MAIN: 1,
        GOERLI: 5
    },
    L2: {
        MAIN: "0x534e5f4d41494e",
        GOERLI: "0x534e5f474f45524c49",
    }
}

export const tokens = {
    L1: {
        ETH: {
            name: 'Ether',
            symbol: 'ETH',
            decimals: 18,
            bridgeAddress: {
                [ChainType.L1.MAIN]: '0xae0Ee0A63A2cE6BaeEFFE56e7714FB4EFE48D419',
                [ChainType.L1.GOERLI]: '0xc3511006C04EF1d78af4C8E0e74Ec18A6E64Ff9e'
            }
        },
        LORDS: {
            name: 'Lords',
            symbol: 'LORDS',
            decimals: 18,
            bridgeAddress: {
                [ChainType.L1.MAIN]: '',
                [ChainType.L1.GOERLI]: '0x160e7631f22035149A01420cADD1012267551181'
            },
            tokenAddress: {
                [ChainType.L1.MAIN]: '0x686f2404e77ab0d9070a46cdfb0b7fecdd2318b0',
                [ChainType.L1.GOERLI]: '0xd44BB808bfE43095dBb94c83077766382D63952a'
            }
        }
    },
    L2: {
        ETH: {
            name: 'Ether',
            symbol: 'ETH',
            decimals: 18,
            bridgeAddress: {
                [ChainType.L2.MAIN]: '0x073314940630fd6dcda0d772d4c972c4e0a9946bef9dabf4ef84eda8ef542b82',
                [ChainType.L2.GOERLI]: '0x073314940630fd6dcda0d772d4c972c4e0a9946bef9dabf4ef84eda8ef542b82'
            },
            tokenAddress: {
                [ChainType.L2.MAIN]: '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
                [ChainType.L2.GOERLI]: '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7'
            }
        },
        LORDS: {
            name: 'Lords',
            symbol: 'LORDS',
            decimals: 18,
            bridgeAddress: {
                [ChainType.L2.MAIN]: '',
                [ChainType.L2.GOERLI]: ''
            },
            tokenAddress: {
                [ChainType.L2.MAIN]: '',
                [ChainType.L2.GOERLI]: ''
            }
        }
    }
};