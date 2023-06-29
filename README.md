<a href="https://twitter.com/lootrealms">
<img src="https://img.shields.io/twitter/follow/lootrealms?style=social"/>
</a>
<a href="https://twitter.com/BibliothecaDAO">
<img src="https://img.shields.io/twitter/follow/BibliothecaDAO?style=social"/>
</a>

[![discord](https://img.shields.io/badge/join-bibliothecadao-black?logo=discord&logoColor=white)](https://discord.gg/bibliothecadao)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

![background](./.github/bg.png)

## Atlas - Open Source Marketplace for Loot and Realms

---

Atlas is a comprehensive and interactive marketplace dedicated to the Loot and Realms ecosystem. It serves as a central hub for all activities, information, and transactions related to the Loot on-chain game world. Atlas is built on Next.js 13, utilizing server and client components to achieve high performance and scalability.

#### Table of Contents

- Getting Started
- Development Guidelines
- - Overview
- - API Routes
- - Server Components
- Running the Development Server
- Contributing
- License

### Getting Started

There are 3 components to the Atlas:

- `ui` - The next.js Frontend
- `subgraph` - The L1 Starknet Messaging Indexer for Bridge Transactions
- `apibara` = The L2 indexer for Bridge Transactions

To start using Atlas, you need to run the development server:

```bash
cd ui

yarn or npm install

npm run dev
# or
yarn dev
# or
pnpm dev
```

Instructions to start the Apibara indexer are at [README](/apibara/README.md)

Once the server is up and running, you can access the Atlas marketplace through your browser.

## Development Guidelines

### Overview

Atlas is built using Next.js 13, which allows for a seamless integration of server and client components. The application aims to maximize performance and scalability by leveraging Vercel's cache and local cache.

### API Routes

To ensure efficient data fetching and caching, all external fetches should use API routes. By doing so, the routes can be cached, improving the overall performance of the application.

### Server Components

Any component that can be rendered on the server should be rendered on the server to optimize the user experience. Page layouts are the most obvious examples of server-rendered components. Within these layouts, server components can be used to add interactivity. This abstraction ensures that page loads are as fast as possible for the end user.

### Running the Development Server

To run the development server, use one of the following commands:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The server will start, and you can access Atlas through your browser.

### Contributing

We welcome contributions from the community to help improve Atlas. If you are interested in contributing, please follow these steps:

1. Fork the repository.
2. Create a new branch for your changes.
3. Make your changes and commit them to your branch.
4. Submit a pull request with a detailed description of your changes.

We will review your contribution and provide feedback. Once your changes have been approved, they will be merged into the main branch.

### License

Atlas is an open-source project released under the MIT License. This license allows you to freely use, modify, and distribute the code, as long as you include the original copyright and permission notice in any copy of the software or substantial portions of it.
