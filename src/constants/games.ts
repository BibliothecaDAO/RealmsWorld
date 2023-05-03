import { realms } from "./whiteListedContracts";

export const games = [
    {
        name: 'Realms: Eternum',
        id: 'realms-adventurers',
        icon: 'lol.png',
        image: '/backgrounds/eternum.png',
        color: '#f5f5f5',
        status: 'alpha',
        chains: ['Starknet'],
        description: 'Conquer the Realms',
        longform: "Eternum is a strategy game that is built on StarkNet. It is a game of management and conquest, where players must build and defend their Realm to thrive. The game is governed by a set of rules that are enforced by the game's smart contracts.",
        links: {
            website: 'https://realmseternum.com/',
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
        ],
        homepage: '/homepages/realms-adventurers'
    },
    {
        name: 'Survivors',
        id: 'survivors',
        icon: 'lol.png',
        image: '/screenshots/survivors-1.png',
        color: '#f5f5f5',
        status: 'alpha',
        chains: ['Starknet'],
        description: 'Play to Die',
        longform: "Survivors is the first game that uses the Play to Die mechanic. It is a game of onchain survival where you fight to stay alive. The game is governed by a set of rules that are enforced by the game's smart contracts. The game will run forever",
        links: {
            website: 'https://realmseternum.com/',
            discord: 'https://discord.gg/uQnjZhZPfu',
            twitter: 'https://twitter.com/LootRealms',
            whitepaper: 'https://scroll.bibliothecadao.xyz/',
        },
        compatibleTokens: [],
        screenshots: [
            {
                src: '/screenshots/survivors-1.png',
                alt: 'Survivors',
            },
            {
                src: '/screenshots/survivors-2.png',
                alt: 'Survivors',
            },
            {
                src: '/screenshots/survivors-3.png',
                alt: 'Survivors',
            }
        ],
        homepage: '/homepages/realms-adventurers'
    }
]