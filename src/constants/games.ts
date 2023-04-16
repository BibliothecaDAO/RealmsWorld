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
        description: 'The first game within the Realms Autonomous World.',
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
    }
]