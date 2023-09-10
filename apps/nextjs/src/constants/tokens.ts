export const ChainType = {
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
            tokenAddress: {
                [ChainType.L1.MAIN]: '',
                [ChainType.L1.GOERLI]: ''
            },
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
                [ChainType.L1.MAIN]: '0x023A2aAc5d0fa69E3243994672822BA43E34E5C9',
                [ChainType.L1.GOERLI]: '0x6406465603487eE0Ad7A813b2bB6B0DFfB8f6aa7'
            },
            tokenAddress: {
                [ChainType.L1.MAIN]: '0x686f2404e77ab0d9070a46cdfb0b7fecdd2318b0',
                [ChainType.L1.GOERLI]: '0x7543919933eef56f754daf6835fa97f6dfd785d8'
            }
        },
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
                [ChainType.L2.MAIN]: '0x7c76a71952ce3acd1f953fd2a3fda8564408b821ff367041c89f44526076633',
                [ChainType.L2.GOERLI]: '0x042331a29c53f6084f08964cbd83b94c1a141e6d14009052d55b03793b21d5b3'
            },
            tokenAddress: {
                [ChainType.L2.MAIN]: '0x124aeb495b947201f5fac96fd1138e326ad86195b98df6dec9009158a533b49',
                [ChainType.L2.GOERLI]: '0x0488c4091e5c57309f4acdce4f746898a82f50351d8c85278ad2e877c8c032bd'
            }
        }
    }
};
