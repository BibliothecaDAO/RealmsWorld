# Realms.World - The portal to the Realms Autonomous World

## Overview

[Realms.World](https://realms.world) serves as the central hub for accessing the Realms Autonomous World. This platform offers a comprehensive marketplace dedicated to the Loot and Realms ecosystem on both Ethereum and Starknet.

[Realms.World](https://realms.world) encompasses essential ecosystem functionalities like bridging, staking, and NFT minting. Additionally, you'll find valuable insights about the various games within the World.

The tech stack

- Nextjs
- Drizzle
- Apibara
- TRPC
- Graphql
- Vercel

## Packages

The Realms.World platform consists of a few key packages:

- [Frontend Client](https://github.com/BibliothecaDAO/RealmsWorld/tree/main/apps/nextjs): The Next.js Frontend

- [Subgraph](https://github.com/BibliothecaDAO/RealmsWorld/tree/main/packages/subgraph): The L1 Starknet Messaging Indexer for Bridge Transactions
- [Starknet Indexer](https://github.com/BibliothecaDAO/RealmsWorld/tree/main/packages/apibara): The L2 indexer for Bridge and NFT Transactions + Metadata
- [TRPC](https://github.com/BibliothecaDAO/RealmsWorld/tree/main/packages/api): The TRPC router used by the frontend to communicate with the database
- [Graphql](https://github.com/BibliothecaDAO/RealmsWorld/tree/main/packages/graphql-server): A GraphQL endpoint for the L2 Indexed data (currently used by Loot Survivor)
- [Drizzle DB](https://github.com/BibliothecaDAO/RealmsWorld/tree/main/packages/db): The Drizzle ORM containing schema for the Postgres Database (currently set up for the Neon.tech serverless database - but could be adapted to a local or Planetscale without too much trouble)

## Contributing

We greatly value contributions from the community to enhance the Realms.World experience. To get involved, follow these steps:

1. Fork the repository.
2. Create a new branch for your changes.
3. Implement your changes and commit them to your branch.
4. Submit a pull request that includes a detailed description of your modifications.

Our team will review your contribution and offer feedback. Once approved, your changes will be merged into the main branch.

## License

Realms.World is an open-source project released under the MIT License. This license grants you the freedom to use, modify, and distribute the code, provided you retain the original copyright and permission notice in all copies or substantial portions of the software.
