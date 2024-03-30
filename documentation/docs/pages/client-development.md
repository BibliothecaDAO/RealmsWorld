# Client Development

### Overview

[Realms.World](https://realms.world) is built using Next.js 14, which allows for a seamless integration of server and client components. The application aims to maximize performance and scalability by leveraging Vercel's cache and local cache and is built on top of the [T3 Stack](https://github.com/t3-oss/create-t3-turbo)

### Server Components

Any component/data that can be rendered/fetched on the server should be rendered on the server to optimize the user experience. Page layouts are the most obvious examples of server-rendered components. Within these layouts, server components can be used to add interactivity. This abstraction ensures that page loads are as fast as possible for the end user.

## Getting Started

We use [bun](https://bun.sh/) as package manager so you will need it installed if you don't already have it.

```bash
curl -fsSL https://bun.sh/install | bash
```

Depending on which enviroment you want to run, either copy the values from `.env.sepolia` or `.env.mainnet` into your `.env` file.

```bash
# To set up environment variables for Sepolia
cp .env.sepolia .env

# To set up environment variables for Mainnet
cp .env.mainnet .env
```

Once bun and your .env is setup, run:

```bash
bun i
```

```bash
bun run dev
```

## Indexers

You only need to run the subgraph and/or Apibara indexers locally if you want to preview changes, otherwise just use the deployed instances/database URL (as set in the `.env` file)
