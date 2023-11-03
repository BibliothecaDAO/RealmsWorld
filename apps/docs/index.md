---
title: Home
layout: home
nav_order: 1
---

<a href="https://twitter.com/lootrealms">
<img src="https://img.shields.io/twitter/follow/lootrealms?style=social"/>
</a>
<a href="https://twitter.com/BibliothecaDAO">
<img src="https://img.shields.io/twitter/follow/BibliothecaDAO?style=social"/>
</a>

[![discord](https://img.shields.io/badge/join-bibliothecadao-black?logo=discord&logoColor=white)](https://discord.gg/realmsworld){:target="\_blank" rel="noopener"}
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT){:target="\_blank" rel="noopener"}

![background](/assets/images/bg.png)

# Realms.World

## The portal to the Realms Autonomous World

## Overview

[Realms.World](https://realms.world){:target="\_blank" rel="noopener"} serves as the central hub for accessing the Realms Autonomous World. This platform offers a comprehensive marketplace dedicated to the Loot and Realms ecosystem on both Ethereum and Starknet. It encompasses essential ecosystem functionalities like bridging, staking, and NFT minting. Additionally, you'll find valuable insights about the various games within the World. Built on Next.js 13, Realms.World leverages server and client components for optimal performance and scalability.

## Packages

The Realms.World platform consists of a few key packages:

- [`apps/nextjs`](/frontend): The Next.js Frontend

- [`packages/subgraph`](/subgraph): The L1 Starknet Messaging Indexer for Bridge Transactions
- [`packages/apibara`](/starknet-indexer): The L2 indexer for Bridge and NFT Transactions + Metadata
- [`packages/api`](/trpc): The TRPC router used by the frontend to communicate with the database
- [`packages/graphql-server`](/graphql-endpoint): A GraphQL endpoint for the L2 Indexed data (currently used by Loot Survivor)
- [`packages/db`](/drizzle-db): The Drizzle ORM containing schema for the Postgres Database (currently set up for the Neon.tech serverless database - but could be adapted to a local or Planetscale without too much trouble)

## Contributing

We greatly value contributions from the community to enhance the Realms.World experience. To get involved, follow these steps:

1. Fork the repository.
2. Create a new branch for your changes.
3. Implement your changes and commit them to your branch.
4. Submit a pull request that includes a detailed description of your modifications.

Our team will review your contribution and offer feedback. Once approved, your changes will be merged into the main branch.

## License

Realms.World is an open-source project released under the MIT License. This license grants you the freedom to use, modify, and distribute the code, provided you retain the original copyright and permission notice in all copies or substantial portions of the software.
