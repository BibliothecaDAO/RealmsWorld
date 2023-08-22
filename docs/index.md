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

[![discord](https://img.shields.io/badge/join-bibliothecadao-black?logo=discord&logoColor=white)](https://discord.gg/bibliothecadao)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

![background](/assets/images/bg.png)

# Realms.World

## The portal to the Realms Autonomous World

Realms.World is the information and activity hub for entrance to the Realms Autonomous World. It includes a comprehensive and interactive marketplace dedicated to the Loot and Realms ecosystem (both on Ethereum and Starknet), ecosystem functionality such as bridging, staking, and NFT minting, and information about the various games of the World. The client is built on Next.js 13, utilizing server and client components to achieve high performance and scalability.

#### Table of Contents

- Getting Started
- Development Guidelines
  - Overview
  - API Routes
  - Server Components
- Running the Development Server
- Contributing
- License

### Structure Overview

There are 3 components to Realms.World:

- [`ui`](/frontend) - The next.js Frontend
- [`subgraph`](/subgraph) - The L1 Starknet Messaging Indexer for Bridge Transactions
- [`apibara`](/starknet-indexer) = The L2 indexer for Bridge Transactions

Instructions to start the Apibara indexer are at [README](/starknet-indexer)

### Contributing

We welcome contributions from the community to help improve Atlas. If you are interested in contributing, please follow these steps:

1. Fork the repository.
2. Create a new branch for your changes.
3. Make your changes and commit them to your branch.
4. Submit a pull request with a detailed description of your changes.

We will review your contribution and provide feedback. Once your changes have been approved, they will be merged into the main branch.

### License

Atlas is an open-source project released under the MIT License. This license allows you to freely use, modify, and distribute the code, as long as you include the original copyright and permission notice in any copy of the software or substantial portions of it.
