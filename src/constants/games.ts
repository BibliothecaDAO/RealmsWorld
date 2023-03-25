import { realms } from "./whiteListedContracts";

export const games = [
    {
        name: 'Realms: Eternum',
        id: 'realms-adventurers',
        icon: 'lol.png',
        image: '/backgrounds/warRoom.png',
        color: '#f5f5f5',
        status: 'alpha',
        chains: ['Starknet'],
        description: 'An eternal on-chain game running on Starknet',
        links: {
            website: 'https://eternum-alpha.bibliothecadao.xyz/',
            discord: 'https://discord.gg/uQnjZhZPfu',
            twitter: 'https://twitter.com/LootRealms',
            whitepaper: 'https://scroll.bibliothecadao.xyz/',
        },
        compatibleTokens: [
            {
                name: 'Realms',
                contract: realms.mainnet,
                icon: 'realms.png',
                image: '/backgrounds/warRoom.png',
            }
        ],
        screenshots: [
            {
                src: '/screenshots/eternum-1.png',
                alt: 'Realms: Eternum',
            },
            {
                src: '/screenshots/eternum-2.png',
                alt: 'Realms: Eternum',
            }

        ]
    }
]